import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface DateTimePickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  value?: Date | string | null;
  onChange?: (date: Date | null) => void;
}

export function DateTimePicker({
  className,
  value,
  onChange,
}: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(() => {
    if (value instanceof Date) return value;
    if (typeof value === 'string') return new Date(value);
    return undefined;
  });

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      const hours = date ? date.getHours() : 0;
      const minutes = date ? date.getMinutes() : 0;
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
    }
    setDate(newDate);
    onChange?.(newDate ?? null);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (date) {
      const [hours, minutes] = e.target.value.split(":");
      const newDate = new Date(date);
      newDate.setHours(parseInt(hours, 10));
      newDate.setMinutes(parseInt(minutes, 10));
      setDate(newDate);
      onChange?.(newDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy HH:mm", { locale: ptBR }) : <span>Selecione uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
          locale={ptBR}
        />
        <div className="p-3 border-t">
          <Label htmlFor="time">Hora</Label>
          <Input
            id="time"
            type="time"
            value={date ? format(date, "HH:mm") : ""}
            onChange={handleTimeChange}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

