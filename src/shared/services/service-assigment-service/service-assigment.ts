import { BaseService } from "@/core/api/base-service"
import {
  ChangeStatusRequestType,
  ChangeStatusResponseType,
  ICreateServiceAssigment,
  IServiceAssignment,
} from "@/shared/types/service-assigment"

/**
 * Service for managing service assignments
 */
class ServiceAssignmentService extends BaseService<IServiceAssignment> {
  constructor() {
    super("/service-assignments")
  }

  /**
   * Create a new service assignment
   */
  async create(data: ICreateServiceAssigment): Promise<IServiceAssignment> {
    return super.create(data)
  }

  /**
   * Delete a service assignment
   */
  async deleteServiceAssignment(serviceId: string): Promise<void> {
    return super.delete(serviceId)
  }

  /**
   * Get all service assignments
   */
  async getAllAssignments(): Promise<IServiceAssignment[]> {
    return super.getAll()
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
    return this.patch<ChangeStatusResponseType, Partial<ChangeStatusRequestType>>(
      `change-status/${data.serviceAssignmentId}`,
      {
        status: data.status,
        startAt: data.startAt,
        endAt: data.endAt,
      }
    )
  }
}

export const serviceAssignmentService = new ServiceAssignmentService()
