import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "datetime-local" && props.onChange) {
        const date = new Date(e.target.value);
        const isoString = new Date(
          date.getTime() - date.getTimezoneOffset() * 60000
        ).toISOString();
        const event = {
          ...e,
          target: {
            ...e.target,
            value: isoString,
          },
        };
        props.onChange(event as React.ChangeEvent<HTMLInputElement>);
      } else if (props.onChange) {
        props.onChange(e);
      }
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onChange={handleDateTimeChange}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
