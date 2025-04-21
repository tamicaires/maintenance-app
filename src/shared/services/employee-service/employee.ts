import { BaseService } from "@/core/api/base-service";
import {
  IEmployee,
  IEmployeeWithCount,
} from "@/shared/types/employee.interface";
import { EmployeeFiltersType } from "@/features/employee/hooks/use-employee";

class EmployeeService extends BaseService<IEmployee> {
  constructor() {
    super("/employees");
  }

  /**
   * Retorna um funcionário pelo ID
   */
  async getById(id: string): Promise<IEmployee> {
    return super.getById(id);
  }

  /**
   * Lista todos os funcionários com filtros
   */
  async getPaginated(filters?: EmployeeFiltersType): Promise<IEmployeeWithCount> {
    const params = new URLSearchParams(filters as Record<string, string>).toString();
    return this.get<IEmployeeWithCount>(`?${params}`);
  }
}

export const employeeService = new EmployeeService();
