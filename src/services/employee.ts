import {
  IEmployee,
  IEmployeeCreateAndUpdate,
} from "@/shared/types/employee.interface";
import { handleRequest, IApiResponse } from "@/services/api";

const create = async (
  data: IEmployeeCreateAndUpdate
): Promise<IApiResponse<IEmployee>> => {
  const response = await handleRequest<IEmployee>({
    method: "POST",
    url: "/employees",
    data,
  });
  console.log("data", data);
  console.log("response", response);
  return response;
};

const update = async (
  employeeId: string,
  data: IEmployeeCreateAndUpdate
): Promise<IApiResponse<IEmployee>> => {
  const response = await handleRequest<IEmployee>({
    method: "PUT",
    url: `/employees/${employeeId}`,
    data,
  });

  return response;
};

const deleteEmployee = async (
  employeeId: string
): Promise<IApiResponse<void>> => {
  const response = await handleRequest<void>({
    method: "DELETE",
    url: `/employees/${employeeId}`,
  });

  return response;
};

const getAll = async (
  page: number = 1,
  perPage: number = 3
): Promise<IApiResponse<IEmployee[]>> => {
  const response = await handleRequest<IEmployee[]>({
    method: "GET",
    url: "/employees",
    params: { page, perPage },
  });

  return response;
};

export const EmployeeService = {
  create,
  update,
  deleteEmployee,
  getAll,
};
