import { IPartCategory, IPartCategoryCreateAndUpdate } from "@/shared/types/part-category";
import { handleRequest, IApiResponse } from "@/shared/services/api";

const create = async (
  data: IPartCategoryCreateAndUpdate
): Promise<IApiResponse<IPartCategory>> => {
  const response = await handleRequest<IPartCategory>({
    method: "POST",
    url: "/part-categories",
    data,
  });

  return response;
};

const update = async (
  id: string,
  data: IPartCategoryCreateAndUpdate
): Promise<IApiResponse<IPartCategory>> => {
  const response = await handleRequest<IPartCategory>({
    method: "PUT",
    url: `/part-categories/${id}`,
    data,
  });

  return response;
}

const deletePartCategory = async (id: string): Promise<IApiResponse<void>> => {
  const response = await handleRequest<void>({
    method: "DELETE",
    url: `/part-categories/${id}`,
  });

  return response;
};

const getAll = async (): Promise<IApiResponse<IPartCategory[]>> => {
  const response = await handleRequest<IPartCategory[]>({
    method: "GET",
    url: "/part-categories",
  });

  return response;
};

export const PartCategoryService = {
  create,
  update,
  deletePartCategory,
  getAll,
};
