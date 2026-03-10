import React, { RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ItemData } from '../types';

interface Props {
  activeItem?: ItemData;
  inputValue: string;
  setInputValue: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  isVisible: boolean;
}

export const InputForm: React.FC<Props> = ({ activeItem, inputValue, setInputValue, onSubmit, inputRef, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur px-6 py-4 rounded-2xl shadow-2xl border-2 border-purple-100 flex items-center gap-4 z-50"
        >
          <span className="text-xl font-medium text-slate-900">{activeItem?.text}:</span>
          <form onSubmit={onSubmit} className="flex gap-3">
            <input
              ref={inputRef}
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-24 p-2 border-2 border-gray-300 rounded-xl text-3xl font-bold text-slate-900 text-center focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
              placeholder="?"
            />
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-bold text-lg shadow-md transition-colors">ОК</button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};