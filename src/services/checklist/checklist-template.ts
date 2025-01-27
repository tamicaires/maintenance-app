import { handleRequest, IApiResponse } from "@/services/api";
import { IChecklistTemplate, ICreateChecklistTemplate } from "@/shared/types/checklist";

const create = async (
  data: ICreateChecklistTemplate,
): Promise<IApiResponse<IChecklistTemplate>> => {
  const response = await handleRequest<IChecklistTemplate>({
    method: "POST",
    url: `/checklist-template`,
    data,
  });

  return response;
};

const getAll = async (): Promise<IApiResponse<IChecklistTemplate[]>> => {
  const response = await handleRequest<IChecklistTemplate[]>({
    method: "GET",
    url: "/checklist-template",
  });

  return response;
};

export const ChecklistTemplateService = {
  create,
  getAll,
};
