import { useQuery } from "@tanstack/react-query";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { IEmployeeWithCount } from "@/shared/types/employee.interface";
import { employeeService } from "@/shared/services/employee-service/employee";

export type EmployeeFiltersType = {
  page?: string;
  perPage?: string;
  isActive?: boolean;
  jobTitle?: string;
  startDate?: string;
  endDate?: string;
}

export function useEmployee(filters?: EmployeeFiltersType) {
  return useQuery<IEmployeeWithCount>({
    queryKey: [QueryKeysEnum.Employee, filters],
    queryFn: () => employeeService.getPaginated(filters),
    staleTime: 60 * 5 * 1000,
  });
}
