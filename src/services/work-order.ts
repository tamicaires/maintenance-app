import {
  ICreateWorkOrder,
  IWorkOrder,
} from "@/interfaces/work-order.interface";
import { handleRequest, IApiResponse } from "@/services/api";

const create = async (
  data: ICreateWorkOrder
): Promise<IApiResponse<IWorkOrder>> => {
  const response = await handleRequest<IWorkOrder>({
    method: "POST",
    url: "/work-orders",
    data,
  });

  console.log("response", response);
  return response;
};

const getAll = async (): Promise<IApiResponse<IWorkOrder[]>> => {
  const response = await handleRequest<IWorkOrder[]>({
    method: "GET",
    url: "/work-orders",
  });

  return response;
};

export const WorkOrderService = {
  create,
  getAll,
};
