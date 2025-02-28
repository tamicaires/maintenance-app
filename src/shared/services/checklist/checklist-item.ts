import { handleRequest, IApiResponse } from "@/shared/services/api";
import { ApiEndpoints } from "@/shared/constants/api-urls";
import {
  IChecklistItem,
  ICreateChecklisItemBatch,
  ICreateChecklistItem
} from "@/shared/types/checklist/checklist-item";

const create = async (
  data: ICreateChecklistItem,
): Promise<IApiResponse<IChecklistItem>> => {
  const response = await handleRequest<IChecklistItem>({
    method: "POST",
    url: ApiEndpoints.CHECKLIST_ITEM.CREATE,
    data,
  });

  return response;
};

const createBatch = async (
  data: ICreateChecklisItemBatch
): Promise<IApiResponse<IChecklistItem[]>> => {
  return await handleRequest<IChecklistItem[]>({
    method: "POST",
    url: ApiEndpoints.CHECKLIST_ITEM.CREATE_BATCH,
    data
  })
}

const changeConformity = async (
  checklistId: string,
  isConform: boolean
): Promise<IApiResponse<IChecklistItem>> => {
  return await handleRequest<IChecklistItem>({
    method: "PATCH",
    url: ApiEndpoints.CHECKLIST_ITEM.CHANGE_CONFORMITY(checklistId),
    data: { isConform }
  })
}

const getByChecklist = async (
  checklistId: string
): Promise<IApiResponse<IChecklistItem[]>> => {
  return await handleRequest<IChecklistItem[]>({
    method: "GET",
    url: ApiEndpoints.CHECKLIST_ITEM.GET_BY_CHECKLIST(checklistId),
  })
}

const getAll = async (): Promise<IApiResponse<IChecklistItem[]>> => {
  const response = await handleRequest<IChecklistItem[]>({
    method: "GET",
    url: ApiEndpoints.CHECKLIST_ITEM.GET_ALL,
  });

  return response;
};

export const ChecklistItemService = {
  create,
  createBatch,
  changeConformity,
  getByChecklist,
  getAll,
};
