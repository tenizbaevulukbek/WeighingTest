'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PanInfo } from 'framer-motion';
import { ItemData } from '../types';
import { initialItems } from '../data/initialData';
import { DraggableItem } from '../components/DraggableItem';
import { Scale } from '../components/Scale';
import { InputForm } from '../components/InputForm';

export default function WeighingGame() {
  const [items, setItems] = useState<ItemData[]>(initialItems);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  
  const scaleRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeItem = items.find((i: ItemData) => i.id === activeId);
  const isDragDisabled = items.some((i: ItemData) => i.status === 'weighing');

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, id: number) => {
    if (!scaleRef.current) return;
    const rect = scaleRef.current.getBoundingClientRect();
    
    if (
      info.point.x >= rect.left &&
      info.point.x <= rect.right &&
      info.point.y >= rect.top &&
      info.point.y <= rect.bottom
    ) {
      setItems((prev: ItemData[]) =>
        prev.map((item: ItemData) => (item.id === id ? { ...item, status: 'weighing' } : item))
      );
      setActiveId(id);
    }
  };

  useEffect(() => {
    if (items.some((i: ItemData) => i.status === 'weighing')) {
      const focusTimer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(focusTimer);
    }
  }, [items]);

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeId === null || inputValue.trim() === '') return;

    setItems((prev: ItemData[]) =>
      prev.map((item: ItemData) =>
        item.id === activeId ? { ...item, status: 'completed', answer: inputValue } : item
      )
    );
    
    setInputValue('');
    setActiveId(null);
  };

  const isInputVisible = items.some((i: ItemData) => i.status === 'weighing');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl bg-white p-6 sm:p-10 rounded-xl shadow-sm border border-gray-200 flex flex-col">
        <h1 className="text-center text-xl sm:text-3xl font-medium text-slate-800 mb-6 sm:mb-10">Взвесь предметы и животных</h1>
        
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl border-4 border-slate-100">
          <img src="/background.png" alt="background" className="absolute inset-0 w-full h-full object-fill pointer-events-none" />
          
          <div className="absolute left-0 right-0 flex items-end px-[8%] z-20" style={{ bottom: '21%' }}>
            
            <div className="flex-1 flex justify-around items-end pr-10">
              {items.map((item: ItemData) => (
                <DraggableItem key={item.id} item={item} onDragEnd={handleDragEnd} isDragDisabled={isDragDisabled} />
              ))}
            </div>

            <div className="flex-none pb-[2px]">
              <Scale scaleRef={scaleRef} activeItem={activeItem} />
            </div>
            
          </div>
          
          <InputForm activeItem={activeItem} inputValue={inputValue} setInputValue={setInputValue} onSubmit={handleInputSubmit} inputRef={inputRef} isVisible={isInputVisible} />
        </div>
      </div>
    </div>
  );
}