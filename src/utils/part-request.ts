import { RequestStatus, TRequestStatus } from "@/shared/enums/part-request";

export const getRequestStatusInfo = (status: TRequestStatus) => {
  switch (status) {
    case RequestStatus.APPROVED:
      return {
        color: "green",
        label: "Aprovado",
        description: "Disponível para liberação",
      };
    case RequestStatus.DELIVERED:
      return {
        color: "blue",
        label: "Entregue",
        description: "Solicitação",
      };
    case RequestStatus.PENDING:
      return {
        color: "yellow",
        label: "Pendente",
        description: "Aguardando aprovação",
      };
    case RequestStatus.REJECTED:
      return {
        color: "red",
        label: "Rejeitada",
        description: "Solicitação negada",
      };
    default:
      return {
        color: "gray",
        label: "Status Desconhecido",
        description: "Status não identificado",
      };
  }
};