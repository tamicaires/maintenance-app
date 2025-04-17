import { BaseService } from "@/core/api/base-service"
import type { IChecklistTemplate, ICreateChecklistTemplate } from "@/shared/types/checklist"

/**
 * Service for managing checklist templates
 */
class ChecklistTemplateService extends BaseService<IChecklistTemplate> {
  constructor() {
    super("/checklist-template")
  }

  /**
   * Create a new checklist template
   * @param data Template data to create
   * @returns Created checklist template
   */
  async create(data: ICreateChecklistTemplate): Promise<IChecklistTemplate> {
    return super.create(data)
  }

  /**
   * Get all checklist templates
   * @returns List of all checklist templates
   */
  async getAll(): Promise<IChecklistTemplate[]> {
    return super.getAll()
  }
}

export const checklistTemplateService = new ChecklistTemplateService()
