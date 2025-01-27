import { RequestStatus } from "../enums/part-request";

interface Part {
  id: string;
  name: string;
  partNumber: string;
  stockQuantity: number;
}

interface User {
  id: string;
  name: string;
}

interface WorkOrder {
  id: string;
  displayId: string | null;
}

interface Axle {
  id: string;
  position: string | null;
}

interface Trailer {
  id: string;
  plate: string;
  position: number | null;
  axles: Axle[];
}

export interface IPartRequestRelationalData {
  id: string;
  partId: string;
  requestedById: string;
  requestedForEmployeeId: string | null;
  handledById: string | null;
  quantity: number;
  approvedQuantity: number | null;
  status: RequestStatus
  rejectionReason: string | null;
  requestedAt: string;
  handledAt: Date | null;
  deliveredAt: Date | null;
  trailerId: string | null;
  axleId: string | null;
  workOrderId: string;
  updatedAt: Date;
  part: Part;
  requestedBy: User;
  workOrder: WorkOrder;
  handledBy: User | null;
  trailer: Trailer | null;
}

export interface IPartRequestsRelationalDataList {
  partRequests: IPartRequestRelationalData[];
  total: number;
}
