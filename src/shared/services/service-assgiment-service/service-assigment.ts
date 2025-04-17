import { BaseService } from "@/core/api/base-service"
import {
  ChangeStatusRequestType,
  ChangeStatusResponseType,
  ICreateServiceAssigment,
  IServiceAssignment,
} from "@/shared/types/service-assigment"
import { IServiceCreateAndUpdate } from "@/shared/types/service.interface"

/**
 * Service for managing service assignments
 */
class ServiceAssignmentService extends BaseService<IServiceAssignment> {
  constructor() {
    super("/service-assignments")
  }

  /**
   * Delete a service assignment
   */
  async deleteAssignment(serviceId: string): Promise<void> {
    return this.delete(serviceId)
  }

  /**
   * Get service assignments by work order ID
   */
  async getByWorkOrder(workOrderId: string): Promise<IServiceAssignment[]> {
    return this.get<IServiceAssignment[]>(`/work-order/${workOrderId}`)
  }

  /**
   * Change status of a service assignment
   */
  async changeStatus(data: ChangeStatusRequestType): Promise<ChangeStatusResponseType> {
    return this.patch<ChangeStatusResponseType>(`/change-status/${data.serviceAssignmentId}`, {
      status: data.status,
      startAt: data.startAt,
      endAt: data.endAt,
    })
  }
}

export const serviceAssignmentService = new ServiceAssignmentService
