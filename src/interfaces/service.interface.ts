import { EmployeeBasicInfo } from "./employee.interface";


export interface IService {
  id: string;
  serviceName: string;
  serviceCategory: string;
  employees: EmployeeBasicInfo[];
}
