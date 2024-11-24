import {
  IFleet,
  IFleetCreate,
  IFleetUpdate,
} from "@/shared/types/fleet.interface";
import { handleRequest, IApiResponse } from "@/services/api";

const create = async (data: IFleetCreate): Promise<IApiResponse<IFleet>> => {
  const response = await handleRequest<IFleet>({
    method: "POST",
    url: "/fleets",
    data,
  });

  return response;
};

const update = async (
  fleetId: string,
  data: IFleetUpdate
): Promise<IApiResponse<IFleet>> => {
  const response = await handleRequest<IFleet>({
    method: "PUT",
    url: `/fleets/${fleetId}`,
    data,
  });

  return response;
};

const deleteFleet = async (id: string): Promise<IApiResponse<void>> => {
  const response = await handleRequest<void>({
    method: "DELETE",
    url: `/fleets/${id}`,
  });

  return response;
};

const getAll = async (
  page: number = 1,
  perPage: number = 3
): Promise<IApiResponse<IFleet[]>> => {
  const response = await handleRequest<IFleet[]>({
    method: "GET",
    url: "/fleets",
    params: { page, perPage },
  });
  console.log("response", response);  
  return response;
};

export const FleetService = {
  create,
  update,
  deleteFleet,
  getAll,
};
