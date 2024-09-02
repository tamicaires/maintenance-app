import {
  MaintenanceStatus,
  TypeOfMaintenance,
} from "@/shared/enums/work-order";

export interface IWorkOrder {
  id: string;
  displayId: string;
  severityLevel: string;
  entryQueue?: string | undefined;
  entryMaintenance?: string;
  exitMaintenance?: string;
  startWaitingParts?: string;
  endWaitingParts?: string;
  queueDuration?: number;
  maintenanceDuration?: number;
  waitingPartsDuration?: number;
  exitSupervisor?: string;
  fleetId: string;
  fleetNumber: string;
  user?: string;
  typeOfMaintenance: string;
  box: string;
  createdBy: string;
  status: string;
  createdAt: string;
}

export interface ICreateWorkOrder {
  severityLevel: string;
  entryQueue?: Date;
  entryMaintenance?: Date;
  status: MaintenanceStatus;
  fleetId: string;
  typeOfMaintenance: TypeOfMaintenance;
  box?: string;
}
export interface IWorkOrder {
  id: string;
  displayId: string;
  severityLevel: string;
  entryQueue?: string | undefined;
  entryMaintenance?: string;
  exitMaintenance?: string;
  startWaitingParts?: string;
  endWaitingParts?: string;
  queueDuration?: number;
  maintenanceDuration?: number;
  waitingPartsDuration?: number;
  exitSupervisor?: string;
  fleetId: string;
  user?: string;
  typeOfMaintenance: string;
  box: string;
  createdBy: string;
  status: string;
  createdAt: string;
}

export interface IWorkOrderUpdate {
  id: string;
  displayId: string;
  severityLevel: string;
  entryQueue?: Date;
  entryMaintenance?: Date;
  exitMaintenance?: Date;
  startWaitingParts?: Date;
  endWaitingParts?: Date;
  queueDuration?: number;
  maintenanceDuration?: number;
  waitingPartsDuration?: number;
  exitSupervisor?: string;
  fleetId: string;
  user?: string;
  typeOfMaintenance: string;
  box: string;
  createdBy?: string;
  updatedBy?: string;
  status?: string;
  updatedAt?: string;
}
