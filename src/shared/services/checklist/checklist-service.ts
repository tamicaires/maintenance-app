import { BaseService } from "@/core/api/base-service"
import type { IChecklist, IChecklistWithRelationalData, ICreateChecklist } from "@/shared/types/checklist/checklist"

/**
 * Service for managing checklists
 */
class ChecklistService extends BaseService<IChecklist> {
  constructor() {
    super("/checklist")
  }

  /**
   * Create a new checklist
   * @param data Checklist data to create
   * @returns Created checklist
   */
  async create(data: ICreateChecklist): Promise<IChecklist> {
    return super.create(data)
  }

  /**
   * Get checklist with relational data
   * @param checklistId Checklist ID
   * @returns Checklist with relational data
   */
  async getWithRelationalData(checklistId: string): Promise<IChecklistWithRelationalData> {
    return this.get<IChecklistWithRelationalData>(`/with-relational-data/${checklistId}`)
  }

  /**
   * Get checklist by work order ID
   * @param workOrderId Work order ID
   * @returns Checklist associated with the work order
   */
  async getByWorkOrder(workOrderId: string): Promise<IChecklistWithRelationalData> {
    return this.get<IChecklistWithRelationalData>(`/by-work-order/${workOrderId}`)
  }

  /**
   * Get all checklists
   * @returns List of all checklists
   */
  async getAll(): Promise<IChecklist[]> {
    return super.getAll()
  }
}

// Export a singleton instance
export const checklistService = new ChecklistService()
