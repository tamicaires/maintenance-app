import { queryClient } from "@/shared/services/query-client"
import { useState } from "react"
import { IChecklistItem } from "@/shared/types/checklist"
import { QueryKeysEnum } from "@/shared/enums/query-keys"
import { useMutation } from "@/core/api/hooks/use-mutation"
import { checklistItemService } from "@/shared/services/checklist/checklist-item-service"

type ChangeItemConformityData = {
  itemId: string;
  isConform: boolean;
}

export function useChangeItemConformity(checklistId: string) {
  const [updatedItem, setUpdatedItem] = useState<IChecklistItem | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<boolean | null>(null);

  const { mutate: changeItemConformity, isPending } = useMutation(
    (data: ChangeItemConformityData) => checklistItemService.changeConformity(data.itemId, data.isConform), {
    successMessage: "Status de conformidade do item atualizado com sucesso!",
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Service_Assigment, checklistId] })
      setUpdatedItem(data);
      setUpdateSuccess(true);
    },
    onError: () => {
      setUpdateSuccess(false);
    }
  });

  const updateItemConformity = (itemId: string, isConform: boolean) => {
    changeItemConformity({ itemId, isConform })
  }

  return {
    updateItemConformity,
    updatedItem,
    updateSuccess,
    isLoading: isPending,
  }
}

