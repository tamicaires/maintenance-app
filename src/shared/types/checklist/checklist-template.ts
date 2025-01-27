import { IChecklistTemplateCategoryWithRelationalData } from "./template-category";

export interface ITemplateChecklistWithRelationalData {
  id: string;
  name: string;
  icon: string | null;
  templateCategories: IChecklistTemplateCategoryWithRelationalData[];
}