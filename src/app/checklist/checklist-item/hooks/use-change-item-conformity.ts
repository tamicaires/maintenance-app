import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/services/query-client"
import { IApiResponse } from "@/services/api"
import { useState } from "react"
import { ChecklistItemService } from "@/services/checklist/checklist-item"
import { IChecklistItem } from "@/shared/types/checklist"
import { QueryKeysEnum } from "@/shared/enums/query-keys"

interface ChangeItemConformityData {
  itemId: string;
  isConform: boolean;
}

export function useChangeItemConformity(
  checklistId: string,
  toast: (toast: any) => void,
  onSuccessCallback?: () => void,
) {
  const [updatedItem, setUpdatedItem] = useState<IChecklistItem | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<boolean | null>(null);

  const {
    mutate: mutateChangeItemConformity,
    isSuccess,
    isError,
    isPending,
    data,
    error,
  } = useMutation<IApiResponse<IChecklistItem>, Error, ChangeItemConformityData>({
    mutationFn: ({ itemId, isConform }) => ChecklistItemService.changeConformity(itemId, isConform),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.ChecklistItem, checklistId] })
      if (response.success && response.data) {
        // toast({
        //   type: "success",
        //   title: "Sucesso!",
        //   message: `Status de conformidade do item atualizado com sucesso.`,
        //   duration: 2000,
        // })
        setUpdatedItem(response.data);
        setUpdateSuccess(true);
        if (onSuccessCallback) {
          onSuccessCallback();
        }
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error)
      toast({
        type: "error",
        title: "Ops, algo deu errado!",
        message: error.message || "Ocorreu um erro ao atualizar o status de conformidade do item.",
        duration: 3000,
      })
      setUpdateSuccess(false);
    },
  })

  const updateItemConformity = (itemId: string, isConform: boolean) => {
    mutateChangeItemConformity({ itemId, isConform })
  }

  return {
    updateItemConformity,
    updatedItem,
    updateSuccess,
    isLoading: isPending,
    isError,
    error,
    data,
    isSuccess,
  }
}

