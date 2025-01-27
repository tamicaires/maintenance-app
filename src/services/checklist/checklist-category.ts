import { handleRequest, IApiResponse } from "@/services/api";
import { IChecklistCategory, ICreateChecklistCategory } from "@/shared/types/checklist";

const create = async (
  data: ICreateChecklistCategory,
): Promise<IApiResponse<IChecklistCategory>> => {
  const response = await handleRequest<IChecklistCategory>({
    method: "POST",
    url: `/checklist-category`,
    data,
  });

  return response;
};

const getByTemplateId = async (templateId: string): Promise<IApiResponse<IChecklistCategory[]>> => {
  const response = await handleRequest<IChecklistCategory[]>({
    method: "GET",
    url: `/checklist-category/template/${templateId}`,
  });

  return response;
};

export const ChecklistCategoryService = {
  create,
  getByTemplateId,
};
