import { TypeOfMaintenance } from "@/shared/enums/work-order";
import { IChecklistItem } from "../checklist";
import { ITemplateChecklistWithRelationalData } from "./checklist-template";
import { IActiveTrailer } from "../trailer.interface";

export interface IChecklist {
  id: string
  workOrderId: string
  templateId: string
  template: {
    id: string;
    name: string;
    icon?: string;
  }
  workOrder: {
    id: string;
    displayId: string;
  }
  items: IChecklistItem[]
  createdAt: Date
  updatedAt: Date
}

export interface ICreateChecklist {
  workOrderId: string;
  templateId: string;
}

export interface IChecklistWithRelationalData {
  id: string;
  workOrderId: string;
  templateId: string;
  startAt: string | null;
  endAt: string | null;
  isCanceled: boolean;
  createdAt: string;
  updatedAt: string;
  template: ITemplateChecklistWithRelationalData;
  workOrder: {
    id: string;
    displayId: string;
    typeOfMaintenance: TypeOfMaintenance;
    fleet: {
      id: string;
      fleetNumber: string;
      trailers: IActiveTrailer[];
    };
  };
}
