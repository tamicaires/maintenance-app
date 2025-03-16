import { IVehicleWithCount } from "./vehicles";

export interface IVehicleFilters {
  page?: string;
  perPage?: string;
  plate?: string;
  km?: string;
  isActive?: boolean;
  startDate?: Date;
  endDate?: Date;
}

export interface IUseVehiclesHookReturn {
  data: IVehicleWithCount | undefined;
  error: Error | null;
  isLoading: boolean;
}