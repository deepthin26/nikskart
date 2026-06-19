import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface Toast {
  id: number;
  text: string;
  type: 'success' | 'error';
}

interface ToastContextType {
  addToast: (text: string, type?: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType>({ addToast: () => {} });

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((text: string, type: 'success' | 'error' = 'success') => {
    const id = nextId++;
    setToasts((cur) => [...cur, { id, text, type }]);
    setTimeout(() => setToasts((cur) => cur.filter((t) => t.id !== id)), 3000);
  }, []);

  const dismiss = (id: number) => setToasts((cur) => cur.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`} role="status">
            <span>{t.text}</span>
            <button className="toast-close" onClick={() => dismiss(t.id)} aria-label="Dismiss">✕</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
