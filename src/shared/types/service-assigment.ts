import { ServiceCategory } from "../enums/service";
import { TServiceAssigmentStatus } from "../enums/service-assigment";
import { EmployeeBasicInfo } from "./employee.interface";

export interface IServiceAssignment {
  id: string
  workOrderId: string;
  service: {
    id: string;
    serviceName: string;
    serviceCategory: ServiceCategory;
  };
  employees: EmployeeBasicInfo[]
  trailer: {
    id: string;
    plate: string;
    position: number;
  }
  status: TServiceAssigmentStatus;
  startAt: Date | null;
  endAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateServiceAssigment {
  workOrderId: string;
  serviceId: string;
  employeeId: string | null;
  status: TServiceAssigmentStatus;
  startAt: Date | null;
  endAt: Date | null;
}

export type ChangeStatusRequestType = {
  serviceAssignmentId: string;
  status: TServiceAssigmentStatus;
  startAt: Date | null;
  endAt: Date | null;
}

export type ChangeStatusResponseType = {
  serviceAssignmentId: string;
  status: TServiceAssigmentStatus;
  startAt: Date | null;
  endAt: Date | null;
}