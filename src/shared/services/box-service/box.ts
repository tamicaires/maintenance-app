import { BaseService } from "@/core/api/base-service"
import { IBoxFilters } from "@/features/boxes/hooks/use-box";
import { IBox, IBoxWithCount, IBoxWithRelationalData } from "@/shared/types/box"

/**
 * Service for managing boxes
 */
class BoxService extends BaseService<IBox> {
  constructor() {
    super("/boxes")
  }

  /**
 * Get boxes with pagination
 */
  async getPaginated(
    filters?: Partial<IBoxFilters>
  ): Promise<IBoxWithCount> {
    const params = new URLSearchParams(filters as Record<string, string>);

    return this.get(`?${params.toString()}`)
  }
  /**
 * Get boxes with pagination
 */
  async getRelationalData(): Promise<IBoxWithRelationalData[]> {
    return this.get(`/relational`)
  }
}

export const boxService = new BoxService
