

import React, { useEffect } from 'react';
import { Toast as ToastType } from '@/lib/types';

interface ToastProps {
  toast: ToastType;
  onClose: (id: number) => void;
}

const ICONS = {
  success: (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  ),
  error: (
     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  ),
  info: (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  ),
};

const BG_COLORS = {
  success: 'bg-green-500',
  error: 'bg-red-600',
  info: 'bg-blue-500',
};

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [toast.id, onClose]);

  return (
    <div className={`flex items-center text-white p-4 rounded-md shadow-lg mb-2 animate-fade-in-down ${BG_COLORS[toast.type]}`}>
      <div className="flex-shrink-0">
        {ICONS[toast.type]}
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
      <button onClick={() => onClose(toast.id)} className="ml-auto flex-shrink-0 p-1 rounded-md hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </button>
    </div>
  );
};

export default Toast;