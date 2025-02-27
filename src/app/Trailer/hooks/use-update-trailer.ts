import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { IApiResponse } from "@/services/api";
import { queryClient } from "@/services/query-client";
import { ITrailer, ITrailerCreateAndUpdate } from "@/shared/types/trailer.interface";
import { TrailerService } from "@/services/trailer";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { ToastHandler } from "@/components/Toast/toast";

const trailerSchema = z.object({
  plate: z.string().min(1, "Placa é obrigatório"),
  position: z.number(),
  fleetId: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type FormFields = z.infer<typeof trailerSchema>;

export type UseUpdateTrailerProps = {
  toast: ToastHandler;
  onClose: () => void;
};

export function useUpdateTrailer({ onClose }: UseUpdateTrailerProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [editingTrailer, setEditingTrailer] = useState<ITrailer | null>(
    null
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(trailerSchema),
    defaultValues: {
      plate: "",
      position: 0,
      fleetId: "",
      isActive: true,
    },
  });

  const updateMutation = useMutation<
    IApiResponse<ITrailer>,
    Error,
    ITrailerCreateAndUpdate
  >({
    mutationFn: (data: ITrailerCreateAndUpdate) => {
      if (!editingTrailer) throw new Error("No trailer selected for editing");
      return TrailerService.update(editingTrailer.id, data);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Trailer] });
      if (response.success && response.data) {
        console.log("Trailer updated:", response.data);
        setIsSuccess(true);
        // toast({

        // })
        // toast.success("Reboque atualizado com sucesso!");
      }
    },
    onError: (error) => {
      console.error("Error updating employee:", error);
      // toast.error(
      //   error.message ||
      //   "Ocorreu um erro ao atualizar o Reboque. Tente novamente."
      // );
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const deleteMutation = useMutation<IApiResponse<void>, Error, string>({
    mutationFn: TrailerService.deleteTrailer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trailers"] });
      // toast.success("Reboque excluído com sucesso!");
    },
    onError: (error) => {
      console.error("Error deleting trailer:", error);
      // toast.error(
      //   error.message ||
      //   "Ocorreu um erro ao excluir o reboque. Tente novamente."
      // );
    },
  });

  const handleSubmit = form.handleSubmit(async (trailer) => {
    console.log("Submitting form:", trailer);
    setIsSubmitting(true);

    if (editingTrailer) {
      console.log("editingTrailer:", editingTrailer);
      const updateData: ITrailerCreateAndUpdate = {
        plate: trailer.plate,
        position: trailer.position,
        fleetId: trailer.fleetId,
        isActive: trailer.isActive,
      };
      updateMutation.mutate(updateData);
    }
  });

  const handleEdit = (trailer: ITrailer) => {
    console.log("Editing trailer:", trailer);
    setEditingTrailer(trailer);
    // form.reset({
    //   plate: trailer.plate,
    //   position: trailer.position || "",
    //   fleetId: trailer.fleetId || "",
    //   isActive: trailer.isActive,
    // });
  };

  const handleDelete = (trailerId: string) => {
    deleteMutation.mutate(trailerId);
  };

  useEffect(() => {
    if (editingTrailer) {
      // form.reset({
      //   plate: editingTrailer.plate,
      //   position: editingTrailer.position! || "",
      //   fleetId: editingTrailer.fleetId || "",
      //   isActive: editingTrailer.isActive,
      // });
    }
  }, [editingTrailer, form]);

  return {
    form,
    handleSubmit,
    errors: form.formState.errors,
    isSubmitting,
    handleEdit,
    handleDelete,
    onClose,
    editingTrailer,
    setEditingTrailer,
    isSuccess,
    setIsSuccess,
  };
}
