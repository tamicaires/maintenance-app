import { EventActionEnum } from "../enums/event-action";
import { SubjectEnum } from "../enums/subject";

export interface IEvent {
  id: string;
  event: EventActionEnum;
  subject: SubjectEnum;
  description: string;
  companyId: string;
  handledById: string | null;
  handledAt: Date | null;
  fleetId?: string | null;
  trailerId?: string | null;
  vehicleId?: string | null;
  workOrderId?: string | null;
  checklistId?: string | null;
  partRequestId?: string | null;
}

export interface IEventRelationalData {
  id: string;
  event: EventActionEnum;
  subject: SubjectEnum;
  description: string;
  companyId: string;
  handledById: string;
  handledBy: {
    id: string;
    name: string;
  };
  handledAt: string;
  fleetId?: string | null;
  trailerId?: string | null;
  vehicleId?: string | null;
  workOrderId?: string | null;
  workOrder: {
    id: string;
    displayId: string;
  };
  checklistId?: string | null;
  partRequestId?: string | null;
  checklist?: {
    id: string;
    template: {
      id: string;
      name: string;
      icon?: string | null;
    };
  } | null;
}

export type TabValue = "all" | "checklists" | "templates"

export interface Tab {
  value: TabValue
  label: string
  count: number
}

