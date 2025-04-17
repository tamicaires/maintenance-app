import { ReactNode } from "react";
import { Spinner } from "@/components/Spinner";
import { cn } from "@/lib/utils";

type LoadingOverlayProps = {
  isLoading: boolean;
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
};

export function LoadingOverlay({
  isLoading,
  children,
  className,
  overlayClassName,
}: LoadingOverlayProps) {
  return (
    <div className={cn("relative", className)}>
      {children}

      {isLoading && (
        <div
          className={cn(
            "absolute inset-0 bg-white/40 dark:bg-black/40 flex items-center justify-center z-50 rounded-md",
            overlayClassName
          )}
        >
          <Spinner />
        </div>
      )}
    </div>
  );
}
