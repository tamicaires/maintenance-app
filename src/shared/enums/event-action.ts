export enum EventActionEnum {
  Created = "Created",
  Updated = "Updated",
  Started = "Started",
  Completed = "Completed",
  Canceled = "Canceled",
  Stopped = "Stopped",
  Scheduled = "Scheduled",
  Requested = "Requested",
  Queued = "Queued",
  Finished = "Finished"
}

export type TEventAction = keyof typeof EventActionEnum;

export enum EventDescriptionEnum {
  Queue = "Registro de entrada em fila",
  Start_Maintenance = "Manutenção iniciada",
  Finished_Maintenance = "Manutenção Finalizada",
  Part_Request = "Registro de solicitação de peça",
  Started_Waiting_Parts = "Iniciou periodo aguardando peça",
  Finished_Waiting_Parts = "Finalizou periodo aguardando peças"
}