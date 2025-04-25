import { BaseService } from "@/core/api/base-service"
import type {
  IChecklistItem,
  ICreateChecklisItemBatch,
} from "@/shared/types/checklist/checklist-item"

class ChecklistItemService extends BaseService<IChecklistItem> {
  constructor() {
    super("/checklist-item")
  }

  /**
   * Cria vários itens de checklist em lote
   */
  async createBatch(data: ICreateChecklisItemBatch): Promise<IChecklistItem[]> {
    return this.post<IChecklistItem[], ICreateChecklisItemBatch>("/batch", data)
  }

  /**
   * Altera a conformidade de um item de checklist
   */
  async changeConformity(checklistItemId: string, isConform: boolean): Promise<IChecklistItem> {
    return this.patch<IChecklistItem, { isConform: boolean }>(
      `conformity/${checklistItemId}`,
      { isConform }
    )
  }

  /**
   * Retorna os itens de um checklist específico
   */
  async getByChecklist(checklistId: string): Promise<IChecklistItem[]> {
    return this.get<IChecklistItem[]>(`/checklist/${checklistId}`)
  }
}

export const checklistItemService = new ChecklistItemService()
