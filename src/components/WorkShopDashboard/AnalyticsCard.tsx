import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { formatDuration } from "@/utils/time";

interface CardProps {
  title: string;
  value?: string | number;
  isTimeValue?: boolean;
  change?: number;
  expectedTime?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isLoading?: boolean;
}

export function AnalyticsCard({
  title,
  value = 0,
  isTimeValue,
  change = 0,
  icon: Icon,
  expectedTime,
}: CardProps) {
  return (
    <Card className="bg-card shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">
              {/* {typeof value === "string" && value}{" "} */}
              {isTimeValue && typeof value === "number"
                ? formatDuration(value)
                : value}
            </h3>
          </div>
          <div
            className={`p-2 rounded-full ${
              change >= 0
                ? "bg-green-500 bg-opacity-15"
                : "bg-red-500 bg-opacity-15"
            }`}
          >
            <Icon
              className={`h-5 w-5 ${
                change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            />
          </div>
        </div>
        <div className="flex items-center mt-2">
          {change >= 0 ? (
            <ArrowUpIcon className="h-4 w-4 text-green-600 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
          )}
          <span
            className={`text-sm font-medium ${
              change >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {Math.round(Math.abs(change))}%
          </span>
        </div>
        {expectedTime && (
          <div className="mt-2">
            <Badge variant="secondary">Meta: {expectedTime}</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
