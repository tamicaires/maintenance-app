import { ICarrier, ICarrierCreate } from "@/shared/types/carrier";
import { handleRequest, IApiResponse } from "@/services/api";

const create = async (
  data: ICarrierCreate
): Promise<IApiResponse<ICarrier>> => {
  const response = await handleRequest<ICarrier>({
    method: "POST",
    url: "/carriers",
    data,
  });

  console.log("response", response);
  return response;
};

const getAll = async (): Promise<IApiResponse<ICarrier[]>> => {
  const response = await handleRequest<ICarrier[]>({
    method: "GET",
    url: "/carriers",
  });

  return response;
};

export const CarrierService = {
  create,
  getAll,
};
