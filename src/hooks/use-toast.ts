
import * as React from "react";
import { 
  toast as sonnerToast,
  ToastT,
  ToastActionElement,
  ExternalToast 
} from "sonner";

export type ToastProps = {
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

interface ToasterToast extends ToastProps {
  id: string;
}

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000;

type ToasterToastState = {
  toasts: ToasterToast[];
};

// Create a context to manage the toast state
const ToasterContext = React.createContext<ToasterToastState>({ toasts: [] });

export const ToasterProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<ToasterToast[]>([]);

  return (
    <ToasterContext.Provider value={{ toasts }}>
      {children}
    </ToasterContext.Provider>
  );
};

export function useToast() {
  const context = React.useContext(ToasterContext);
  
  return {
    toast: ({ title, description, action, variant }: ToastProps) => {
      sonnerToast(title, {
        description,
        action,
        className: variant === "destructive" ? "border-red-400" : "",
      });
    },
    toasts: context.toasts,
  };
}

export const toast = ({ title, description, action, variant }: ToastProps) => {
  sonnerToast(title, {
    description,
    action,
    className: variant === "destructive" ? "border-red-400" : "",
  });
};
