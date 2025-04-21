import { BaseService } from "@/core/api/base-service";
import {
  IEmployee,
} from "@/shared/types/employee.interface";
import {
  EmployeeServiceAssigmentCreateType,
  EmployeeServiceAssigmentType,
} from "@/shared/types/employee-service-assigment";

class EmployeeServiceAssigmentService extends BaseService<IEmployee> {
  constructor() {
    super("/employee-service-assigment");
  }

  /**
   * Adiciona um serviço a um funcionário
   */
  async addServiceEmployee(
    data: EmployeeServiceAssigmentCreateType
  ): Promise<EmployeeServiceAssigmentType> {
    return this.post<EmployeeServiceAssigmentType, EmployeeServiceAssigmentCreateType>("", data);
  }

  /**
   * Remove um funcionário do serviço
   */
  async deleteEmployee(employeeId: string): Promise<void> {
    return this.delete(employeeId);
  }
}

export const employeeServiceAssigmentService = new EmployeeServiceAssigmentService();
