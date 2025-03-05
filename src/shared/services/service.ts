import {
  IService,
  IServiceCreateAndUpdate,
  IServiceWithEmployee,
} from "@/shared/types/service.interface";
import { handleRequest, IApiResponse } from "@/shared/services/api";
import { IServiceFilters } from "@/app/service/hooks/use-service";

const create = async (
  data: IServiceCreateAndUpdate
): Promise<IApiResponse<IService>> => {
  const response = await handleRequest<IService>({
    method: "POST",
    url: "/services",
    data,
  });

  return response;
};

const update = async (
  serviceId: string,
  data: IServiceCreateAndUpdate
): Promise<IApiResponse<IService>> => {
  const response = await handleRequest<IService>({
    method: "PUT",
    url: `/services/${serviceId}`,
    data,
  });

  return response;
};

const deleteService = async (
  serviceId: string
): Promise<IApiResponse<void>> => {
  const response = await handleRequest<void>({
    method: "DELETE",
    url: `/services/${serviceId}`,
  });

  return response;
};

const getByWorkOrder = async (
  workOrderId: string
): Promise<IApiResponse<IServiceWithEmployee[]>> => {
  const response = await handleRequest<IServiceWithEmployee[]>({
    method: "GET",
    url: `/services/${workOrderId}/services`,
  });

  return response;
};

const getAll = async (
  filters?: IServiceFilters
): Promise<IApiResponse<IService[]>> => {
  const params = new URLSearchParams(filters as Record<string, string>);

  const response = await handleRequest<IService[]>({
    method: "GET",
    url: `/services?${params.toString()}`,
  });

  return response;
};

export const ServicesService = {
  create,
  update,
  deleteService,
  getByWorkOrder,
  getAll,
};
