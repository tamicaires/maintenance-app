import { ICompany } from "@/interfaces/company.interface";
import { IApiResponse } from "@/services/api";
import { CompanyService } from "@/services/company";
import { useQuery } from "@tanstack/react-query";

export function useCompany() {
  return useQuery<IApiResponse<ICompany[]>>({
    queryKey: ["companies"],
    queryFn: () => CompanyService.getAll(),
    staleTime: 60 * 5 * 1000,
  });
}
