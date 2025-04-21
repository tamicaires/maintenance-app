import { BaseService } from "@/core/api/base-service";
import {
  IPartCategory,
  IPartCategoryCreateAndUpdate,
} from "@/shared/types/part-category";

class PartCategoryService extends BaseService<IPartCategory> {
  constructor() {
    super("/part-categories");
  }
}

export const partCategoryService = new PartCategoryService();
