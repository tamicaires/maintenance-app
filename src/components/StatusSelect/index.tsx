import { MaintenanceStatus } from "@/shared/enums/work-order";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  WrenchIcon,
  PackageIcon,
  CheckCircleIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const statusColors = {
  [MaintenanceStatus.FILA]: "bg-amber-200 text-yellow-600 border-yellow-300",
  [MaintenanceStatus.MANUTENCAO]: "bg-blue-200 text-blue-500 border-blue-300",
  [MaintenanceStatus.AGUARDANDO_PECA]:
    "bg-orange-200 text-orange-500 border-orange-300",
  [MaintenanceStatus.FINALIZADA]:
    "bg-green-200 text-green-500 border-green-300",
};

const statusIcons = {
  [MaintenanceStatus.FILA]: ClockIcon,
  [MaintenanceStatus.MANUTENCAO]: WrenchIcon,
  [MaintenanceStatus.AGUARDANDO_PECA]: PackageIcon,
  [MaintenanceStatus.FINALIZADA]: CheckCircleIcon,
};

export function StatusSelect({
  status,
  onChange,
}: {
  status: MaintenanceStatus;
  onChange: (newStatus: MaintenanceStatus) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const StatusIcon = statusIcons[status];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          role="combobox"
          aria-expanded={isOpen}
          className={`justify-between text-sm ${statusColors[status]} bg-opacity-10`}
        >
          <span className="flex items-center">
            <StatusIcon className="mr-2 h-4 w-4" />
            {status.toUpperCase()}
          </span>
          {isOpen ? (
            <ChevronUpIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          ) : (
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <div className="grid gap-1 p-1">
          {Object.values(MaintenanceStatus).map((value) => {
            const Icon = statusIcons[value];
            return (
              <Button
                key={value}
                variant="ghost"
                className={`justify-start font-normal hover:bg-opacity-80 text-muted-foreground`}
                onClick={() => {
                  onChange(value);
                  setIsOpen(false);
                }}
              >
                <Icon className="mr-2 h-3.5 w-4" />
                {value}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
