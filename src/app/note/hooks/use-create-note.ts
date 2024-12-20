import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { queryClient } from "@/services/query-client"
import { IApiResponse } from "@/services/api"
import { ICreateNote, INote } from "@/shared/types/note"
import { NoteService } from "@/services/note"
import { useEffect } from "react"
import { useLoader } from "@/store/hook/use-loader"

const createNoteSchema = z.object({
  content: z.string().min(1, "O conteúdo da nota não pode estar vazio")
})

type CreateNoteData = z.infer<typeof createNoteSchema>

type MutationStatusMaintenance = {
  workOrderId: string
  data: ICreateNote
}

export function useCreateNote(
  setIsDialogOpen: (open: boolean) => void,
  addToast: (toast: any) => void,
  workOrderId: string,
  onClose?: () => void
) {
  const loader = useLoader();

  const defaultValues: CreateNoteData = {
    content: "",
  }

  const createNoteForm = useForm<CreateNoteData>({
    resolver: zodResolver(createNoteSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, isLoading },
  } = createNoteForm

  const {
    mutate: mutateCreateNote,
    isSuccess,
    isError,
    isPending,
    data,
    error,
  } = useMutation<IApiResponse<INote>, Error, MutationStatusMaintenance>({
    mutationFn: ({ workOrderId, data }) => NoteService.create(workOrderId, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["work-orders"] })
      if (response.success && response.data) {
        addToast({
          type: "success",
          title: "Sucesso!",
          message: "Nota adicionada com sucesso!",
          duration: 4000,
        })
        onClose && onClose()
        reset()
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error)
      addToast({
        type: "error",
        title: "Ops, algo deu errado!",
        message: error.message || "Ocorreu um erro ao adicionar a nota.",
        duration: 5000,
      })
    },
  })

  const submitCreateNoteData = (data: CreateNoteData) => {
    loader.show({ message: "Adicionando nota..." })
    mutateCreateNote({ workOrderId, data })
    loader.hide()
  }

  useEffect(() => {
    if (isSuccess) {
      setIsDialogOpen(false)
    }
  }, [isSuccess, setIsDialogOpen])

  return {
    createNoteForm,
    handleSubmit: handleSubmit(submitCreateNoteData),
    isSubmitting,
    control,
    isLoading,
    isPending,
    isError,
    error,
    data,
    reset,
  }
}

