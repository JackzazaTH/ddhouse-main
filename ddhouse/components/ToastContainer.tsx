

import React from 'react';
import { Toast as ToastType } from '@/lib/types';
import Toast from './Toast';

interface ToastContainerProps {
  toasts: ToastType[];
  removeToast: (id: number) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-5 right-5 z-[200] w-full max-w-sm">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;