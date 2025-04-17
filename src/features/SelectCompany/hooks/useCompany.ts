import { ICompany } from "@/shared/types/company.interface";
import { useQuery } from "@tanstack/react-query";
import { companyService } from "@/shared/services/company-service/company";

export function useCompany() {
  return useQuery<ICompany[]>({
    queryKey: ["companies"],
    queryFn: () => companyService.getAll(),
    staleTime: 60 * 5 * 1000,
  });
}
