import { IChecklistItemTemplate } from "../checklist"

export interface IChecklistItem {
  id: string;
  checklistId: string;
  itemTemplateId: string;
  templateItem: IChecklistItemTemplate;
  isConform: boolean;
  trailerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateChecklistItem {
  checklistId: string;
  itemTemplateId: string;
  isConform: boolean;
  trailerId: string;
}

export interface ICreateChecklisItemBatch {
  checklistId: string;
  templateId: string;
}
