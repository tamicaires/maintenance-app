import { ITrailer } from "./trailer.interface";

export interface IFleet {
  id: string;
  fleetNumber: string;
  trailers: ITrailer[];
  isActive: boolean;
  carrierId: string;
  carrierName: string;
  createdAt?: string;
}

export interface IFleetCreate {
  fleetNumber: string;
  isActive: boolean;
  carrierId: string;
} 

export interface IFleetUpdate {
  fleetNumber?: string;
  carrierId?: string;
  isActive: boolean;
}
