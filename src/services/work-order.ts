import {
  ICreateWorkOrder,
  IFinishMaintenance,
  IFinishWaitingParts,
  IStartMaintenance,
  IStartWaitingParts,
  IWorkOrder,
} from "@/shared/types/work-order.interface";
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

const update = async (workOrderId: string, data: Partial<IWorkOrder>) => {
  const response = await handleRequest<IWorkOrder>({
    method: "PUT",
    url: `/work-orders/${workOrderId}`,
    data,
  });
  console.log("response", response);
  return response;
};

const getById = async (workOrderId: string): Promise<IApiResponse<IWorkOrder>> => {
  const response = await handleRequest<IWorkOrder>({
    method: "GET",
    url: `/work-orders/${workOrderId}/order`,
  });

  return response
}

const getAll = async (): Promise<IApiResponse<IWorkOrder[]>> => {
  const response = await handleRequest<IWorkOrder[]>({
    method: "GET",
    url: "/work-orders",
  });

  return response;
};

const cancel = async (workOrderId: string): Promise<IApiResponse<void>> => {
  const response = await handleRequest<void>({
    method: "PATCH",
    url: `/work-orders/${workOrderId}/cancel`,
  });

  return response;
}

const startMaintenance = async (workOrderId: string, data: IStartMaintenance): Promise<IApiResponse<IStartMaintenance>> => {
  const response = await handleRequest<IStartMaintenance>({
    method: "PATCH",
    url: `/work-orders/${workOrderId}/start-maintenance`,
    data,
  });

  return response;
}

const finishMaintenance = async (
  workOrderId: string,
  data: IFinishMaintenance
): Promise<IApiResponse<IFinishMaintenance>> => {
  return await handleRequest<IFinishMaintenance>({
    method: "PATCH",
    url: `/work-orders/${workOrderId}/finish-maintenance`,
    data,
  });
}

const backToQueue = async (workOrderId: string): Promise<IApiResponse<void>> => {
  return await handleRequest<void>({
    method: "PATCH",
    url: `/work-orders/${workOrderId}/back-to-queue`,
  });
}

const startWaitingParts = async (
  workOrderId: string,
  data: IStartWaitingParts
): Promise<IApiResponse<IStartWaitingParts>> => {
  return await handleRequest<IStartWaitingParts>({
    method: "PATCH",
    url: `/work-orders/${workOrderId}/start-waiting-parts`,
    data,
  });
}

const finishWaitingParts = async (
  workOrderId: string,
  data: IFinishWaitingParts
): Promise<IApiResponse<IFinishWaitingParts>> => {
  return await handleRequest<IFinishWaitingParts>({
    method: "PATCH",
    url: `/work-orders/${workOrderId}/finish-waiting-parts`,
    data,
  });
}

export const WorkOrderService = {
  create,
  update,
  cancel,
  getById,
  getAll,
  startMaintenance,
  finishMaintenance,
  backToQueue,
  startWaitingParts,
  finishWaitingParts,
};
