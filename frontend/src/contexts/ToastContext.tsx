'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const success = (title: string, message?: string) => {
    addToast({ type: 'success', title, message });
  };

  const error = (title: string, message?: string) => {
    addToast({ type: 'error', title, message });
  };

  const warning = (title: string, message?: string) => {
    addToast({ type: 'warning', title, message });
  };

  const info = (title: string, message?: string) => {
    addToast({ type: 'info', title, message });
  };

  return (
    <ToastContext.Provider value={{
      toasts,
      addToast,
      removeToast,
      success,
      error,
      warning,
      info
    }}>
      {children}
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

// Toast Container Component
export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  const getToastStyles = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: '#10B981',
          borderColor: '#059669',
          icon: '✅'
        };
      case 'error':
        return {
          backgroundColor: '#EF4444',
          borderColor: '#DC2626',
          icon: '❌'
        };
      case 'warning':
        return {
          backgroundColor: '#F59E0B',
          borderColor: '#D97706',
          icon: '⚠️'
        };
      case 'info':
        return {
          backgroundColor: '#3B82F6',
          borderColor: '#2563EB',
          icon: 'ℹ️'
        };
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => {
        const styles = getToastStyles(toast.type);
        return (
          <div
            key={toast.id}
            className="min-w-80 max-w-md p-4 rounded-xl shadow-lg border-l-4 text-white animate-slide-in-right"
            style={{
              backgroundColor: styles.backgroundColor,
              borderLeftColor: styles.borderColor,
              animation: 'slideInRight 0.3s ease-out'
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <span className="text-xl">{styles.icon}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white">{toast.title}</h4>
                  {toast.message && (
                    <p className="text-sm text-white/90 mt-1">{toast.message}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/70 hover:text-white text-xl leading-none ml-2"
              >
                ×
              </button>
            </div>
          </div>
        );
      })}
      
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};