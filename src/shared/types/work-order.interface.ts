import {
  MaintenanceStatus,
  TypeOfMaintenance,
  Box,
} from "@/shared/enums/work-order";
import { IActiveTrailer } from "./trailer.interface";

export interface IWorkOrder {
  id: string;
  displayId: string;
  fleetInfo: {
    fleetNumber: string;
    carrierName: string;
    trailers: IActiveTrailer[];
  }
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
  box: Box;
  isCancelled: boolean;
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
  box?: Box;
  isCancelled: boolean;
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
  isCancelled: boolean;
  createdBy?: string;
  updatedBy?: string;
  status?: MaintenanceStatus;
  updatedAt?: string;
}

export interface IStartMaintenance {
  status: MaintenanceStatus;
  entryMaintenance: Date;
  boxId: string;
}

export interface IFinishMaintenance {
  status: MaintenanceStatus;
  exitMaintenance: Date;
  exitSupervisor: string;
}

export interface IStartWaitingParts {
  status: MaintenanceStatus;
  startWaitingParts: Date;
}