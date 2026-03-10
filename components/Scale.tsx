import React, { RefObject } from 'react';
import { motion } from 'framer-motion';
import { ItemData } from '../types';

interface Props {
  scaleRef: RefObject<HTMLDivElement | null>;
  activeItem?: ItemData;
}

export const Scale: React.FC<Props> = ({ scaleRef, activeItem }) => {
  return (
    <div ref={scaleRef} className="relative flex flex-col items-center" style={{ width: 233 }}>
      
      <motion.div
        className="relative flex justify-center w-full"
        style={{ height: 45, marginBottom: -15, zIndex: 30 }}
        animate={{ y: activeItem?.status === 'weighing' ? 12 : 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 12 }}
      >
        {activeItem?.status === 'weighing' && (
          <motion.img
            layoutId={`item-image-${activeItem.id}`}
            src={activeItem.imgUrl}
            alt={activeItem.text}
            className="absolute origin-bottom object-contain pointer-events-none" 
            style={{ 
              width: activeItem.width, 
              height: activeItem.height, 
              // Опускаем чайник (id: 3) ниже в чашу, остальные остаются на 1
              bottom: activeItem.id === 3 ? -15 : 1,
              zIndex: 10
            }}
          />
        )}
        
        <img 
          src="/scale-pan.png" 
          alt="scale pan" 
          className="absolute bottom-0 w-full h-full object-contain"
          style={{ width: 233, height: 45, zIndex: 20 }} 
        />
      </motion.div>

      <div className="relative" style={{ width: 144, height: 152, zIndex: 10 }}>
        <img 
          src="/scale-base.png" 
          alt="scale base" 
          className="absolute inset-0 w-full h-full object-contain" 
          style={{ width: 144, height: 152, zIndex: 0 }} 
        />
        
        <div className="absolute w-full" style={{ top: 72, zIndex: 10 }}>
          <motion.img
            src="/scale-arrow.png"
            alt="needle"
            className="absolute origin-bottom pointer-events-none drop-shadow-md"
            style={{ 
              width: 4, 
              height: 40, 
              bottom: 0, 
              left: '50%', 
              x: '-50%',
              zIndex: 10
            }}
            initial={{ rotate: 0 }}
            animate={{ rotate: activeItem?.status === 'weighing' ? activeItem.weight * 18 : 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 10, delay: 0.2 }}
          />

          <img
            src="/scale-dot.png"
            alt="center dot"
            className="absolute shadow-sm pointer-events-none"
            style={{ 
              width: 10, 
              height: 10, 
              top: 0, 
              left: '47%', 
              x: '-50%', 
              y: '-50%',
              zIndex: 20
            }}
          />
        </div>
      </div>

    </div>
  );
};