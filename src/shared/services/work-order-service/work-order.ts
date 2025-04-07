import { BaseService } from "@/core/api/base-service"
import type {
  IDailyWorkOrdersData,
  IFinishMaintenance,
  IFinishWaitingParts,
  IStartMaintenance,
  IStartWaitingParts,
  IWorkOrder,
  IWorkOrderWithCount,
} from "@/shared/types/work-order.interface"

/**
 * Service for managing work orders
 */
class WorkOrderService extends BaseService<IWorkOrder> {
  constructor() {
    super("/work-orders")
  }

  /**
   * Get daily work orders
   */
  async getDaily(startDate: string, endDate: string): Promise<IDailyWorkOrdersData> {
    return this.get<IDailyWorkOrdersData>(`/daily?startDate=${startDate}&endDate=${endDate}`)
  }

  /**
   * Get work order by ID with specific endpoint
   * Obs: Mantido porque usa um endpoint específico diferente do padrão (/work-orders/{id}/order)
   */
  async getOrderById(workOrderId: string): Promise<IWorkOrder> {
    return this.get<IWorkOrder>(`/${workOrderId}/order`)
  }

  /**
 * Get work order with pagination
 */
  async getPaginated(
    page = 1,
    limit = 10,
  ): Promise<{
    data: IWorkOrderWithCount[]
    total: number
    page: number
    limit: number
    totalPages: number
  }> {
    return this.get<{
      data: IWorkOrderWithCount[]
      total: number
      page: number
      limit: number
      totalPages: number
    }>(`?page=${page}&limit=${limit}`)
  }

  /**
   * Cancel a work order
   */
  async cancel(workOrderId: string): Promise<void> {
    return this.patch<void>(`/${workOrderId}/cancel`)
  }

  /**
   * Start maintenance for a work order
   */
  async startMaintenance(workOrderId: string, data: IStartMaintenance): Promise<IStartMaintenance> {
    return this.patch<IStartMaintenance, IStartMaintenance>(`/${workOrderId}/start-maintenance`, data)
  }

  /**
   * Finish maintenance for a work order
   */
  async finishMaintenance(workOrderId: string, data: IFinishMaintenance): Promise<IFinishMaintenance> {
    return this.patch<IFinishMaintenance, IFinishMaintenance>(`/${workOrderId}/finish-maintenance`, data)
  }

  /**
   * Move work order back to queue
   */
  async backToQueue(workOrderId: string): Promise<void> {
    return this.patch<void>(`/${workOrderId}/back-to-queue`)
  }

  /**
   * Start waiting for parts for a work order
   */
  async startWaitingParts(workOrderId: string, data: IStartWaitingParts): Promise<IStartWaitingParts> {
    return this.patch<IStartWaitingParts, IStartWaitingParts>(`/${workOrderId}/start-waiting-parts`, data)
  }

  /**
   * Finish waiting for parts for a work order
   */
  async finishWaitingParts(workOrderId: string, data: IFinishWaitingParts): Promise<IFinishWaitingParts> {
    return this.patch<IFinishWaitingParts, IFinishWaitingParts>(
      `/${workOrderId}/finish-waiting-parts`,
      data,
    )
  }
}

export const workOrderService = new WorkOrderService()


