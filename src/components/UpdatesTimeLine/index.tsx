import { ArrowUpDown, Clock } from "lucide-react";
import { dateUtil } from "@/utils/date";
import { DynamicIcon } from "../ui/dynamic-icon";

export interface IUpdatesTimeline {
  date: Date | null;
  handledBy?: {
    id: string;
    name: string;
  };
  message: string;
  color: string;
  icon?: string;
}

interface UpdateTimelineProps {
  updates: IUpdatesTimeline[];
  title?: string;
}

export function UpdatesTimeline({
  updates,
  title = "Últimas atualizações",
}: UpdateTimelineProps) {
  const getUpdateIcon = (date: Date | null) => {
    if (!date) return <ArrowUpDown className={`h-4 w-4`} />;
    return date <= new Date() ? (
      <ArrowUpDown className={`h-4 w-4`} />
    ) : (
      <ArrowUpDown className={`h-4 w-4`} />
    );
  };
  console.log("updates", updates);

  return (
    <div className="space-y-4">
      <h3 className="font-bold">{title}</h3>
      <div className="space-y-4">
        {updates.map((update, index) => (
          <div key={index}>
            {update.date && (
              <div className="flex items-center space-x-3">
                <div
                  className={`mt-1 bg-${update.color}-500 bg-opacity-15 p-1.5 rounded-full text-${update.color}-500`}
                >
                  {update.icon ? (
                    <DynamicIcon
                      iconName={update.icon}
                      fallbackIcon={getUpdateIcon(update.date)}
                      className="h-3.5 w-3.5"
                    />
                  ) : (
                    getUpdateIcon(update.date)
                  )}
                </div>
                <div className="flex gap-2 w-full items-center justify-between space-y-1">
                  <div>
                    {" "}
                    <p className="text-md font-semibold leading-none">
                      {update.message}
                    </p>
                    {update.handledBy && (
                      <p className="text-sm text-muted-foreground">
                        {update.handledBy.name}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {dateUtil.timeSince(new Date(update.date))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
