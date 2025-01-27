import * as React from "react";
import { addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { dateUtil, dateLabels } from "@/utils/date";

interface DateRangePickerProps {
  onRangeChange?: (range: { from: Date; to: Date }) => void;
}

export function DateRangePicker({ onRangeChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [date, setDate] = React.useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  // const [includeTime, setIncludeTime] = React.useState(false);

  const quickSelections = [
    {
      label: dateLabels.today,
      getValue: () => ({ from: new Date(), to: new Date() }),
    },
    {
      label: dateLabels.yesterday,
      getValue: () => ({
        from: addDays(new Date(), -1),
        to: addDays(new Date(), -1),
      }),
    },
    {
      label: dateLabels.thisWeek,
      getValue: () => ({ from: addDays(new Date(), -7), to: new Date() }),
    },
    {
      label: dateLabels.lastWeek,
      getValue: () => ({
        from: addDays(new Date(), -14),
        to: addDays(new Date(), -7),
      }),
    },
    {
      label: dateLabels.thisMonth,
      getValue: () => ({
        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        to: new Date(),
      }),
    },
    {
      label: dateLabels.lastMonth,
      getValue: () => ({
        from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
        to: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
      }),
    },
    {
      label: dateLabels.thisYear,
      getValue: () => ({
        from: new Date(new Date().getFullYear(), 0, 1),
        to: new Date(),
      }),
    },
    {
      label: dateLabels.lastYear,
      getValue: () => ({
        from: new Date(new Date().getFullYear() - 1, 0, 1),
        to: new Date(new Date().getFullYear() - 1, 11, 31),
      }),
    },
  ];

  const handleRangeSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      setDate({ from: range.from, to: range.to });
    } else {
      setDate({ from: undefined, to: undefined });
    }
  };

  React.useEffect(() => {
    if (date.from && date.to) {
      onRangeChange?.({ from: date.from, to: date.to });
    }
  }, [date, onRangeChange]);

  const getDaysBetween = () => {
    if (!date.from || !date.to) return 0;
    const diffTime = Math.abs(date.to.getTime() - date.from.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const resetDate = () => {
    setDate({ from: undefined, to: undefined });
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal",
            !date.from && !date.to && ""
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          {date.from && date.to ? (
            <>
              {dateUtil.formatDateBR(date.from)} - {dateUtil.formatDateBR(date.to)}
            </>
          ) : (
            <span className="text-sm font-semibold">{dateLabels.pickDateRange}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          {/* Quick selections sidebar */}
          <div className="border-r p-4 space-y-2 w-40">
            {quickSelections.map((selection) => (
              <Button
                key={selection.label}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleRangeSelect(selection.getValue())}
              >
                {selection.label}
              </Button>
            ))}
          </div>

          <div className="p-4 space-y-4">
            {/* Date inputs and controls */}
            {/* <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-primary" />
                <input
                  type="text"
                  value={date.from ? formatDateBR(date.from) : ""}
                  className="w-24 border rounded px-2 py-1"
                  readOnly
                />
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-primary" />
                <input
                  type="text"
                  value={date.to ? formatDateBR(date.to) : ""}
                  className="w-24 border rounded px-2 py-1"
                  readOnly
                />
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm">{dateLabels.includeTime}</span>
                <Switch
                  checked={includeTime}
                  onCheckedChange={setIncludeTime}
                />
              </div>
              <Select defaultValue="EDT">
                <SelectTrigger className="w-[100px]">
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EDT">EDT</SelectItem>
                  <SelectItem value="PST">PST</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            {/* Calendars */}
            <div className="flex gap-4">
              <Calendar
                mode="range"
                defaultMonth={date.from || new Date()}
                selected={date}
                onSelect={handleRangeSelect}
                numberOfMonths={2}
                className="rounded-md border"
                locale={ptBR}
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                {dateLabels.range}: {getDaysBetween()} {dateLabels.days}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={resetDate}>
                  {dateLabels.reset}
                </Button>
                <Button onClick={() => setIsOpen(false)}>
                  {dateLabels.apply}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
