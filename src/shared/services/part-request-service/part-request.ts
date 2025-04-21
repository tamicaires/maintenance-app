import { BaseService } from "@/core/api/base-service";
import {
  ICreatePartRequest,
  ICreatePartRequestBatch,
  IPartRequest,
  IUpdatePartRequest,
  THandledPartRequestResponse,
} from "@/shared/types/part-request";
import { IPartRequestsRelationalDataList } from "@/shared/types/part-request-relational-data";

/**
 * Service for managing part requests
 */
class PartRequestService extends BaseService<IPartRequest> {
  constructor() {
    super("/part-requests");
  }

  /**
   * Create a batch of part requests
   */
  async createBatch(data: ICreatePartRequestBatch): Promise<IPartRequest[]> {
    return this.post<IPartRequest[], ICreatePartRequestBatch>("/batch", data);
  }


  /**
   * Approve a part request
   */
  async approve(id: string, approvedQuantity: number): Promise<THandledPartRequestResponse> {
    return this.post<THandledPartRequestResponse, { approvedQuantity: number }>(
      `/approve/${id}`,
      { approvedQuantity }
    );
  }

  /**
   * Reject a part request
   */
  async reject(id: string, rejectionReason: string): Promise<THandledPartRequestResponse> {
    return this.post<THandledPartRequestResponse, { rejectionReason: string }>(
      `/reject/${id}`,
      { rejectionReason }
    );
  }

  /**
   * Get part request by ID
   */
  async getById(partRequestId: string): Promise<IPartRequest> {
    return this.get<IPartRequest>(`/${partRequestId}`);
  }

  /**
   * Get part requests by work order ID
   */
  async getByWorkOrderId(workOrderId: string): Promise<IPartRequest[]> {
    return this.get<IPartRequest[]>(`/work-order/${workOrderId}`);
  }

  /**
   * Get all part requests with optional filters
   */
  async getPaginated(filters?: {
    page?: string;
    perPage?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<IPartRequestsRelationalDataList> {
    const params = new URLSearchParams(filters as Record<string, string>);
    return this.get<IPartRequestsRelationalDataList>(`?${params.toString()}`);
  }
}

export const partRequestService = new PartRequestService();
