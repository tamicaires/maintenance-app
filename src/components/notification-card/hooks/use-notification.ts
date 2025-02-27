import { useState, useCallback } from "react";

type NotificationType = "success" | "error";

interface NotificationProps {
  title: string;
  description: string;
  type: NotificationType;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  footer?: {
    text: string;
    link: {
      label: string;
      onClick: () => void;
    };
  };
}

export const useNotification = () => {
  const [notification, setNotification] = useState<NotificationProps | null>(null);
  console.log("notification", notification)
  const showNotification = useCallback((notificationData: NotificationProps) => {
    setNotification(notificationData);
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return {
    notification,
    showNotification,
    hideNotification,
  };
};
