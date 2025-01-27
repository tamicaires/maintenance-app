import { handleRequest, IApiResponse } from "@/services/api";
import { ApiEndpoints } from "@/shared/constants/api-urls";
import { IEventRelationalData } from "@/shared/types/event";

interface ListEventsParams {
  page: string;
  perPage: string;
  checklistId?: string;
  event?: string;
  subject?: string;
  startDate?: string;
  endDate?: string;
}

const list = async (params: ListEventsParams): Promise<IApiResponse<IEventRelationalData[]>> => {
  const response = await handleRequest<IEventRelationalData[]>({
    method: "GET",
    url: ApiEndpoints.EVENT.LIST,
    params,
  });

  return response;
};

export const EventService = {
  list,
};
