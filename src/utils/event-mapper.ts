import { EventActionEnum } from "@/shared/enums/event-action"
import { SubjectEnum } from "@/shared/enums/subject"

export const eventActionToPortuguese: Record<EventActionEnum, string> = {
  [EventActionEnum.Created]: "Criado",
  [EventActionEnum.Updated]: "Atualizado",
  [EventActionEnum.Started]: "Iniciou",
  [EventActionEnum.Completed]: "Concluído",
  [EventActionEnum.Canceled]: "Cancelado",
  [EventActionEnum.Stopped]: "Parado",
  [EventActionEnum.Scheduled]: "Agendado",
  [EventActionEnum.Requested]: "solicitou",
}

export const subjectToPortuguese: Record<SubjectEnum, string> = {
  [SubjectEnum.Company]: "Empresa",
  [SubjectEnum.User]: "Usuário",
  [SubjectEnum.Project]: "Projeto",
  [SubjectEnum.Fleet]: "Frota",
  [SubjectEnum.Carrier]: "Transportadora",
  [SubjectEnum.Service]: "Serviço",
  [SubjectEnum.Checklist]: "Checklist",
  [SubjectEnum.Template_Checklist]: "Template de Checklist", 
  [SubjectEnum.Part_Request]: "Requisição de Peça", 
}

