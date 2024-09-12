import React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const sizeClasses = {
  small: "w-4 h-4",
  medium: "w-8 h-8",
  large: "w-12 h-12",
};

export const Spinner: React.FC<SpinnerProps> = ({
  className,
  size = "large",
}) => {
  return (
    <div className="flex justify-center items-center h-[200px]">
      <div
        className={cn(
          "animate-spin rounded-full border-t-2 border-b-2 border-primary",
          sizeClasses[size],
          className
        )}
      ></div>
    </div>
  );
};
