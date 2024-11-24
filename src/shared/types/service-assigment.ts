import { TServiceAssigmentStatus } from "../enums/service-assigment";

export interface IServiceAssignment {
  workOrderId: string;
  serviceId: string;
  employeeId: string | null;
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
