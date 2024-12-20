import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/services/query-client"
import { IApiResponse } from "@/services/api"
import { INote } from "@/shared/types/note"
import { NoteService } from "@/services/note"
import { useEffect } from "react"
import { useLoader } from "@/store/hook/use-loader"

type MutationDeleteNote = {
  noteId: string
}

export function useDeleteNote(
  setIsDialogOpen: (open: boolean) => void,
  addToast: (toast: any) => void,
  onClose?: () => void
) {
  const loader = useLoader();

  const {
    mutate: mutateDeleteNote,
    isSuccess,
    isError,
    isPending,
    data,
    error,
  } = useMutation<IApiResponse<INote>, Error, MutationDeleteNote>({
    mutationFn: ({ noteId }) => NoteService.deleteNote(noteId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["work-orders"] })
      if (response.success || isSuccess) {
        addToast({
          type: "success",
          title: "Sucesso!",
          message: "Nota excluída com sucesso!",
          duration: 4000,
        })
        onClose && onClose()
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error)
      addToast({
        type: "error",
        title: "Ops, algo deu errado!",
        message: error.message || "Ocorreu um erro ao excluir a nota.",
        duration: 5000,
      })
    },
  })

  const deleteNote = (noteId: string) => {
    loader.show({ message: "Excluindo nota..." })
    mutateDeleteNote({ noteId })
    loader.hide()
  }

  useEffect(() => {
    if (isSuccess) {
      setIsDialogOpen(false)
    }
  }, [isSuccess, setIsDialogOpen])

  return {
    deleteNote,
    isSuccess,
    isError,
    isPending,
    data,
    error,
  }
}

