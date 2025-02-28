import { IJob } from "@/shared/types/job.interface";
import { handleRequest, IApiResponse } from "@/shared/services/api";

// const create = async (data: IEmployeeCreate): Promise<IApiResponse<IJob>> => {
//   const response = await handleRequest<IJob>({
//     method: "POST",
//     url: "/jobs",
//     data,
//   });

//   return response;
// };

// const update = async (
//   fleetId: string,
//   data: IFleetUpdate
// ): Promise<IApiResponse<IFleet>> => {
//   const response = await handleRequest<IFleet>({
//     method: "PUT",
//     url: `/fleets/${fleetId}`,
//     data,
//   });

//   return response;
// };

// const deleteFleet = async (id: string): Promise<IApiResponse<void>> => {
//   const response = await handleRequest<void>({
//     method: "DELETE",
//     url: `/fleets/${id}`,
//   });

//   return response;
// };

const getAll = async (
  page: number = 1,
  perPage: number = 3
): Promise<IApiResponse<IJob[]>> => {
  const response = await handleRequest<IJob[]>({
    method: "GET",
    url: "/jobs",
    params: { page, perPage },
  });
  console.log("response job", response);
  return response;
};

export const JobService = {
  // create,
  // update,
  // deleteFleet,
  getAll,
};
