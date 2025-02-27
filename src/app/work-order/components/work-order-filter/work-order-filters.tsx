import * as React from "react";
import { X, Flag } from "lucide-react";
import { FaFilter } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IWorkOrderFilters } from "../../hooks/use-work-order";
import { MaintenanceStatus, SeverityLevel } from "@/shared/enums/work-order";

const severityLevels = [
  {
    id: SeverityLevel.BAIXA,
    label: "Baixa",
    icon: <Flag className="h-4 w-4" />,
  },
  {
    id: SeverityLevel.NORMAL,
    label: "Normal",
    icon: <Flag className="h-4 w-4" />,
  },
  { id: SeverityLevel.ALTA, label: "Alta", icon: <Flag className="h-4 w-4" /> },
  {
    id: SeverityLevel.URGENTE,
    label: "Urgente",
    icon: <Flag className="h-4 w-4" />,
  },
];

const styles = {
  popover: "w-[480px] p-0",
  header: "flex items-center justify-between p-6 pb-4",
  title: "text-xl font-semibold",
  closeButton: "opacity-60 hover:opacity-100 transition-opacity",
  section: "px-6 pb-6",
  sectionTitle: "text-base font-semibold mb-4",
  severityGrid: "flex flex-wrap gap-2",
  severityChip:
    "flex items-center gap-2 px-4 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-all cursor-pointer text-sm text-muted-foreground",
  severityChipSelected: "border-2 border-primary bg-primary/5 text-primary",
  input:
    "h-9 text-sm border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent",
  footer:
    "flex items-center justify-between gap-2 p-6 pt-4 border-t border-gray-100 w-full",
};

interface WorkOrderFiltersProps {
  onFiltersChange: (filters: Partial<IWorkOrderFilters>) => void;
  totalResults?: number;
}

export default function WorkOrderFilters({
  onFiltersChange,
  totalResults = 0,
}: WorkOrderFiltersProps) {
  const [filters, setFilters] = React.useState<IWorkOrderFilters>({
    status: [MaintenanceStatus.FINALIZADA],
    severityLevel: [SeverityLevel.ALTA],
  });

  const [open, setOpen] = React.useState(false);

  const updateFilters = (newFilters: Partial<IWorkOrderFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const toggleSeverityLevel = (level: SeverityLevel) => {
    const updated = Array.isArray(filters.severityLevel)
      ? filters.severityLevel.includes(level)
        ? filters.severityLevel.filter((l) => l !== level)
        : [...filters.severityLevel, level]
      : [level];

    updateFilters({ severityLevel: updated });
  };

  const clearFilters = () => {
    const initialFilters: IWorkOrderFilters = {
      status: [],
      severityLevel: [],
      fleetNumber: "", // Restabelecido como string
      displayId: "", // Restabelecido como string
    };
    setFilters(initialFilters);
    onFiltersChange(initialFilters);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          <div className="flex gap-2 items-center">
            <FaFilter className="w-3 h-3 text-primary" /> Filtrar
          </div>
          {totalResults > 0 && (
            <div className="bg-primary/10 rounded-full px-1.5">
              <span className="text-xs text-primary">{totalResults}</span>
            </div>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className={styles.popover} align="center">
        <div className={styles.header}>
          <h2 className={styles.title}>Filtros</h2>
          <Button
            variant="ghost"
            size="icon"
            className={styles.closeButton}
            onClick={() => setOpen(false)}
          >
            <X className="w-4" />
          </Button>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Nível de Severidade</h3>
          <div className={styles.severityGrid}>
            {severityLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => toggleSeverityLevel(level.id)}
                className={cn(
                  styles.severityChip,
                  filters.severityLevel?.includes(level.id) &&
                    styles.severityChipSelected
                )}
              >
                {level.icon} {level.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Informações Específicas</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Número da Frota</label>
              <Input
                placeholder="Digite número da frota..."
                value={filters.fleetNumber}
                onChange={(e) => updateFilters({ fleetNumber: e.target.value })}
                className={styles.input}
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">
                ID Ordem de Serviço
              </label>
              <Input
                placeholder="Digite os IDs..."
                value={filters.displayId}
                onChange={(e) => updateFilters({ displayId: e.target.value })}
                className={styles.input}
              />
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Button variant="outline" className="w-full" onClick={clearFilters}>
            Limpar filtros
          </Button>
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-white"
            onClick={() => setOpen(false)}
          >
            Aplicar filtros
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
