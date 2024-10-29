import { IPartCategory } from "@/interfaces/part-category";
import { IApiResponse } from "@/services/api";
import { PartCategoryService } from "@/services/part-category";
import { useQuery } from "@tanstack/react-query";

export function usePartCategories() {
  return useQuery<IApiResponse<IPartCategory[]>>({
    queryKey: ["part-categories"],
    queryFn: () => PartCategoryService.getAll(),
    staleTime: 60 * 5 * 1000,
  });
}
