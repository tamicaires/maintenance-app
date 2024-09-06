import { EmployeeBasicInfo } from "@/services/employee";

export interface IService {
  id: string;
  serviceName: string;
  serviceCategory: string;
  employees: EmployeeBasicInfo[];
}
