import { dateUtil } from "@/utils/date";
import { Clock } from "lucide-react";
import clsx from "clsx";

export type HistoryItemProps = {
  id: string;
  date: string;
  description: string;
  user?: string;
  details: string;
  icon?: React.ElementType;
  color?: string; // Cor recebida como prop
};

export function HistoryItem(event: HistoryItemProps) {
  const iconColor = event.color ? `${event.color}-500` : "muted-foreground"; // Define a cor do ícone com base na cor recebida

  return (
    <div key={event.id} className="relative pl-8">
      <div
        className={clsx("absolute left-0 rounded-full p-2", {
          [`bg-${event.color}-500 bg-opacity-15`]: event.color, // Aplica o fundo com opacidade se a cor for recebida
          "bg-muted": !event.color, // Fundo padrão caso não haja cor
        })}
      >
        {event.icon ? (
          <event.icon
            className={`w-4 h-4 text-${iconColor}`} // Aplica a cor do ícone com base na cor recebida
          />
        ) : (
          <Clock className={`w-4 h-4 text-${iconColor}`} />
        )}
      </div>
      <div className="space-y-1 ml-4">
        <div className="flex gap-3 items-center justify-between">
          <p className="font-medium">{event.description}</p>
          <p className="text-sm text-muted-foreground">
            {dateUtil.timeSince(new Date(event.date))}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{event.user}</p>
        <p className="text-sm">{event.details}</p>
      </div>
    </div>
  );
}
