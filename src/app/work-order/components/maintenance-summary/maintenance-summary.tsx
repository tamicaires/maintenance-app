import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import { List } from "lucide-react";

export interface SummaryItem {
  icon: React.ElementType;
  label: string;
  value: string;
  color: "yellow" | "blue" | "green";
}
export interface MaintenanceSummary {
  items: SummaryItem[];
}

export function MaintenanceSummary({ items }: MaintenanceSummary) {
  return (
    <div>
      <div className="flex items-center gap-3 pb-5">
        <div className="gap-2 bg-primary/15 p-2.5 rounded-lg">
          <List className="text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold leading-tight tracking-tight">
            Resumo do dia
          </h2>
          <span className="text-sm text-muted-foreground">
            {format(new Date(), "EEEE dd/MM/yyyy", {
              locale: ptBR,
            }).replace(/^\w/, (c) => c.toUpperCase())}
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="flex justify-between items-center p-3 bg-accent/60 rounded-lg"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`bg-${item.color}-500 bg-opacity-15 border p-2 border-${item.color}-500 rounded-lg`}
              >
                <item.icon className={` h-5 w-5 text-${item.color}-500`} />
              </div>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <span className="text-2xl font-bold">{item.value}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
