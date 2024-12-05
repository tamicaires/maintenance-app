export enum ServiceAssigmentStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export type TServiceAssigmentStatus = keyof typeof ServiceAssigmentStatus;