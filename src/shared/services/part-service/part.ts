import { BaseService } from "@/core/api/base-service";
import { IPart } from "@/shared/types/part";

class PartService extends BaseService<IPart> {
  constructor() {
    super("/parts");
  }
  
}

export const partService = new PartService();
