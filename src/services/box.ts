import { IBox, IBoxCreateAndUpdate } from "@/interfaces/box";
import { handleRequest, IApiResponse } from "@/services/api";

const create = async (
  data: IBoxCreateAndUpdate
): Promise<IApiResponse<IBox>> => {
  const response = await handleRequest<IBox>({
    method: "POST",
    url: "/boxes",
    data,
  });

  console.log("response", response);
  return response;
};

const update = async (
  id: string,
  data: IBoxCreateAndUpdate
): Promise<IApiResponse<IBox>> => {
  const response = await handleRequest<IBox>({
    method: "PUT",
    url: `/boxes/${id}`,
    data,
  });

  return response;
}

const deleteBox = async (id: string): Promise<IApiResponse<void>> => {
  const response = await handleRequest<void>({
    method: "DELETE",
    url: `/boxes/${id}`,
  });

  return response;
};

const getAll = async (): Promise<IApiResponse<IBox[]>> => {
  const response = await handleRequest<IBox[]>({
    method: "GET",
    url: "/boxes",
  });

  return response;
};

export const BoxService = {
  create,
  update,
  deleteBox,
  getAll,
};