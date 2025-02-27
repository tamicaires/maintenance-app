import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { queryClient } from "@/services/query-client";
import { TrailerService } from "@/services/trailer";
import { IApiResponse } from "@/services/api";
import { ITrailer, ITrailerCreateAndUpdate } from "@/shared/types/trailer.interface";
import { z } from "zod";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { hideNotification } from "@/store/features/notification-card";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { ShowNotificationProps } from "@/components/notification-card/notification-card";

const createTrailerSchema = z.object({
  plate: z.string().min(1, "Plate is required"),
  position: z.number().nullable(),
  isActive: z.boolean(),
  fleetId: z.string().nullable(),
});

export type CreateTrailerData = z.infer<typeof createTrailerSchema>;

export type UseCreateTrailerProps = {
  showNotification: ShowNotificationProps
}
export function useCreateTrailer({ showNotification }: UseCreateTrailerProps) {
  const dispatch: AppDispatch = useDispatch();
  const [isCreateTrailerDialogOpen, setIsCreateTrailerDialogOpen] = useState<boolean>(false);

  const defaultValues: CreateTrailerData = {
    plate: "",
    position: null,
    isActive: true,
    fleetId: null,
  };

  const createTrailerForm = useForm<CreateTrailerData>({
    resolver: zodResolver(createTrailerSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = createTrailerForm;

  const { mutate, isPending } = useMutation<
    IApiResponse<ITrailer>,
    Error,
    ITrailerCreateAndUpdate
  >({
    mutationFn: TrailerService.create,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Trailer] })
      if (response.success && response.data) {
        resetForm()
        handleSuccess()
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error)
      resetForm()
      showNotification({
        type: "error",
        title: "Erro ao criar reboque",
        description: error.message || "Ocorreu um erro ao criar o trailer.",
        primaryAction: {
          label: "Tentar Novamente",
          onClick: () => submitTrailerData(createTrailerForm.getValues()),
        },
        secondaryAction: {
          label: "Fechar",
          onClick: () => resetForm()
        }
      });
      setIsCreateTrailerDialogOpen(false);
    },
  });

  const submitTrailerData = (data: CreateTrailerData) => {
    mutate(data);
  };

  const resetForm = () => {
    reset();
  };

  const handleRegisterNew = () => {
    dispatch(hideNotification())
    setIsCreateTrailerDialogOpen(true);
  }

  const handleSuccess = () => {
    showNotification({
      type: "success",
      title: "Tudo certo!",
      description: "Sua ação foi concluída com sucesso.",
      primaryAction: {
        label: "Cadastrar Novo",
        onClick: () => handleRegisterNew(),
      },
      secondaryAction: {
        label: "Fechar",
        onClick: () => resetForm()
      },
    });
    setIsCreateTrailerDialogOpen(false);
  }


  return {
    createTrailerForm,
    handleSubmit: handleSubmit(submitTrailerData),
    isCreateTrailerDialogOpen,
    setIsCreateTrailerDialogOpen,
    isSubmitting,
    isPending,
    resetForm,
  };
}

export type FormFields = keyof CreateTrailerData;