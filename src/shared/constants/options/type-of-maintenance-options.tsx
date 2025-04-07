import { TypeOfMaintenance } from "@/shared/enums/work-order";

export const typeOfMaintenanceOptions = [
  {
    value: TypeOfMaintenance.PREDITIVA,
    label: TypeOfMaintenance.PREDITIVA,
    description: "Baseada em dados e monitoramento de condições.",
  },
  {
    value: TypeOfMaintenance.PREVENTIVA,
    label: TypeOfMaintenance.PREVENTIVA,
    description: "Agendada para evitar falhas futuras.",
  },
  {
    value: TypeOfMaintenance.CORRETIVA,
    label: TypeOfMaintenance.CORRETIVA,
    description: "Executada após falha ou quebra.",
  },
];
