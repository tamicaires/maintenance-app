import { handleRequest, IApiResponse } from "@/services/api";
import { ApiEndpoints } from "@/shared/constants/api-urls";
import { IChecklist, IChecklistWithRelationalData, ICreateChecklist } from "@/shared/types/checklist/checklist";

const create = async (
  data: ICreateChecklist,
): Promise<IApiResponse<IChecklist>> => {
  const response = await handleRequest<IChecklist>({
    method: "POST",
    url: `/checklist`,
    data,
  });

  return response;
};

const getWithRelationalData = async (checklistId: string): Promise<IApiResponse<IChecklistWithRelationalData>> => {
  const response = await handleRequest<IChecklistWithRelationalData>({
    method: "GET",
    url: `${ApiEndpoints.CHECKLIST.GET_WITH_RELATIONAL_DATA}/${checklistId}`,
  });
  console.log("getWithRelationalData -> response", response)
  return response;
}

const getByWorkOrder = async (workOrderId: string): Promise<IApiResponse<IChecklistWithRelationalData>> => {
  const response = await handleRequest<IChecklistWithRelationalData>({
    method: "GET",
    url: ApiEndpoints.CHECKLIST.GET_BY_WORK_ORDER(workOrderId),
  });

  return response;
}

const getAll = async (): Promise<IApiResponse<IChecklist[]>> => {
  const response = await handleRequest<IChecklist[]>({
    method: "GET",
    url: "/checklist",
  });

  return response;
};

export const ChecklistService = {
  create,
  getWithRelationalData,
  getByWorkOrder,
  getAll,
};
