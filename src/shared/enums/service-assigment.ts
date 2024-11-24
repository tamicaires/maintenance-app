export enum ServiceAssigmentStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED"
}

export type TServiceAssigmentStatus = keyof typeof ServiceAssigmentStatus;