export enum RequestStatus {
  PENDING = "PENDING", 
  APPROVED = "APPROVED",
  REJECTED  = "REJECTED",
  DELIVERED = "DELIVERED",
}

export type TRequestStatus = keyof typeof RequestStatus;