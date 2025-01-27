import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, ChevronLeft, ChevronRight, Filter, Plus } from "lucide-react";

interface ScheduleProps {
  showCalendarOnly?: boolean;
}

export function Schedule({ showCalendarOnly = false }: ScheduleProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
      const day = new Date(year, month, i);
      days.push({
        date: i.toString().padStart(2, "0"),
        day: day.toLocaleString("default", { weekday: "short" }),
        isActive: day.toDateString() === selectedDate.toDateString(),
      });
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    );
  };

  return (
    <div className="w-[400px] rounded-xl bg-white p-5 shadow-lg">
      {!showCalendarOnly && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            <span className="font-medium">Schedule</span>
          </div>
          <Button
            variant="ghost"
            className="h-8 text-sm text-muted-foreground hover:text-primary"
          >
            See All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handlePrevMonth}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="font-medium">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleNextMonth}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative mt-4">
        <div className="absolute inset-y-0 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handlePrevMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-center gap-4 overflow-x-auto">
          {days.slice(0, 5).map((day) => (
            <div
              key={day.date}
              className={`flex flex-col items-center rounded-xl px-3 py-2 cursor-pointer ${
                day.isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              onClick={() => handleDateClick(Number.parseInt(day.date))}
            >
              <span className="text-xs">{day.day}</span>
              <span className="text-base font-medium">{day.date}</span>
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleNextMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!showCalendarOnly && (
        <>
          <div className="mt-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                placeholder="Search by name or day..."
                className="pl-4 pr-8"
              />
              <Filter className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <Tabs defaultValue="meetings" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="meetings"
                className="data-[state=active]:text-primary"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                Meetings
              </TabsTrigger>
              <TabsTrigger
                value="events"
                className="data-[state=active]:text-primary"
              >
                Events
              </TabsTrigger>
              <TabsTrigger
                value="checklist"
                className="data-[state=active]:text-primary"
              >
                Checklist
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mt-4 rounded-xl bg-primary/5 p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-primary">
                  Manutenção Preventiva
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Frota 22542
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                Marketing
              </span>
            </div>
          </div>

          <Button className="mt-4 w-full" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Create Meeting
          </Button>
        </>
      )}
    </div>
  );
}
