import { BaseService } from "@/core/api/base-service"
import { IBox } from "@/shared/types/box"

/**
 * Service for managing service assignments
 */
class BoxService extends BaseService<IBox> {
  constructor() {
    super("/boxes")
  }

}

export const boxService = new BoxService
