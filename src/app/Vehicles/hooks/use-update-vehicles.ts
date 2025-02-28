import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { IApiResponse } from "@/shared/services/api";
import { queryClient } from "@/shared/services/query-client";
import { IVehicle, IVehicleCreateAndUpdate } from "@/shared/types/vehicles.interface";
import { VehicleService } from "@/shared/services/vehicle";

const vehicleSchema = z.object({
  plate: z.string().min(1, "Placa é obrigatória"),
  model: z.string().min(1, "Modelo é obrigatório"),
  brand: z.string().min(1, "Marca é obrigatória"),
  year: z.string().min(4, "Ano deve ter 4 dígitos"),
  color: z.string().nullable(),
  km: z.number().min(0, "Quilometragem não pode ser negativa"),
  power: z.number().min(0, "Potência não pode ser negativa"),
  isActive: z.boolean().nullable(),
  fleetId: z.string().nullable(),
});

export type FormFields = z.infer<typeof vehicleSchema>;

export function useUpdateVehicle(onClose: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<IVehicle | null>(
    null
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      plate: "",
      model: "",
      brand: "",
      year: "",
      color: null,
      km: 0,
      power: 0,
      isActive: true,
      fleetId: null,
    },
  });

  const updateMutation = useMutation<
    IApiResponse<IVehicle>,
    Error,
    IVehicleCreateAndUpdate
  >({
    mutationFn: (data: IVehicleCreateAndUpdate) => {
      if (!editingVehicle) throw new Error("No vehicle selected for editing");
      return VehicleService.update(editingVehicle.id, data);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      if (response.success && response.data) {
        console.log("Vehicle updated:", response.data);
        setIsSuccess(true);
        toast.success("Veículo atualizado com sucesso!");
      }
    },
    onError: (error) => {
      console.error("Error updating vehicle:", error);
      toast.error(
        error.message ||
          "Ocorreu um erro ao atualizar o veículo. Tente novamente."
      );
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const deleteMutation = useMutation<IApiResponse<void>, Error, string>({
    mutationFn: VehicleService.deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success("Veículo excluído com sucesso!");
    },
    onError: (error) => {
      console.error("Error deleting vehicle:", error);
      toast.error(
        error.message ||
          "Ocorreu um erro ao excluir o veículo. Tente novamente."
      );
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log("Submitting form:", data);
    setIsSubmitting(true);
    if (editingVehicle) {
      console.log("editingVehicle:", editingVehicle);
      const updateData: IVehicleCreateAndUpdate = {
        plate: data.plate,
        model: data.model,
        brand: data.brand,
        year: data.year,
        color: data.color,
        km: data.km,
        power: data.power,
        isActive: data.isActive,
        fleetId: data.fleetId,
      };
      updateMutation.mutate(updateData);
    }
  });

  const handleEdit = (vehicle: IVehicle) => {
    console.log("Editing vehicle:", vehicle);
    setEditingVehicle(vehicle);
    form.reset({
      plate: vehicle.plate,
      model: vehicle.model,
      brand: vehicle.brand,
      year: vehicle.year,
      color: vehicle.color,
      km: vehicle.km,
      power: vehicle.power,
      isActive: vehicle.isActive,
      fleetId: vehicle.fleetId,
    });
  };

  const handleDelete = (vehicleId: string) => {
    deleteMutation.mutate(vehicleId);
  };

  useEffect(() => {
    if (editingVehicle) {
      form.reset({
        plate: editingVehicle.plate,
        model: editingVehicle.model,
        brand: editingVehicle.brand,
        year: editingVehicle.year,
        color: editingVehicle.color,
        km: editingVehicle.km,
        power: editingVehicle.power,
        isActive: editingVehicle.isActive,
        fleetId: editingVehicle.fleetId,
      });
    }
  }, [editingVehicle, form]);

  return {
    form,
    handleSubmit,
    errors: form.formState.errors,
    isSubmitting,
    handleEdit,
    handleDelete,
    onClose,
    editingVehicle,
    setEditingVehicle,
    isSuccess,
    setIsSuccess,
  };
}