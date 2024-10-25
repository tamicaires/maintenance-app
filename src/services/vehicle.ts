import { IVehicle, IVehicleCreateAndUpdate } from "@/interfaces/vehicles.interface";
import { handleRequest, IApiResponse } from "@/services/api";

const create = async (
  data: IVehicleCreateAndUpdate
): Promise<IApiResponse<IVehicle>> => {
  const response = await handleRequest<IVehicle>({
    method: "POST",
    url: "/vehicles",
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
    url: `/vehicles/${trailerId}`,
    data,
  });

  return response;
};

const deleteVehicle = async (
  trailerId: string
): Promise<IApiResponse<void>> => {
  const response = await handleRequest<void>({
    method: "DELETE",
    url: `/vehicles/${trailerId}`,
  });

  return response;
};

const getAll = async (): Promise<IApiResponse<IVehicle[]>> => {
  const response = await handleRequest<IVehicle[]>({
    method: "GET",
    url: "/vehicles",
  });

  return response;
};

export const VehicleService = {
  create,
  update,
  deleteVehicle,
  getAll,
};
