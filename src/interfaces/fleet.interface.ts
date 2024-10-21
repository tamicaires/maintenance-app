import { ITrailer } from "./trailer.interface";

export interface IFleet {
  id: string;
  fleetNumber: string;
  plate: string;
  trailers: ITrailer[];
  km: string;
  isActive: boolean;
  carrierId: string;
  carrierName: string;
  createdAt?: string;
}

export interface IFleetCreate {
  fleetNumber: string;
  plate: string;
  trailers: ITrailer[];
  km: string;
  isActive: boolean;
  carrierId: string;
}

export interface IFleetUpdate {
  fleetNumber?: string;
  plate?: string;
  trailers?: ITrailer[];
  km?: string;
  carrierId?: string;
  isActive: boolean;
}
