import React from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ItemData } from '../types';

interface Props {
  item: ItemData;
  onDragEnd: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, id: number) => void;
  isDragDisabled: boolean;
}

export const DraggableItem: React.FC<Props> = ({ item, onDragEnd, isDragDisabled }) => {
  // Разрешаем перетаскивание, если предмет не взвешивался (idle) ИЛИ уже взвешен (completed)
  const canDrag = (item.status === 'idle' || item.status === 'completed') && !isDragDisabled;

  return (
    <div 
      className="relative flex items-end justify-center" 
      style={{ width: item.width, height: item.height }}
    >
      {item.status !== 'weighing' && (
        <motion.img
          layoutId={`item-image-${item.id}`}
          src={item.imgUrl}
          alt={item.text}
          className={`absolute bottom-0 object-contain z-30 drop-shadow-lg origin-bottom ${canDrag ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
          style={{ width: item.width, height: item.height }}
          drag={canDrag}
          dragSnapToOrigin={true}
          onDragEnd={(e, info) => onDragEnd(e, info, item.id)}
          whileHover={canDrag ? { scale: 1.05 } : {}}
          whileTap={canDrag ? { scale: 0.95 } : {}}
        />
      )}

      <AnimatePresence>
        {item.status === 'completed' && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-sm font-bold text-slate-900 whitespace-nowrap z-40 text-lg"
          >
            {item.answer}кг
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};