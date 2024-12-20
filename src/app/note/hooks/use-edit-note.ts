import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { queryClient } from "@/services/query-client"
import { IApiResponse } from "@/services/api"
import { INote } from "@/shared/types/note"
import { NoteService } from "@/services/note"
import { useEffect } from "react"

const editNoteSchema = z.object({
  content: z.string().min(1, "O conteúdo da nota não pode estar vazio")
})

type EditNoteData = z.infer<typeof editNoteSchema>

type MutationEditNote = {
  noteId: string
  data: EditNoteData
}

export function useEditNote(
  setIsEditing: (editing: boolean) => void,
  addToast: (toast: any) => void,
  noteId: string,
  initialContent: string
) {
  const defaultValues: EditNoteData = {
    content: initialContent,
  }

  const editNoteForm = useForm<EditNoteData>({
    resolver: zodResolver(editNoteSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, isLoading },
  } = editNoteForm

  const {
    mutate: mutateEditNote,
    isSuccess,
    isError,
    isPending,
    data,
    error,
  } = useMutation<IApiResponse<INote>, Error, MutationEditNote>({
    mutationFn: ({ noteId, data }) => NoteService.update(noteId, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["work-orders"] })
      if (response.success && response.data) {
        addToast({
          type: "success",
          title: "Sucesso!",
          message: "Nota atualizada com sucesso!",
          duration: 4000,
        })
        setIsEditing(false)
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error)
      addToast({
        type: "error",
        title: "Ops, algo deu errado!",
        message: error.message || "Ocorreu um erro ao atualizar a nota.",
        duration: 5000,
      })
    },
  })

  const submitEditNoteData = (data: EditNoteData) => {
    mutateEditNote({ noteId, data })
  }

  useEffect(() => {
    if (isSuccess) {
      setIsEditing(false)
    }
  }, [isSuccess, setIsEditing])

  return {
    editNoteForm,
    handleSubmit: handleSubmit(submitEditNoteData),
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

