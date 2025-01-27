import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { queryClient } from "@/services/query-client"
import { IApiResponse } from "@/services/api"
import { useState } from "react"
import { ChecklistTemplateService } from "@/services/checklist/checklist-template"
import { IChecklistTemplate } from "@/shared/types/checklist"
import { createChecklistTemplateSchema } from "@/validations/create-checklist-template"

export interface ICreateChecklistTemplate {
  name: string
  icon?: string
}

type CreateChecklistTemplateData = z.infer<typeof createChecklistTemplateSchema>

export function useCreateChecklistTemplate(
  addToast: (toast: any) => void,
  setAddItemDialogOpen: (value: boolean) => void
) {
  const [isCreateChecklistOpen, setIsCreateChecklistOpen] = useState<boolean>(false);
  const [createdTemplate, setCreatedTemplate] = useState<IChecklistTemplate | null>(null);

  const defaultValues: CreateChecklistTemplateData = {
    name: "",
    icon: "",
  }
  
  const createChecklistTemplateForm = useForm<CreateChecklistTemplateData>({
    resolver: zodResolver(createChecklistTemplateSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = createChecklistTemplateForm

  const {
    mutate: mutateCreateChecklistTemplate,
    isSuccess,
    isError,
    isPending,
    data,
    error,
  } = useMutation<IApiResponse<IChecklistTemplate>, Error, ICreateChecklistTemplate>({
    mutationFn: (data) => ChecklistTemplateService.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["checklist-templates"] })
      if (response.success && response.data) {
        addToast({
          type: "success",
          title: "Sucesso!",
          message: `Template de checklist criado com sucesso.`,
          duration: 4000,
        })
        setCreatedTemplate(response.data);
        setIsCreateChecklistOpen(false);
        setAddItemDialogOpen(true);
        reset()
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error)
      addToast({
        type: "error",
        title: "Ops, algo deu errado!",
        message: error.message || "Ocorreu um erro ao criar o template de checklist.",
        duration: 5000,
      })
    },
  })

  const submitChecklistTemplateData = (data: CreateChecklistTemplateData) => {
    mutateCreateChecklistTemplate(data)
  }

  return {
    createChecklistTemplateForm,
    handleSubmit: handleSubmit(submitChecklistTemplateData),
    isSubmitting,
    createdTemplate,
    control,
    isLoading: isPending,
    isError,
    isCreateChecklistOpen,
    error,
    data,
    reset,
    isSuccess,
  }
}

