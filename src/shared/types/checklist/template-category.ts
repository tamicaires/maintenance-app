import { IChecklistItemTemplate } from "../checklist";

export interface IChecklistTemplateCategoryWithRelationalData {
  id: string;
  name: string;
  description: string;
  templateItems: Pick<IChecklistItemTemplate, 'id' | 'description' | 'weight'>[];
}