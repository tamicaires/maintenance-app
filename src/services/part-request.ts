import { ICreatePartRequest, ICreatePartRequestBatch, IPartRequest, IUpdatePartRequest, THandledPartRequestResponse } from "@/shared/types/part-request";
import { handleRequest, IApiResponse } from "@/services/api";
import { IPartRequestsRelationalDataList } from "@/shared/types/part-request-relational-data";

const create = async (
  data: ICreatePartRequest
): Promise<IApiResponse<IPartRequest>> => {
  const response = await handleRequest<IPartRequest>({
    method: "POST",
    url: "/part-requests",
    data,
  });

  return response;
};

const createBatch = async (data: ICreatePartRequestBatch): Promise<IApiResponse<IPartRequest[]>> => {
  const response = await handleRequest<IPartRequest[]>({
    method: "POST",
    url: "/part-requests/batch",
    data,
  });

  return response;
}

const update = async (
  id: string,
  data: IUpdatePartRequest
): Promise<IApiResponse<IPartRequest>> => {
  const response = await handleRequest<IPartRequest>({
    method: "PUT",
    url: `/part-requests/${id}`,
    data,
  });

  return response;
}

const approve = async (id: string, approvedQuantity: number): Promise<IApiResponse<THandledPartRequestResponse>> => {
  const response = await handleRequest<THandledPartRequestResponse>({
    method: "POST",
    url: `/part-requests/approve/${id}`,
    data: { approvedQuantity },
  });

  return response;
}

const reject = async (id: string, rejectionReason: string): Promise<IApiResponse<THandledPartRequestResponse>> => {
  const response = await handleRequest<THandledPartRequestResponse>({
    method: "POST",
    url: `/part-requests/reject/${id}`,
    data: { rejectionReason },
  });

  return response;
}

const deletePartRequest = async (id: string): Promise<IApiResponse<void>> => {
  const response = await handleRequest<void>({
    method: "DELETE",
    url: `/part-requests/${id}`,
  });

  return response;
};

const getById = async (partRequestId: string): Promise<IApiResponse<IPartRequest>> => {
  const response = await handleRequest<IPartRequest>({
    method: "GET",
    url: `/part-requests/${partRequestId}`,
  });

  return response;
}

const getByWorkOrderId = async (workOrderId: string): Promise<IApiResponse<IPartRequest[]>> => {
  const response = await handleRequest<IPartRequest[]>({
    method: "GET",
    url: `/part-requests/work-order/${workOrderId}`,
  });

  return response;
}

const getAll = async (
  filters?: {
    page?: string;
    perPage?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }
): Promise<IApiResponse<IPartRequestsRelationalDataList>> => {
  const params = new URLSearchParams(filters as Record<string, string>);

  const response = await handleRequest<IPartRequestsRelationalDataList>({
    method: "GET",
    url: `/part-requests?${params.toString()}`,
  });

  return response;
};

export const PartRequestService = {
  create,
  createBatch,
  approve,
  reject,
  update,
  deletePartRequest,
  getById,
  getByWorkOrderId,
  getAll,
};
