import { IVehicleFilters } from "@/features/vehicle/type/vehicle-hook";
import { IVehicle, IVehicleCreateAndUpdate, IVehicleWithCount } from "@/features/vehicle/type/vehicles";
import { handleRequest, IApiResponse } from "@/shared/services/api";
import { ApiUrls } from "../constants/api-urls";

const create = async (
  data: IVehicleCreateAndUpdate
): Promise<IApiResponse<IVehicle>> => {
  const response = await handleRequest<IVehicle>({
    method: "POST",
    url: ApiUrls.VEHICLE,
    data,
  });
  return response;
};

const update = async (
  trailerId: string,
  data: IVehicleCreateAndUpdate
): Promise<IApiResponse<IVehicle>> => {
  const response = await handleRequest<IVehicle>({
    method: "PUT",
    url: `${ApiUrls.VEHICLE}/${trailerId}`,
    data,
  });

  return response;
};

const deleteVehicle = async (
  trailerId: string
): Promise<IApiResponse<void>> => {
  const response = await handleRequest<void>({
    method: "DELETE",
    url: `${ApiUrls.VEHICLE}/${trailerId}`,
  });

  return response;
};

const getAll = async (filters?: IVehicleFilters): Promise<IApiResponse<IVehicleWithCount>> => {
  const params = new URLSearchParams(filters as Record<string, string>).toString();
  const response = await handleRequest<IVehicleWithCount>({
    method: "GET",
    url: `${ApiUrls.VEHICLE}?${params}`,
  });

  return response;
};

export const VehicleService = {
  create,
  update,
  deleteVehicle,
  getAll,
};
