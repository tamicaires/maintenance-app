import { useState, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Send,
  RefreshCw,
  Check,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export type ToastHandler = (toast: Omit<ToastProps, "id" | "onClose">) => void;

interface ToastProps {
  id: number;
  title?: string;
  message: string;
  type?: "success" | "notification" | "update" | "error" | "alert";
  duration?: number;
  onClose: () => void;
  avatar?: string;
  userName?: string;
  actions?: {
    primary?: {
      label: string;
      onClick: () => void;
    };
    secondary?: {
      label: string;
      onClick: () => void;
    };
  };
}

function Toast({
  title,
  message,
  type = "success",
  duration = 2000,
  onClose,
  avatar,
  userName,
  actions,
}: ToastProps) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <Check className="h-5 w-5 text-primary" />,
    notification: avatar ? null : <Send className="h-5 w-5 text-blue-500" />,
    update: <RefreshCw className="h-5 w-5 text-blue-500" />,
    error: <AlertCircle className="h-5 w-5 text-destructive" />,
    alert: <AlertTriangle className="h-5 w-5 text-warning" />,
  };

  return (
    <div
      className={`bg-card rounded-lg shadow-lg p-4 min-w-[320px] animate-in slide-in-from-right`}
    >
      <div className="flex items-start gap-3">
        {type === "notification" && avatar ? (
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} alt={userName} />
            <AvatarFallback>
              {userName?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div
            className={`rounded-full p-1 ${
              type === "success"
                ? "bg-primary/10"
                : type === "error"
                ? "bg-destructive/20"
                : type === "alert"
                ? "bg-warning/20"
                : ""
            }`}
          >
            {icons[type]}
          </div>
        )}
        <div className="flex-1 min-w-0">
          {title && <h3 className="font-semibold text-gray-900">{title}</h3>}
          {userName && (
            <h3 className="font-semibold text-gray-900">{userName}</h3>
          )}
          <p className="text-sm text-gray-600">{message}</p>
          {actions && (
            <div className="mt-3 flex gap-3">
              {actions.primary && (
                <Button size="sm" onClick={actions.primary.onClick}>
                  {actions.primary.label}
                </Button>
              )}
              {actions.secondary && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={actions.secondary.onClick}
                >
                  {actions.secondary.label}
                </Button>
              )}
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

interface ToastContainerProps {
  children: ReactNode;
}

function ToastContainer({ children }: ToastContainerProps) {
  return createPortal(
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {children}
    </div>,
    document.body
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast: ToastHandler = (toast) => {
    const id = Date.now();
    setToasts((prevToasts) => [
      ...prevToasts,
      { ...toast, id, onClose: () => removeToast(id) },
    ]);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const ToastComponent = () => (
    <ToastContainer>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </ToastContainer>
  );

  return { toast, ToastComponent };
}
