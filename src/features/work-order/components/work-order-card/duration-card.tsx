import { dateUtil } from "@/utils/date";
import { LucideIcon } from "lucide-react";

type DurationCardProps = {
  title: string;
  icon: LucideIcon;
  start: string | undefined;
  end: string | undefined;
};

export function DurationCard({
  title,
  start,
  end,
  icon: Icon,
}: DurationCardProps) {
  return (
    <div className="flex flex-col justify-center">
      <span className="text-muted-foreground text-xs">{title}</span>
      <div className="flex items-center w-24">
        <Icon className="mr-1 h-4 w-4 text-primary" />
        <p className="text-sm">{dateUtil.calculateDuration(start, end)}</p>
      </div>
    </div>
  );
}
