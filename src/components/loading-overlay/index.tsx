import { ReactNode } from "react";
import { Spinner } from "@/components/Spinner";
import { cn } from "@/lib/utils";

type LoadingOverlayProps = {
  isLoading: boolean;
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
};

export function LoadingOverlay({
  isLoading,
  children,
  className,
  fallback,
}: LoadingOverlayProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center w-full",
          className
        )}
      >
        {fallback ?? <Spinner />}
      </div>
    );
  }

  return <div className={cn("relative", className)}>{children}</div>;
}
