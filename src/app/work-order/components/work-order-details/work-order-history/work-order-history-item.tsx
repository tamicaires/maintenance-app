import { dateUtil } from "@/utils/date";
import * as Icons from "lucide-react";
import { Clock } from "lucide-react";
import clsx from "clsx";

export type EventsTimelineType = {
  date: Date | null;
  handledBy?: {
    id: string;
    name: string;
  };
  message: string;
  color: string;
  icon?: string;
};

interface IEventHistory {
  event: EventsTimelineType;
}

export function HistoryItem({ event }: IEventHistory) {
  // Converter string para componente do Lucide
  const IconComponent = event.icon ? (Icons as any)[event.icon] : Clock;
  const iconColor = event.color ? `${event.color}-500` : "muted-foreground";

  return (
    <div className="relative pl-8">
      <div
        className={clsx("absolute left-0 rounded-full p-2 text-indigo-50", {
          [`bg-${event.color}-500 bg-opacity-10`]: event.color,
          "bg-muted": !event.color,
        })}
      >
        <IconComponent className={`w-4 h-4 text-${iconColor}`} />
      </div>
      <div className="space-y-1 ml-4">
        <div className="flex gap-3 items-center justify-between">
          <p className="font-medium">{event.message}</p>
          <p className="text-sm text-muted-foreground">
            {event.date
              ? dateUtil.timeSince(new Date(event.date))
              : "Desconhecido"}
          </p>
        </div>
        {event.handledBy && (
          <div className="flex gap-2 text-">
            <p className="text-sm text-muted-foreground">Processado por:</p>
            <p className="text-sm text-muted-foreground font-semibold">
              {event.handledBy.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
