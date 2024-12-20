import { ServiceCategory } from "../enums/service";
import { EmployeeBasicInfo } from "./employee.interface";

export interface IService {
  id: string;
  serviceName: string;
  serviceCategory: ServiceCategory;
}
export interface IServiceWithEmployee {
  id: string;
  serviceName: string;
  serviceCategory: string;
  employees: EmployeeBasicInfo[];
}

export interface IServiceCreateAndUpdate {
  serviceName: string;
  serviceCategory: string;
}
