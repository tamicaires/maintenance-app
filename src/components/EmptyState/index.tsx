import { AlertCircle } from "lucide-react";

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
      <p className="text-lg font-medium text-muted-foreground">{message}</p>
    </div>
  );
}
