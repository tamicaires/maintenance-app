import { BaseService } from "@/core/api/base-service"
import type { IEventRelationalData } from "@/shared/types/event"

export interface ListEventsParams {
  page?: string
  perPage?: string
  checklistId?: string
  event?: string
  subject?: string
  startDate?: string
  endDate?: string
}

/**
 * Service for managing events
 */
class EventService extends BaseService<IEventRelationalData> {
  constructor() {
    super("/event")
  }

  /**
   * List events with optional filters
   */
  async list(filters?: ListEventsParams): Promise<IEventRelationalData[]> {
    const params = new URLSearchParams(filters as Record<string, string>);
    return this.get<IEventRelationalData[]>(`?${params}`)
  }

  /**
   * Get events by Work Order ID
   */
  async getByWorkOrder(workOrderId: string): Promise<IEventRelationalData[]> {
    return this.get<IEventRelationalData[]>(`/work-order/${workOrderId}`)
  }
}

export const eventService = new EventService()
