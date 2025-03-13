import { IAxle } from "./axle";
import { IFleet } from "./fleet.interface";
import { IQueryCount } from "./query-response";

export interface ITrailer {
  id: string;
  plate: string;
  position: number | null;
  isActive: boolean;
  fleetId: string | null;
  fleet?: Pick<IFleet, 'id' | 'fleetNumber'>;
  axles?: Pick<IAxle, 'id' | 'position'>[];
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
  isActive: boolean
  axles: Pick<IAxle, 'id' | 'position'>[];
  fleet?: Pick<IFleet, 'id' | 'fleetNumber'>;
}

export interface ITrailerWithCount extends IQueryCount {
  trailers: ITrailer[];
}