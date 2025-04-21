import { IPartCategory } from "@/shared/types/part-category";
import { useQuery } from "@tanstack/react-query";
import { partCategoryService } from "@/shared/services/part-category-service/part-category";
import { QueryKeysEnum } from "@/shared/enums/query-keys";

export function usePartCategories() {
  return useQuery<IPartCategory[]>({
    queryKey: [QueryKeysEnum.Part_Category],
    queryFn: () => partCategoryService.getAll(),
    staleTime: 60 * 5 * 1000,
  });
}
