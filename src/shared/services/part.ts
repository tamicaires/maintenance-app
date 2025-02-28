import { IPart, IPartCreateAndUpdate } from "@/shared/types/part";
import { handleRequest, IApiResponse } from "@/shared/services/api";

const create = async (
  data: IPartCreateAndUpdate
): Promise<IApiResponse<IPart>> => {
  const response = await handleRequest<IPart>({
    method: "POST",
    url: "/parts",
    data,
  });

  return response;
};

const update = async (
  id: string,
  data: IPartCreateAndUpdate
): Promise<IApiResponse<IPart>> => {
  const response = await handleRequest<IPart>({
    method: "PUT",
    url: `/parts/${id}`,
    data,
  });

  return response;
}

const deletePart = async (id: string): Promise<IApiResponse<void>> => {
  const response = await handleRequest<void>({
    method: "DELETE",
    url: `/parts/${id}`,
  });

  return response;
};

const getAll = async (): Promise<IApiResponse<IPart[]>> => {
  const response = await handleRequest<IPart[]>({
    method: "GET",
    url: "/parts",
  });

  return response;
};

export const PartService = {
  create,
  update,
  deletePart,
  getAll,
};
