import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { queryClient } from "@/services/query-client";
import { VehicleService } from "@/services/vehicle";
import { IApiResponse } from "@/services/api";
import * as z from "zod";
import { IVehicle, IVehicleCreateAndUpdate } from "@/interfaces/vehicles.interface";

const createVehicleSchema = z.object({
  plate: z.string().min(1, "Placa é obrigatória"),
  model: z.string().min(1, "Modelo é obrigatório"),
  brand: z.string().min(1, "Marca é obrigatória"),
  year: z.string().min(4, "Ano deve ter 4 dígitos"),
  color: z.string().nullable(),
  km: z.number().min(0, "Quilometragem não pode ser negativa"),
  power: z.number().min(0, "Potência não pode ser negativa"),
  fleetId: z.string().nullable(),
  isActive: z.boolean().nullable(),
});

export type CreateVehicleData = z.infer<typeof createVehicleSchema>;

export function useCreateVehicle() {
  const [isSuccess, setIsSuccess] = useState(false);

  const defaultValues: CreateVehicleData = {
    plate: "",
    model: "",
    brand: "",
    year: "",
    color: null,
    km: 0,
    power: 0,
    fleetId: null,
    isActive: true,
  };

  const createVehicleForm = useForm<CreateVehicleData>({
    resolver: zodResolver(createVehicleSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = createVehicleForm;

  const mutation = useMutation<
    IApiResponse<IVehicle>,
    Error,
    IVehicleCreateAndUpdate
  >({
    mutationFn: VehicleService.create,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      if (response.success && response.data) {
        console.log("Vehicle created:", response.data);
        toast.success("Veículo cadastrado com sucesso!");
        setIsSuccess(true);
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
      toast.error(error.message || "Ocorreu um erro ao cadastrar o veículo.");
    },
  });

  const submitVehicleData = (data: CreateVehicleData) => {
    data.isActive = true;
    mutation.mutate(data);
  };

  const resetForm = () => {
    reset();
    setIsSuccess(false);
  };

  return {
    createVehicleForm,
    handleSubmit: handleSubmit(submitVehicleData),
    isSubmitting,
    isSuccess,
    resetForm,
  };
}

export type FormFields = keyof CreateVehicleData;