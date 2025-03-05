import { ServiceCategory } from "../enums/service";
import { EmployeeBasicInfo } from "./employee.interface";

export interface IService {
  id: string;
  serviceName: string;
  serviceCategory: ServiceCategory;
  weight: number;
}

export interface IServiceWithCount {
  services: IService[];
  totalCount: number;
}

export interface IServiceWithEmployee {
  id: string;
  serviceName: string;
  serviceCategory: string;
  weight: number;
  employees: EmployeeBasicInfo[];
}

export interface IServiceCreateAndUpdate {
  serviceName: string;
  serviceCategory: string;
  weight: number;
}
