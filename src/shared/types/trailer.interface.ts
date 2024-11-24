import { IAxle } from "./axle";

export interface ITrailer {
  id: string;
  plate: string;
  position: number | null;
  isActive: boolean;
  fleetId: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ITrailerCreateAndUpdate {
  plate: string;
  position?: number | null;
  isActive: boolean;
  fleetId?: string | null;
}

export interface IActiveTrailer {
  id: string;
  plate: string;
  position: number;
  isActive: boolean;
  axles: Pick<IAxle, 'id' | 'position'>[];
}