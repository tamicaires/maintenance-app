import { ITrailer, ITrailerCreateAndUpdate } from "@/shared/types/trailer.interface";
import { handleRequest, IApiResponse } from "@/services/api";

const create = async (
  data: ITrailerCreateAndUpdate
): Promise<IApiResponse<ITrailer>> => {
  const response = await handleRequest<ITrailer>({
    method: "POST",
    url: "/trailers",
    data,
  });
  console.log("data", data);
  console.log("response", response);
  return response;
};

const update = async (
  trailerId: string,
  data: ITrailerCreateAndUpdate
): Promise<IApiResponse<ITrailer>> => {
  const response = await handleRequest<ITrailer>({
    method: "PUT",
    url: `/trailers/${trailerId}`,
    data,
  });

  return response;
};

const deleteTrailer = async (
  trailerId: string
): Promise<IApiResponse<void>> => {
  const response = await handleRequest<void>({
    method: "DELETE",
    url: `/trailers/${trailerId}`,
  });

  return response;
};

const getByWorkOrder = async (
  workOrderId: string
): Promise<IApiResponse<ITrailer[]>> => {
  const response = await handleRequest<ITrailer[]>({
    method: "GET",
    url: `/trailers/work-order/${workOrderId}`,
  });

  return response;
}
const getAll = async (): Promise<IApiResponse<ITrailer[]>> => {
  const response = await handleRequest<ITrailer[]>({
    method: "GET",
    url: "/trailers",
  });

  return response;
};

export const TrailerService = {
  create,
  update,
  deleteTrailer,
  getByWorkOrder,
  getAll,
};
