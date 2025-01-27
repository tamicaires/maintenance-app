export interface IChecklistTemplate {
  id: string
  name: string
  companyId: string
  items: IChecklistItemTemplate[]
  icon?: string
  createdAt: Date
  updatedAt: Date
}

export interface IChecklistItemTemplate {
  id: string
  description: string
  weight: number;
  checklistCategoryId: string;
  templateId: string
  createdAt: Date
  updatedAt: Date
}

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

export interface IChecklistItem {
  id: string
  checklistId: string
  itemTemplateId: string
  trailerId: string;
  isConform: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ICreateChecklistTemplate {
  name: string
  icon?: string
}

export interface ICreateChecklistItem {
  description: string
  templateId: string
}

export interface IChecklistCategory {
  id: string;
  name: string;
  description: string | null;
  templateId: string;
  items: IChecklistItemTemplate[];
  createdAt: Date
  updatedAt: Date
}

export interface ICreateChecklistCategory {
  name: string;
  description?: string;
  templateId: string;
}

export interface ICreateChecklistTemplateItem {
  description: string;
  templateId: string;
  weight: number;
  checklistCategoryId: string;
}

