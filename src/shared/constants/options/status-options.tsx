import { MaintenanceStatus } from "@/shared/enums/work-order";
import {
  PackageSearch,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export const maintenanceStatusOptions = [
  {
    value: MaintenanceStatus.FILA,
    label: "Fila",
    description: "Aguardando início da manutenção.",
    // icon: <Loader className="w-4 h-4 text-blue-500" />,
  },
  {
    value: MaintenanceStatus.MANUTENCAO,
    label: "Manutenção",
    description: "Em execução.",
    // icon: <Wrench className="w-4 h-4 text-orange-500" />,
  },
  {
    value: MaintenanceStatus.AGUARDANDO_PECA,
    label: "Aguardando peça",
    description: "Pausada por falta de peças.",
    icon: <PackageSearch className="w-4 h-4 text-yellow-500" />,
  },
  {
    value: MaintenanceStatus.FINALIZADA,
    label: "Finalizada",
    description: "Serviço concluído.",
    icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
  },
  {
    value: MaintenanceStatus.CANCELADA,
    label: "Cancelada",
    description: "Ordem de serviço cancelada.",
    icon: <XCircle className="w-4 h-4 text-red-500" />,
  },
];
