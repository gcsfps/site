import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast } from '../components/ui/Toast';
import { ToastMessage } from '../src/types';

interface ToastContextData {
  addToast: (message: ToastMessage) => void;
  removeToast: () => void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastMessage & { show: boolean }>({
    show: false,
    type: 'success',
    message: '',
  });

  const addToast = useCallback((message: ToastMessage) => {
    setToast({ ...message, show: true });
  }, []);

  const removeToast = useCallback(() => {
    setToast(state => ({ ...state, show: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={removeToast}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
