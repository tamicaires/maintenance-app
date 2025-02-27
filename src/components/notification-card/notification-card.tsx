import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SuccessIllustration } from "../illustations/success-ilustration";
import { ErrorIllustration } from "../illustations/error-illustration";

type NotificationType = "success" | "error";

interface NotificationProps {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
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

const getColors = (type: NotificationType) => ({
  primary:
    type === "success"
      ? "bg-primary hover:bg-primary-dark"
      : "bg-red-500 hover:bg-red-600",
  border: type === "success" ? "border-primary/20" : "border-red-500/20",
  text: type === "success" ? "text-primary" : "text-red-500",
});

function NotificationCard({
  notification,
  onClose,
}: {
  notification: NotificationProps;
  onClose: () => void;
}) {
  const colors = getColors(notification.type);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className={`relative w-full max-w-lg bg-background-card rounded-2xl shadow-lg bg-white overflow-hidden pb-10 ${colors.border}`}
        >
          <div onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg ${colors.primary} text-white flex items-center justify-center`}
                >
                  {notification.type === "success" ? "✓" : "✕"}
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">
                    Status Update
                  </div>
                  <div className="text-xs text-text-secondary">
                    {notification.type === "success" ? "Success" : "Error"}
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-text-muted" />
              </button>
            </div>

            {/* Content */}
            <div className="pt-20 px-4">
              <div className="flex flex-col items-center text-center">
                {notification.type === "success" ? (
                  <SuccessIllustration />
                ) : (
                  <ErrorIllustration />
                )}

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-semibold text-text-primary mt-6"
                >
                  {notification.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-2 text-text-secondary max-w-sm"
                >
                  {notification.description}
                </motion.p>
              </div>

              {/* Actions */}
              {(notification.primaryAction || notification.secondaryAction) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col gap-3 mt-8 px-4"
                >
                  {notification.primaryAction && (
                    <button
                      onClick={() => {
                        notification.primaryAction?.onClick();
                        onClose();
                      }}
                      className={`w-full py-3 px-4 rounded-xl text-white font-medium transition-colors ${colors.primary} cursor-pointer`}
                    >
                      {notification.primaryAction.label}
                    </button>
                  )}

                  {notification.secondaryAction && (
                    <button
                      onClick={() => {
                        notification.secondaryAction?.onClick();
                        onClose();
                      }}
                      className="w-full py-3 px-4 rounded-xl border border-gray-200 text-text-primary font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      {notification.secondaryAction.label}
                    </button>
                  )}
                </motion.div>
              )}

              {/* Footer */}
              {notification.footer && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 py-4 text-center text-sm text-text-secondary border-t border-gray-100"
                >
                  {notification.footer.text}{" "}
                  <button
                    onClick={() => {
                      notification.footer?.link.onClick();
                      onClose();
                    }}
                    className={`font-medium hover:underline ${colors.text}`}
                  >
                    {notification.footer.link.label}
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function useNotification() {
  const [notification, setNotification] = useState<NotificationProps | null>();
  const [isShowNotificationCard, setIsShowNotificationard] =
    useState<boolean>(false);
  console.log("show notification open", isShowNotificationCard);
  const showNotification: ShowNotificationProps = (notificationProps) => {
    const id = Date.now();
    setNotification({
      ...notificationProps,
      id,
    });
    setIsShowNotificationard(true);
  };

  const hideNotification = (id: number) => {
    console.log("Hiding notification:", id);
    setNotification(null);
    setIsShowNotificationard(false);
  };
  const NotificationComponent = () =>
    isShowNotificationCard && notification ? (
      <NotificationCard
        key={notification.id}
        notification={notification}
        onClose={() => hideNotification(notification.id)}
      />
    ) : null;

  return { showNotification, hideNotification, NotificationComponent };
}

export type ShowNotificationProps = (
  notificationProps: Omit<NotificationProps, "id" | "onClose">
) => void;
