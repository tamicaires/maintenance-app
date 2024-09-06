import { IService } from "@/interfaces/service.interface";
import { ICreateWorkOrder } from "@/interfaces/work-order.interface";
import { handleRequest, IApiResponse } from "@/services/api";

const create = async (
  data: ICreateWorkOrder
): Promise<IApiResponse<IService>> => {
  const response = await handleRequest<IService>({
    method: "POST",
    url: "/work-orders",
    data,
  });

  console.log("response", response);
  return response;
};

const getByWorkOrder = async (
  workOrderId: string
): Promise<IApiResponse<IService[]>> => {
  const response = await handleRequest<IService[]>({
    method: "GET",
    url: `/services/${workOrderId}/services`,
  });

  return response;
};

export const ServicesService = {
  create,
  getByWorkOrder,
};
