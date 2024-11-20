import { TAxle } from "@/shared/enums/axle";

export interface IAxle {
  id: string;
  position: string;
  capacity: number;
  type: TAxle;
  trailerId: string;
  createdAt?: string;
  updatedAt?: string;
}

