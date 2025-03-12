import {
  IFleet,
  IFleetCreate,
  IFleetUpdate,
  IFleetWithCount,
} from "@/shared/types/fleet.interface";
import { handleRequest, IApiResponse } from "@/shared/services/api";
import { IFleetFilters } from "@/app/fleet/hooks/use-fleet";

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

const getAll = async (filters?: IFleetFilters): Promise<IApiResponse<IFleetWithCount>> => {
  const params = new URLSearchParams(filters as Record<string, string>);

  const response = await handleRequest<IFleetWithCount>({
    method: "GET",
    url: `/fleets?${params.toString()}`,
  });
 
  return response;
};

export const FleetService = {
  create,
  update,
  deleteFleet,
  getAll,
};
