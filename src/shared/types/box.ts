import { MaintenanceStatus } from "../enums/work-order";

export interface IBox {
  id: string;
  name: string;
  description: string | null;
  position: number;
  isActive: boolean;
  companyId: string;
}

export interface IBoxCreateAndUpdate {
  name: string;
  description: string | null;
  isActive: boolean;
}

interface ServiceAssignment {
  id: string;
  status: string;
}

interface Fleet {
  id: string;
  fleetNumber: string;
}

export interface IWorkOrderBoxRelationalData {
  id: string;
  displayId: string;
  typeOfMaintenance: string;
  entryMaintenance: string;
  status: MaintenanceStatus;
  fleet: Fleet;
  serviceAssignments: ServiceAssignment[];
}

export interface IBoxWithRelationalData {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  companyId: string;
  workOrder: IWorkOrderBoxRelationalData;
  progress: number;
}

export interface IBoxWithCount {
  boxes: IBox[]
  totalCount: number
}

export type BoxData = IBoxWithRelationalData[];
