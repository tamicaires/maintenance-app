import { IApiResponse } from "@/shared/services/api";
import { EmployeeService } from "@/shared/services/employee";
import { useQuery } from "@tanstack/react-query";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { IEmployeeWithCount } from "@/shared/types/employee.interface";

export type EmployeeFiltersType = {
  page?: string;
  perPage?: string;
  isActive?: boolean;
  jobTitle?: string;
  startDate?: string;
  endDate?: string;
}

export function useEmployee(filters?: EmployeeFiltersType) {
  return useQuery<IApiResponse<IEmployeeWithCount>>({
    queryKey: [QueryKeysEnum.Employee, filters],
    queryFn: () => EmployeeService.getAll(filters),
    staleTime: 60 * 5 * 1000,
  });
}
