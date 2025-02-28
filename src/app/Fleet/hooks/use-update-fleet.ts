import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { FleetService } from "@/shared/services/fleet";
import { IFleet, IFleetUpdate } from "@/shared/types/fleet.interface";
import { IApiResponse } from "@/shared/services/api";
import { queryClient } from "@/shared/services/query-client";


const fleetSchema = z.object({
  fleetNumber: z.string().min(1, "Fleet number is required"),
  carrierId: z.string().min(1, "Carrier is required"),
  isActive: z.boolean().default(true),
});

export type FormFields = z.infer<typeof fleetSchema>;

export function useUpdateFleet(onClose: () => void) {
  const [open, setOpen] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingFleet, setEditingFleet] = useState<IFleet | null>(null);

  const form = useForm<FormFields>({
    resolver: zodResolver(fleetSchema),
    defaultValues: {
      fleetNumber: "",
      carrierId: "",
      isActive: true,
    },
  });

  const updateMutation = useMutation<IApiResponse<IFleet>, Error, IFleetUpdate>(
    {
      mutationFn: (data: IFleetUpdate) => {
        if (!editingFleet) throw new Error("No fleet selected for editing");
        return FleetService.update(editingFleet.id, data);
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["fleets"] });
        if (response.success && response.data) {
          console.log("Fleet updated:", response.data);
          toast.success("Frota atualizada com sucesso!");
        }
        onClose();
      },
      onError: (error) => {
        console.error("Error updating fleet:", error);
        toast.error(
          error.message ||
          "Ocorreu um erro ao atualizar a frota. Tente novamente."
        );
      },
      onSettled: () => {
        setIsSubmitting(false);
      },
    }
  );

  const deleteMutation = useMutation<IApiResponse<void>, Error, string>({
    mutationFn: FleetService.deleteFleet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fleets"] });
      toast.success("Frota excluída com sucesso!");
    },
    onError: (error) => {
      console.error("Error deleting fleet:", error);
      toast.error(
        error.message || "Ocorreu um erro ao excluir a frota. Tente novamente."
      );
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log("Submitting form:", data);
    setIsSubmitting(true);
    if (editingFleet) {
      console.log("editingFleet:", editingFleet);
      const updateData: IFleetUpdate = {
        fleetNumber: data.fleetNumber,
        isActive: data.isActive,
        carrierId: data.carrierId,

      };
      updateMutation.mutate(updateData);
    }
  });

  const handleEdit = (fleet: IFleet) => {
    console.log("open ", open);
    setEditingFleet(fleet);
    form.reset({
      fleetNumber: fleet.fleetNumber,
      carrierId: fleet.carrierId.toString(),
      isActive: fleet.isActive,
    });
  };

  const handleDelete = (fleetId: string) => {
    deleteMutation.mutate(fleetId);
  };

  const formatPlate = (value: string) => {
    const cleaned = value.replace(/[^a-zA-Z0-9]/g, "");
    if (cleaned.length <= 3) {
      return cleaned.toUpperCase();
    } else {
      return `${cleaned.slice(0, 3).toUpperCase()}-${cleaned.slice(3, 7)}`;
    }
  };

  useEffect(() => {
    if (editingFleet) {
      form.reset({
        fleetNumber: editingFleet.fleetNumber,
        carrierId: editingFleet.carrierId.toString(),
        isActive: editingFleet.isActive,
      });
    }
  }, [editingFleet, form]);

  return {
    form,
    handleSubmit,
    errors: form.formState.errors,
    isSubmitting,
    formatPlate,
    handleEdit,
    handleDelete,
    open,
    setOpen,
    editingFleet,
    setEditingFleet,
  };
}