import { IFleet } from "@/interfaces/fleet.interface";
import { handleRequest, IApiResponse } from "@/services/api";

const create = async (data: IFleet): Promise<IApiResponse<IFleet>> => {
  const response = await handleRequest<IFleet>({
    method: "POST",
    url: "/fleets",
    data,
  });

  console.log("response", response);
  return response;
};

const getAll = async (): Promise<IApiResponse<IFleet[]>> => {
  const response = await handleRequest<IFleet[]>({
    method: "GET",
    url: "/fleets",
  });
  console.log("response", response);
  return response;
};

export const FleetService = {
  create,
  getAll,
};
