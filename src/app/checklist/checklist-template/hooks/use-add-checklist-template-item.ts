import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { queryClient } from "@/services/query-client"
import { IApiResponse } from "@/services/api"
import { useState } from "react"
import { ICreateChecklistTemplateItem } from "@/shared/types/checklist"
import { QueryKeysEnum } from "@/shared/enums/query-keys"
import { ChecklistTemplateItemService } from "@/services/checklist/checklist-template-item"
import { IChecklistTemplateItem } from "@/shared/types/checklist/checklist-template-item"

const createChecklistTemplateItemSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória"),
  templateId: z.string().min(1, "ID do template é obrigatório"),
  weight: z.number().min(1, "Peso deve ser no mínimo 1"),
  checklistCategoryId: z.string().min(1, "ID da categoria é obrigatório"),
})

type CreateChecklistTemplateItemData = z.infer<typeof createChecklistTemplateItemSchema>

export function useAddChecklistTemplateItem(
  templateId: string,
  categoryId: string,
  toast: (toast: any) => void,
  onSuccessCallback?: () => void,
) {
  const [isCreateItemOpen, setIsCreateItemOpen] = useState<boolean>(false);
  const [createdItem, setCreatedItem] = useState<IChecklistTemplateItem | null>(null);

  const defaultValues: CreateChecklistTemplateItemData = {
    description: "",
    templateId: templateId,
    weight: 1,
    checklistCategoryId: categoryId,
  }

  const createChecklistTemplateItemForm = useForm<CreateChecklistTemplateItemData>({
    resolver: zodResolver(createChecklistTemplateItemSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = createChecklistTemplateItemForm

  const {
    mutate: mutateCreateChecklistTemplateItem,
    isSuccess,
    isError,
    isPending,
    data,
    error,
  } = useMutation<IApiResponse<IChecklistTemplateItem>, Error, ICreateChecklistTemplateItem>({
    mutationFn: (data) => ChecklistTemplateItemService.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.ChecklistCategory] })
      if (response.success && response.data) {
        toast({
          type: "success",
          title: "Sucesso!",
          message: `Item de checklist criado com sucesso.`,
          duration: 4000,
        })
        setCreatedItem(response.data);
        setIsCreateItemOpen(false);
        reset()
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
        message: error.message || "Ocorreu um erro ao criar o item de checklist.",
        duration: 5000,
      })
      reset()
      setIsCreateItemOpen(false);
    },
  })

  const submitChecklistTemplateItemData = (data: CreateChecklistTemplateItemData) => {
    mutateCreateChecklistTemplateItem(data)
  }

  return {
    createChecklistTemplateItemForm,
    handleSubmit: handleSubmit(submitChecklistTemplateItemData),
    isSubmitting,
    createdItem,
    control,
    isLoading: isPending,
    isError,
    error,
    data,
    reset,
    isSuccess,
    isCreateItemOpen,
    setIsCreateItemOpen,
  }
}

