import {
  IEmployee,
  IEmployeeCreateAndUpdate,
  IEmployeeWithCount,
} from "@/shared/types/employee.interface";
import { handleRequest, IApiResponse } from "@/shared/services/api";
import { EmployeeFiltersType } from "@/features/employee/hooks/use-employee";

const create = async (
  data: IEmployeeCreateAndUpdate
): Promise<IApiResponse<IEmployee>> => {
  const response = await handleRequest<IEmployee>({
    method: "POST",
    url: "/employees",
    data,
  });

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

const getById = async (
  employeeId: string
): Promise<IApiResponse<IEmployee>> => {
  const response = await handleRequest<IEmployee>({
    method: "GET",
    url: `/employees/${employeeId}`,
  });

  return response;
};

const getAll = async (
  filters?: EmployeeFiltersType
): Promise<IApiResponse<IEmployeeWithCount>> => {
  const params = new URLSearchParams(filters as Record<string, string>);

  const response = await handleRequest<IEmployeeWithCount>({
    method: "GET",
    url: `/employees?${params.toString()}`,
  });

  return response;
};

export const EmployeeService = {
  create,
  update,
  deleteEmployee,
  getById,
  getAll,
};
