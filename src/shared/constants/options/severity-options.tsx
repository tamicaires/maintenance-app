import { SeverityLevel } from "@/shared/enums/work-order";
import { Bell, AlertCircle, AlertTriangle, Siren } from "lucide-react";

export const severityOptions = [
  {
    value: SeverityLevel.BAIXA,
    label: SeverityLevel.BAIXA,
    description: "Poucos serviços, baixa complexidade.",
    icon: <Bell className="w-4 h-4 text-blue-500" />,
  },
  {
    value: SeverityLevel.NORMAL,
    label: SeverityLevel.NORMAL,
    description: "Serviços moderados e controláveis.",
    icon: <AlertCircle className="w-4 h-4 text-green-500" />,
  },
  {
    value: SeverityLevel.ALTA,
    label: SeverityLevel.ALTA,
    description: "Serviços difíceis ou em grande volume.",
    icon: <AlertTriangle className="w-4 h-4 text-orange-500" />,
  },
  {
    value: SeverityLevel.URGENTE,
    label: SeverityLevel.URGENTE,
    description: "Alta complexidade e urgência.",
    icon: <Siren className="w-4 h-4 text-red-500" />,
  },
];
