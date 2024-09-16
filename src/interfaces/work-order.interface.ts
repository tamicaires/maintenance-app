import {
  MaintenanceStatus,
  TypeOfMaintenance,
  Box,
} from "@/shared/enums/work-order";

export interface IWorkOrder {
  id: string;
  displayId: string;
  fleetNumber: string;
  carrierName: string;
  plate: string;
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
  status: MaintenanceStatus;
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

export interface IWorkOrderUpdate {
  id?: string;
  displayId?: string;
  severityLevel?: string;
  entryQueue?: string;
  entryMaintenance?: string;
  exitMaintenance?: string;
  startWaitingParts?: string;
  endWaitingParts?: string;
  queueDuration?: number;
  maintenanceDuration?: number;
  waitingPartsDuration?: number;
  exitSupervisor?: string;
  fleetId?: string;
  user?: string;
  typeOfMaintenance?: TypeOfMaintenance;
  box?: Box;
  createdBy?: string;
  updatedBy?: string;
  status?: MaintenanceStatus;
  updatedAt?: string;
}
