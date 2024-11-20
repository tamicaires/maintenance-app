import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Inbox, AlertCircle } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  icon?: "inbox" | "alert";
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  message = "Nenhum item encontrado",
  icon = "inbox",
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const Icon = icon === "inbox" ? Inbox : AlertCircle;

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
        className="mb-6 rounded-full bg-gray-100 p-4 dark:bg-gray-800"
      >
        <Icon className="h-12 w-12 text-gray-400" aria-hidden="true" />
      </motion.div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
        {message}
      </h3>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        Não se preocupe, isso é normal quando não há itens para exibir.
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
