import { EventDescriptionEnum } from "@/shared/enums/event-action";
import { IEventRelationalData } from "@/shared/types/event";
import { IUpdatesTimeline } from "@/components/UpdatesTimeLine";

export const getEventInfo = (description: EventDescriptionEnum) => {
  switch (description) {
    case EventDescriptionEnum.Queue:
      return {
        color: "yellow",
        icon: "Clock",
        label: "Em Fila",
      };
    case EventDescriptionEnum.Start_Maintenance:
      return {
        color: "blue",
        icon: "Wrench",
        label: "Manutenção Iniciada",
      };
    case EventDescriptionEnum.Finished_Maintenance:
      return {
        color: "green",
        icon: "CheckCircle",
        label: "Manutenção Finalizada",
      };
    case EventDescriptionEnum.Part_Request:
      return {
        color: "orange",
        icon: "Package",
        label: "Solicitação de Peça",
      };
    case EventDescriptionEnum.Started_Waiting_Parts:
      return {
        color: "red",
        icon: "Pause",
        label: "Aguardando Peça",
      };
    case EventDescriptionEnum.Finished_Waiting_Parts:
      return {
        color: "orange",
        icon: "ArrowUpDown",
        label: "Finalizou Aguardando Peça",
      };
    default:
      return {
        color: "gray",
        icon: "AlertOctagon",
        label: "Desconhecido",
      };
  }
};

export const transformEventToUpdate = (event: IEventRelationalData): IUpdatesTimeline => {
  const eventInfo = getEventInfo(event.description as EventDescriptionEnum);

  return {
    date: new Date(event.handledAt),
    handledBy: event.handledBy,
    message: event.description,
    color: eventInfo.color,
    icon: eventInfo.icon,
  };
};