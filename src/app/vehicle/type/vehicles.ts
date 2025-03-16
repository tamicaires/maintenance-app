import { IFleet } from "../../../shared/types/fleet.interface";

export interface IVehicle {
  id: string;
  plate: string;
  model: string;
  brand: string;
  year: string;
  color: string | null;
  km: number;
  power: number;
  isActive: boolean;
  fleetId: string | null;
  fleet: Pick<IFleet, 'id' | 'fleetNumber'> | null;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVehicleCreateAndUpdate {
  plate: string;
  model: string;
  brand: string;
  year: string;
  color: string | null;
  km: number;
  power: number;
  isActive: boolean | null;
  fleetId: string | null;
}

export interface IVehicleWithCount {
  vehicles: IVehicle[];
  totalCount: number;
}