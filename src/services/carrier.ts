import { ICarrier } from "@/interfaces/carrier";
import { handleRequest, IApiResponse } from "@/services/api";

const getAll = async (): Promise<IApiResponse<ICarrier[]>> => {
  const response = await handleRequest<ICarrier[]>({
    method: "GET",
    url: "/carriers",
  });

  return response;
};

export const CarrierService = {
  getAll,
};
