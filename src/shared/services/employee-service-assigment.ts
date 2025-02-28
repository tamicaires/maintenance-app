import {
  IEmployee,
  IEmployeeCreateAndUpdate,
} from "@/shared/types/employee.interface";
import { handleRequest, IApiResponse } from "@/shared/services/api";
import { EmployeeServiceAssigmentCreateType, EmployeeServiceAssigmentType } from "@/shared/types/employee-service-assigment";

const addServiceEmployee = async (
  data: EmployeeServiceAssigmentCreateType
): Promise<IApiResponse<EmployeeServiceAssigmentType>> => {
  const response = await handleRequest<EmployeeServiceAssigmentType>({
    method: "POST",
    url: "/employee-service-assigment",
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
    url: `/employee-service-assigment/${employeeId}`,
    data,
  });

  return response;
};

const deleteEmployee = async (
  employeeId: string
): Promise<IApiResponse<void>> => {
  const response = await handleRequest<void>({
    method: "DELETE",
    url: `/employee-service-assigment/${employeeId}`,
  });

  return response;
};

const getAll = async (
  page: number = 1,
  perPage: number = 3
): Promise<IApiResponse<IEmployee[]>> => {
  const response = await handleRequest<IEmployee[]>({
    method: "GET",
    url: "/employee-service-assigment",
    params: { page, perPage },
  });

  return response;
};

export const EmployeeServiceAssigmentService = {
  addServiceEmployee,
  update,
  deleteEmployee,
  getAll,
};
