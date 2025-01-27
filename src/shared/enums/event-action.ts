export enum EventActionEnum {
  Created = "Created",
  Updated = "Updated",
  Started = "Started",
  Completed = "Completed",
  Canceled = "Canceled",
  Stopped = "Stopped",
  Scheduled = "Scheduled",
  Requested = "Requested"
}

export type TEventAction = keyof typeof EventActionEnum;
