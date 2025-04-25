import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertCircle, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ErrorIcon = "alert" | "warning" | "critical";
export type ErrorSize = "xs" | "sm" | "md" | "lg";

interface ErrorStateProps {
  title?: string;
  message?: string;
  icon?: ErrorIcon;
  size?: ErrorSize;
  actionLabel?: string;
  className?: string;
  onAction?: () => void;
  hideIcon?: boolean;
}

export default function ErrorState({
  title = "Ops, por essa nem a gente esperava",
  message = "Não foi possível completar a operação solicitada.",
  icon = "alert",
  size = "md",
  actionLabel,
  className,
  onAction,
  hideIcon = false,
}: ErrorStateProps) {
  // Map icon type to the appropriate Lucide icon
  const Icon = {
    alert: AlertCircle,
    warning: AlertTriangle,
    critical: XCircle,
  }[icon];

  // Size configurations for different elements
  const sizeConfig = {
    xs: {
      container: "p-2 gap-1",
      icon: "h-5 w-5",
      iconContainer: "p-1.5",
      title: "text-xs font-semibold",
      message: "text-xs",
      button: "h-6 text-xs px-2 py-0",
    },
    sm: {
      container: "p-3 gap-2",
      icon: "h-8 w-8",
      iconContainer: "p-2",
      title: "text-sm font-semibold",
      message: "text-xs",
      button: "h-7 text-xs",
    },
    md: {
      container: "p-6 gap-3",
      icon: "h-10 w-10",
      iconContainer: "p-3",
      title: "text-base font-semibold",
      message: "text-sm",
      button: "h-8 text-sm",
    },
    lg: {
      container: "p-8 gap-4",
      icon: "h-12 w-12",
      iconContainer: "p-4",
      title: "text-lg font-semibold",
      message: "text-base",
      button: "h-9",
    },
  };

  // Color configurations based on error type
  const colorConfig = {
    alert: {
      iconBg: "bg-primary/5",
      iconColor: "text-primary",
      titleColor: "text-gray-900 dark:text-gray-100",
      messageColor: "text-gray-500 dark:text-gray-400",
    },
    warning: {
      iconBg: "bg-amber-500/5",
      iconColor: "text-amber-500",
      titleColor: "text-gray-900 dark:text-gray-100",
      messageColor: "text-gray-500 dark:text-gray-400",
    },
    critical: {
      iconBg: "bg-red-500/5",
      iconColor: "text-red-500",
      titleColor: "text-gray-900 dark:text-gray-100",
      messageColor: "text-gray-500 dark:text-gray-400",
    },
  };

  const current = colorConfig[icon];
  const currentSize = sizeConfig[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col items-center justify-center text-center w-full",
        currentSize.container,
        className
      )}
    >
      {!hideIcon && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "rounded-full mb-2",
            current.iconBg,
            currentSize.iconContainer
          )}
        >
          <Icon
            className={cn(current.iconColor, currentSize.icon)}
            aria-hidden="true"
          />
        </motion.div>
      )}

      <h3 className={cn(current.titleColor, currentSize.title)}>{title}</h3>

      {message && (
        <p
          className={cn(
            current.messageColor,
            currentSize.message,
            "mb-6 max-w-full break-words"
          )}
        >
          {message}
        </p>
      )}

      {actionLabel && onAction && (
        <Button onClick={onAction} className={cn("mt-2", currentSize.button)}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
