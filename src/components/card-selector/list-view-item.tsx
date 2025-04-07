import { cn } from "@/lib/utils";
import { DynamicIcon } from "../ui/dynamic-icon";
import { CardSelectionOption } from "./card-selector-dialog";

export interface ListViewItemProps {
  option: CardSelectionOption;
  value: string;
  onChange: (value: string) => void;
}

export function ListViewItem({ option, value, onChange }: ListViewItemProps) {
  return (
    <div
      key={option.id}
      className={cn(
        "flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-all",
        "hover:bg-accent",
        value === option.id
          ? "border-2 border-primary/10 shadow-sm"
          : "border border-border/50"
      )}
      onClick={() => onChange(option.id)}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
        <DynamicIcon iconName={option.icon} className="w-6 h-6 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-base">{option.title}</h3>
        <p className="text-sm text-muted-foreground">{option.description}</p>
      </div>
      {value === option.id && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
          ✓
        </span>
      )}
    </div>
  );
}
