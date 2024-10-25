import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value?: string | number | readonly string[] | null;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, onChange, ...props }, ref) => {
    const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "datetime-local" && onChange) {
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
        onChange(event as React.ChangeEvent<HTMLInputElement>);
      } else if (onChange) {
        onChange(e);
      }
    };

    // Convert boolean, null, and undefined values to appropriate string representations
    const inputValue = value === null || value === undefined
      ? ''
      // : typeof value === 'boolean'
      // ? value.toString()
      : value;

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        value={inputValue}
        onChange={handleDateTimeChange}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };