import React, { RefObject } from 'react';
import { motion } from 'framer-motion';
import { ItemData } from '../types';

interface Props {
  scaleRef: RefObject<HTMLDivElement | null>;
  activeItem?: ItemData;
}

export const Scale: React.FC<Props> = ({ scaleRef, activeItem }) => {
  return (
    <div ref={scaleRef} className="relative flex flex-col items-center shrink-0" style={{ width: 233.37, height: 194.04 }}>
      
      <motion.div
        className="relative flex justify-center w-full"
        style={{ height: 45, top: 0, zIndex: 30 }}
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
              bottom: activeItem.id === 3 ? -15 : 1,
              zIndex: 10
            }}
          />
        )}
        
        <img 
          src="/scale-pan.png" 
          alt="scale pan" 
          className="absolute bottom-0 w-full h-full object-contain"
          style={{ width: 233.37, height: 45, zIndex: 20 }} 
        />
      </motion.div>

      <div className="absolute bottom-0" style={{ width: 144, height: 152, zIndex: 10 }}>
        <img 
          src="/scale-base.png" 
          alt="scale base" 
          className="absolute inset-0 w-full h-full object-contain" 
          style={{ width: 144, height: 152, zIndex: 0 }} 
        />
      </div>

      <motion.img
        src="/scale-arrow.png"
        alt="needle"
        className="absolute pointer-events-none drop-shadow-md z-10"
        style={{ 
          width: 3.93, 
          height: 40, 
          top: 92.04, 
          left: 114.88,
          transformOrigin: '50% 26px',
          borderRadius: 8,
          clipPath: 'inset(0px 0px 14px 0px)' 
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
          width: 8, 
          height: 8, 
          top: 114.04, 
          left: 112.88,
          zIndex: 20
        }}
      />

    </div>
  );
};