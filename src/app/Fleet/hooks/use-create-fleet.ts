import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { queryClient } from "@/services/query-client";
import { FleetService } from "@/services/fleet";
import { toast } from "sonner";
import { IApiResponse } from "@/services/api";
import { IFleet, IFleetCreate } from "@/shared/types/fleet.interface";
import { CreateFleetData, createFleetSchema } from "@/validations/create-fleet";

export function useCreateFleet() {
  const [step, setStep] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
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
        setStep(2)
        toast.success("Frota criada com sucesso!");
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
      toast.error(error.message || "Ocorreu um erro ao criar a frota.");
    },
  });

  const submitFleetData = (data: CreateFleetData) => {
    mutateCreate(data);
    reset();
    
  };

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
