import { ICompany } from "@/shared/types/company.interface";
import { IApiResponse } from "@/shared/services/api";
import { CompanyService } from "@/shared/services/company";
import { useQuery } from "@tanstack/react-query";

export function useCompany() {
  return useQuery<IApiResponse<ICompany[]>>({
    queryKey: ["companies"],
    queryFn: () => CompanyService.getAll(),
    staleTime: 60 * 5 * 1000,
  });
}
