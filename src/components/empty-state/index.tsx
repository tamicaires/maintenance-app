import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Inbox, AlertCircle } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  description?: string;
  icon?: "inbox" | "alert";
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  message = "Nenhum item encontrado",
  description,
  icon = "inbox",
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const Icon = icon === "inbox" ? Inbox : AlertCircle;
  const defaultDescriptionMessage =
    "Não se preocupe, isso é normal quando não há itens para exibir.";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-8 text-center w-full"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mb-6 rounded-full bg-primary/5 p-4"
      >
        <Icon className="h-12 w-12 text-primary" aria-hidden="true" />
      </motion.div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {message}
      </h3>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        {description || defaultDescriptionMessage}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
