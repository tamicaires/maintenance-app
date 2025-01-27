import { handleRequest, IApiResponse } from "@/services/api";
import { IChecklistTemplateItem, ICreateChecklistTemplateItem } from "@/shared/types/checklist/checklist-template-item";

const create = async (
  data: ICreateChecklistTemplateItem,
): Promise<IApiResponse<IChecklistTemplateItem>> => {
  const response = await handleRequest<IChecklistTemplateItem>({
    method: "POST",
    url: `/checklist-template-item`,
    data,
  });

  return response;
};

const getByTemplateId = async (
  templateId: string,
): Promise<IApiResponse<IChecklistTemplateItem[]>> => {
  const response = await handleRequest<IChecklistTemplateItem[]>({
    method: "GET",
    url: `/checklist-template-item/template/${templateId}`,
  });

  return response;
};

const getAll = async (): Promise<IApiResponse<IChecklistTemplateItem[]>> => {
  const response = await handleRequest<IChecklistTemplateItem[]>({
    method: "GET",
    url: "/checklist-template-item",
  });

  return response;
};

export const ChecklistTemplateItemService = {
  create,
  getByTemplateId,
  getAll,
};
