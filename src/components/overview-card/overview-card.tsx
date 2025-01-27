import { type LucideIcon } from "lucide-react";

interface OverviewCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export function OverviewCard({
  title,
  value,
  icon: Icon,
  trend,
  className = "",
}: OverviewCardProps) {
  return (
    <div
      className={`bg-card rounded-lg shadow-md overflow-hidden ${className}`}
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-muted-foreground truncate">
                {title}
              </dt>
              <dd>
                <div className="text-2xl font-medium text-">
                  {value}
                </div>
              </dd>
            </dl>
          </div>
          <div className="flex-shrink-0 bg-primary/10 dark:bg-primary-900 rounded-md p-3">
            <Icon
              className="h-6 w-6 text-primary dark:text-primary-300"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      {trend && (
        <div className="bg-accent px-4 py-4 sm:px-6">
          <div className="text-sm">
            <span
              className={`font-medium ${
                trend.positive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </span>{" "}
            <span className="text-gray-500 dark:text-gray-300">
              vs last month
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
