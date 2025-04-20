import { BaseService } from "@/core/api/base-service"
import type {
  IFleet,
  IFleetWithCount,
} from "@/shared/types/fleet.interface"
import type { IFleetFilters } from "@/features/fleet/hooks/use-fleet"

/**
 * Service for managing fleets
 */
class FleetService extends BaseService<IFleet> {
  constructor() {
    super("/fleets")
  }

  /**
   * Get all fleets with optional filters
   */
  async getPaginated(filters?: Partial<IFleetFilters>): Promise<IFleetWithCount> {
    const query = new URLSearchParams(filters as Record<string, string>).toString()
    return this.get<IFleetWithCount>(`?${query}`)
  }
}

export const fleetService = new FleetService()
