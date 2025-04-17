import { BaseService } from "@/core/api/base-service"
import type { IChecklistTemplateItem } from "@/shared/types/checklist/checklist-template-item"

/**
 * Service for managing checklist template items
 */
class ChecklistTemplateItemService extends BaseService<IChecklistTemplateItem> {
  constructor() {
    super("/checklist-template-item")
  }

  /**
   * Get all items by template ID
   */
  async getByTemplateId(templateId: string): Promise<IChecklistTemplateItem[]> {
    return this.get<IChecklistTemplateItem[]>(`/template/${templateId}`)
  }

  /**
   * Get all checklist template items
   */
  async getAllItems(): Promise<IChecklistTemplateItem[]> {
    return this.getAll()
  }
}

export const checklistTemplateItemService = new ChecklistTemplateItemService()
