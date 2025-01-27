export interface IChecklistTemplateItem {
  id: string
  description: string
  weight: number;
  checklistCategoryId: string;
  templateId: string
  createdAt: Date
  updatedAt: Date
}

export interface ICreateChecklistTemplateItem {
  description: string;
  templateId: string;
  weight: number;
  checklistCategoryId: string;
}