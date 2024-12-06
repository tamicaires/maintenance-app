import { TRequestStatus } from "@/shared/enums/part-request";

export interface IPartRequest {
  id: string;
  requestedForEmployeeId: string | null;
  handledById: string | null;
  quantity: number;
  approvedQuantity: number | null;
  status: TRequestStatus;
  isRejected: boolean;
  rejectionReason: string | null;
  requestedAt: Date;
  handledAt: Date | null;
  deliveredAt: Date | null;
  updatedAt: Date;
  trailer: {
    id: string;
    position: string;
    plate: string
    axle: {
      id: string;
      position: string;
    }
  }
  part?: {
    id: string;
    name: string;
    partNumber: string;
    stockQuantity: number;
  };
  requestedBy?: {
    id: string;
    name: string;
  };
  workOrder: {
    id: string;
    displayId: string
  } | null;
}

export interface ICreatePartRequest {
  partId: string;
  requestedForEmployeeId: string | null;
  quantity: number;
  status: TRequestStatus;
  workOrderId: string | null;
  axleId: string | null;
  trailerId: string;
}

export interface ICreatePartRequestBatch {
  batchData: ICreatePartRequest[];
}

export interface IUpdatePartRequest {
  requestedById: string;
  requestedForEmployeeId: string | null;
  handledById: string | null;
  quantity: number;
  approvedQuantity: number | null;
  status: TRequestStatus;
  isRejected: boolean;
  rejectionReason: string | null;
  requestedAt: Date;
  handledAt: Date | null;
  deliveredAt: Date | null;
  workOrderId: string | null;
  updatedAt: Date;
}

export interface IRejectPartRequest {
  rejectionReason: string;
}

export interface IRejectPartRequestResponse {
  partRequestId: string;
  rejectionReason: string | null;
  handleById: string;
  handleAt: Date;
  status: TRequestStatus;
}

export type THandledPartRequestResponse = {
  partRequestId: string;
  partId: string;
  handledById: string;
  handledAt: Date;
  status: TRequestStatus;
  approvedQuantity?: number;
  rejectionReason?: string;
}
