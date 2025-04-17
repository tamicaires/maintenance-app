import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { queryClient } from "@/shared/services/query-client";
import { FleetService } from "@/shared/services/fleet";
import { IApiResponse } from "@/shared/services/api";
import { IFleet, IFleetCreate } from "@/shared/types/fleet.interface";
import { CreateFleetData, createFleetSchema } from "@/validations/create-fleet";
import { ShowNotificationProps } from "@/components/notification-card/notification-card";

type CreateFleetHookProps = {
  showNotification: ShowNotificationProps,
  isOpen: boolean,
}

export function useCreateFleet({ isOpen, showNotification }: CreateFleetHookProps) {
  const [step, setStep] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(isOpen);
  const defaultValues: CreateFleetData = {
    fleetNumber: "",
    carrierId: "",
    isActive: true,
  };

  const createFleetForm = useForm<CreateFleetData>({
    resolver: zodResolver(createFleetSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = createFleetForm;

  const {
    mutate: mutateCreate,
    isSuccess,
    isError,
    isPending,
    data,
    error,
  } = useMutation<IApiResponse<IFleet>, Error, IFleetCreate>({
    mutationFn: FleetService.create,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["fleets"] });
      if (response.success && response.data) {
        showNotification({
          type: "success",
          title: "Frota criada com sucesso!",
          description: `A frota ${response.data.fleetNumber} foi criada com sucesso.`,
          primaryAction: {
            label: "Cadastrar Nova Frota",
            onClick: () => handleRegisterNew(),
          },
          secondaryAction: {
            label: "Fechar",
            onClick: () => setOpen(false),
          },
        })
        handleClose()
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
      showNotification({
        type: "error",
        title: "Erro ao criar frota",
        description: `${error.message}`,
        primaryAction: {
          label: "Tentar Novamente",
          onClick: () => submitFleetData(createFleetForm.getValues()),
        },
        secondaryAction: {
          label: "Fechar",
          onClick: () => handleClose(),
        }, 
      })
      handleClose()
    },
  });

  const submitFleetData = (data: CreateFleetData) => {
    mutateCreate(data);
  };

  const handleRegisterNew = () => {
    reset();
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    reset();
  }

  const formatPlate = (value: string) => {
    const cleaned = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (cleaned.length <= 3) return cleaned;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}`;
  };

  return {
    createFleetForm,
    handleSubmit: handleSubmit(submitFleetData),
    isSubmitting,
    isSuccess,
    isError,
    isPending,
    error,
    data,
    open,
    setOpen,
    control,
    reset,
    step,
    setStep,
    formatPlate,
  };
}

export type FormFields = keyof CreateFleetData;
