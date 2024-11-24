import {
  IServiceCreateAndUpdate,
  IServiceWithEmployee,
} from "@/shared/types/service.interface";
import { handleRequest, IApiResponse } from "@/services/api";
import { ICreateServiceAssigment, IServiceAssignment } from "@/shared/types/service-assigment";

const create = async (
  data: ICreateServiceAssigment
): Promise<IApiResponse<IServiceAssignment>> => {
  const response = await handleRequest<IServiceAssignment>({
    method: "POST",
    url: "/service-assignments",
    data,
  });

  return response;
};

const update = async (
  serviceId: string,
  data: IServiceCreateAndUpdate
): Promise<IApiResponse<IServiceAssignment>> => {
  const response = await handleRequest<IServiceAssignment>({
    method: "PUT",
    url: `/service-assignments/${serviceId}`,
    data,
  });

  return response;
};

const deleteServiceAssignment = async (
  serviceId: string
): Promise<IApiResponse<void>> => {
  const response = await handleRequest<void>({
    method: "DELETE",
    url: `/service-assignments/${serviceId}`,
  });

  return response;
};

const getByWorkOrder = async (
  workOrderId: string
): Promise<IApiResponse<IServiceWithEmployee[]>> => {
  const response = await handleRequest<IServiceWithEmployee[]>({
    method: "GET",
    url: `/service-assignments/${workOrderId}/services`,
  });

  return response;
};

const getAll = async (): Promise<IApiResponse<IServiceAssignment[]>> => {
  const response = await handleRequest<IServiceAssignment[]>({
    method: "GET",
    url: "/service-assignments",
  });

  return response;
};

export const ServiceAssignmentService = {
  create,
  update,
  deleteServiceAssignment,
  getByWorkOrder,
  getAll,
};
