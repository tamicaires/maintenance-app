import { ServiceAssigmentStatus, TServiceAssigmentStatus } from "@/shared/enums/service-assigment";

export const getServiceAssigmentStatusInfo = (status: TServiceAssigmentStatus) => {
  switch (status) {
    case ServiceAssigmentStatus.COMPLETED:
      return {
        color: "green",
        label: "Concluído",
        description: "Serviço Finalizado.",
      };
    case ServiceAssigmentStatus.IN_PROGRESS:
      return {
        color: "blue",
        label: "Em andamento",
        description: "Serviço em andamento",
      };
    case ServiceAssigmentStatus.PENDING:
      return {
        color: "yellow",
        label: "Pendente",
        description: "Serviço não iniciado",
      };
    default:
      return {
        color: "gray",
        label: "Status Desconhecido",
        description: "Status não identificado",
      };
  }
};