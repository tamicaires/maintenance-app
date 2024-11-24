import { IEmployee } from "@/shared/types/employee.interface";
import { IApiResponse } from "@/services/api";
import { EmployeeService } from "@/services/employee";
import { useQuery } from "@tanstack/react-query";

export function useEmployee(page: number = 1, perPage: number = 10) {
  return useQuery<IApiResponse<IEmployee[]>>({
    queryKey: ["employees", page, perPage],
    queryFn: () => EmployeeService.getAll(page, perPage),
    staleTime: 60 * 5 * 1000,
  });
}
