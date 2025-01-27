import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { DynamicIcon } from "../ui/dynamic-icon";
import { CardSelectionOption } from "./card-selector";

export interface GridViewItemProps {
  option: CardSelectionOption;
  value: string;
  onChange: (value: string) => void;
}

export function GridViewItem({ option, value, onChange }: GridViewItemProps) {
  return (
    <Card
      key={option.id}
      className={cn(
        "relative cursor-pointer transition-all hover:bg-accent",
        value === option.id
          ? "border-2 border-primary/10 shadow-sm"
          : "border border-border/50"
      )}
      onClick={() => onChange(option.id)}
    >
      <div className="p-6 text-center space-y-4">
        <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
          <DynamicIcon
            iconName={option.icon}
            className="w-6 h-6 text-primary"
          />
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">{option.title}</h3>
          <p className="text-sm text-muted-foreground leading-tight">
            {option.description}
          </p>
        </div>
      </div>
      {value === option.id && (
        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
          ✓
        </span>
      )}
    </Card>
  );
}
