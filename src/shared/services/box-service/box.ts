import { BaseService } from "@/core/api/base-service"
import { IBoxFilters } from "@/features/boxes/hooks/use-box";
import { IBox, IBoxWithCount } from "@/shared/types/box"

/**
 * Service for managing boxes
 */
class BoxService extends BaseService<IBox> {
  constructor() {
    super("/boxes")
  }

  /**
 * Get work order with pagination
 */
  async getPaginated(
    filters?: Partial<IBoxFilters>
  ): Promise<IBoxWithCount> {
    const params = new URLSearchParams(filters as Record<string, string>);

    return this.get(`?${params.toString()}`)
  }
}

export const boxService = new BoxService
