import { BaseService } from "@/core/api/base-service";
import {
  IService,
  IServiceWithCount,
  IServiceWithEmployee,
} from "@/shared/types/service.interface";
import { IServiceFilters } from "@/features/service/hooks/use-service";

/**
 * Service for managing services
 */
class ServicesService extends BaseService<IService> {
  constructor() {
    super("/services");
  }

  /**
   * Get services by work order
   */
  async getByWorkOrder(workOrderId: string): Promise<IServiceWithEmployee[]> {
    return this.get<IServiceWithEmployee[]>(`/${workOrderId}/services`);
  }

  /**
   * Get paginated services with filters
   */
  async getPaginated(filters?: Partial<IServiceFilters>): Promise<IServiceWithCount> {
    const params = new URLSearchParams(filters as Record<string, string>);
    return this.get<IServiceWithCount>(`?${params.toString()}`);
  }
}

export const servicesService = new ServicesService();
