// import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { queryClient } from "@/shared/services/query-client"
import { IApiResponse } from "@/shared/services/api"
import { useMemo, useState } from "react"
import { ChecklistCategoryService } from "@/shared/services/checklist/checklist-category"
import { IChecklistCategory, ICreateChecklistCategory } from "@/shared/types/checklist"
import { QueryKeysEnum } from "@/shared/enums/query-keys"
import { createChecklistCategoryDefaultValues, CreateChecklistCategorySchema, createChecklistCategorySchema } from "../forms/create-template-category-form"
import { checklistCategoryService } from "@/shared/services/checklist/checklist-category-service"
import { useMutation } from "@/core/api/hooks/use-mutation"

// const createChecklistCategorySchema = z.object({
//   name: z.string().min(1, "Nome é obrigatório"),
//   description: z.string().optional(),
//   templateId: z.string().min(1, "ID do template é obrigatório"),
// })

// type CreateChecklistCategoryData = z.infer<typeof createChecklistCategorySchema>

export function useCreateChecklistTemplateCategory(
  templateId: string,
  isOpen: boolean,
) {
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState<boolean>(isOpen);
  const [createdCategory, setCreatedCategory] = useState<IChecklistCategory | null>(null);

  const form = useForm({
    resolver: zodResolver(createChecklistCategorySchema),
    defaultValues: {
      ...createChecklistCategoryDefaultValues,
      templateId,
    }
  })
  const values = form.watch();

  const { mutate: createTemplateCategory, isPending } = useMutation(
    (data: CreateChecklistCategorySchema) => checklistCategoryService.create(data), {
    successMessage: "Período aguardando peça iniciado.",
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Work_Order] })
      setCreatedCategory(response);
      handleClose()
    }
  });

  const handleSubmit = form.handleSubmit(
    (data) => {
      createTemplateCategory(data)
    }
  )

  const handleClose = () => {
    setIsCreateCategoryOpen(false)
    form.reset()
  }

  const canSubmit = useMemo(() => {
    return createChecklistCategorySchema.safeParse(values).success;
  }, [values])

  return {
    form,
    handleSubmit,
    isPending,
    canSubmit,
    isCreateCategoryOpen,
    setIsCreateCategoryOpen,
    createdCategory,
    setCreatedCategory
  };
  // const defaultValues: CreateChecklistCategoryData = {
  //   name: "",
  //   description: "",
  //   templateId: templateId,
  // }

  // const createChecklistCategoryForm = useForm<CreateChecklistCategoryData>({
  //   resolver: zodResolver(createChecklistCategorySchema),
  //   defaultValues,
  // })

  // const {
  //   handleSubmit,
  //   reset,
  //   control,
  //   formState: { isSubmitting },
  // } = createChecklistCategoryForm

  // const {
  //   mutate: mutateCreateChecklistCategory,
  //   isSuccess,
  //   isError,
  //   isPending,
  //   data,
  //   error,
  // } = useMutation<IApiResponse<IChecklistCategory>, Error, ICreateChecklistCategory>({
  //   mutationFn: (data) => ChecklistCategoryService.create(data),
  //   onSuccess: (response) => {
  //     queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.ChecklistCategory] })
  //     if (response.success && response.data) {
  //       toast({
  //         type: "success",
  //         title: "Sucesso!",
  //         message: `Categoria de checklist criada com sucesso.`,
  //         duration: 4000,
  //       })
  //       setCreatedCategory(response.data);
  //       setIsCreateCategoryOpen(false);
  //       reset()
  //       if (onSuccessCallback) {
  //         onSuccessCallback();
  //       }
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Error in mutation:", error)
  //     toast({
  //       type: "error",
  //       title: "Ops, algo deu errado!",
  //       message: error.message || "Ocorreu um erro ao criar a categoria de checklist.",
  //       duration: 5000,
  //     })
  //   },
  // })

  // const submitChecklistCategoryData = (data: CreateChecklistCategoryData) => {
  //   mutateCreateChecklistCategory(data)
  // }

  // return {
  //   createChecklistCategoryForm,
  //   handleSubmit: handleSubmit(submitChecklistCategoryData),
  //   isSubmitting,
  //   createdCategory,
  //   control,
  //   isLoading: isPending,
  //   isError,
  //   error,
  //   data,
  //   reset,
  //   isSuccess,
  //   isCreateCategoryOpen,
  //   setIsCreateCategoryOpen,
  // }
}

