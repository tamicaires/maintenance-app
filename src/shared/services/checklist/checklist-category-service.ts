import { BaseService } from "@/core/api/base-service"
import type {
  IChecklistCategory,
} from "@/shared/types/checklist"

/**
 * Service for managing checklist categories
 */
class ChecklistCategoryService extends BaseService<IChecklistCategory> {
  constructor() {
    super("/checklist-category")
  }

  /**
   * Get checklist categories by template ID
   */
  async getByTemplateId(templateId: string): Promise<IChecklistCategory[]> {
    return this.get<IChecklistCategory[]>(`/template/${templateId}`)
  }
}

export const checklistCategoryService = new ChecklistCategoryService()
