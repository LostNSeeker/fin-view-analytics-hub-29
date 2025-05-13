
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

const useToast = () => {
  return {
    toast: ({ title, description, action, variant }: ToastProps) => {
      sonnerToast(title, {
        description,
        action,
        className: variant === "destructive" ? "border-red-400" : "",
      });
    },
  };
};

const toast = ({ title, description, action, variant }: ToastProps) => {
  sonnerToast(title, {
    description,
    action,
    className: variant === "destructive" ? "border-red-400" : "",
  });
};

export { useToast, toast };
