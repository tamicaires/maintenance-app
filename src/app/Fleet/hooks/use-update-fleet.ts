import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { FleetService } from "@/services/fleet";
import { IFleet, IFleetUpdate } from "@/interfaces/fleet.interface";
import { IApiResponse } from "@/services/api";
import { queryClient } from "@/services/query-client";

const fleetSchema = z.object({
  fleetNumber: z.string().min(1, "Fleet number is required"),
  plate: z.string().min(1, "Plate is required"),
  km: z.coerce.number().min(0, "KM must be a positive number"),
  firstTrailerPlate: z.string().optional(),
  secondTrailerPlate: z.string().optional(),
  thirdTrailerPlate: z.string().optional(),
  carrierId: z.string().min(1, "Carrier is required"),
  status: z.enum(["ATIVO", "INATIVO"]),
});

export type FormFields = z.infer<typeof fleetSchema>;

export function useUpdateFleet(onClose: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingFleet, setEditingFleet] = useState<IFleet | null>(null);

  const form = useForm<FormFields>({
    resolver: zodResolver(fleetSchema),
    defaultValues: {
      fleetNumber: "",
      plate: "",
      km: 0,
      firstTrailerPlate: "",
      secondTrailerPlate: "",
      thirdTrailerPlate: "",
      carrierId: "",
      status: "ATIVO",
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
        plate: data.plate,
        km: data.km.toString(),
        firstTrailerPlate: data.firstTrailerPlate || "",
        secondTrailerPlate: data.secondTrailerPlate || "",
        thirdTrailerPlate: data.thirdTrailerPlate || "",
        carrierId: data.carrierId,
        status: data.status,
      };
      updateMutation.mutate(updateData);
    }
  });

  const handleEdit = (fleet: IFleet) => {
    console.log("Editing fleet:", fleet);
    setEditingFleet(fleet);
    form.reset({
      fleetNumber: fleet.fleetNumber,
      plate: fleet.plate,
      km: parseFloat(fleet.km) || 0,
      firstTrailerPlate: fleet.firstTrailerPlate || "",
      secondTrailerPlate: fleet.secondTrailerPlate || "",
      thirdTrailerPlate: fleet.thirdTrailerPlate || "",
      carrierId: fleet.carrierId.toString(),
      status: fleet.status as "ATIVO" | "INATIVO",
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
        plate: editingFleet.plate,
        km: parseFloat(editingFleet.km) || 0,
        firstTrailerPlate: editingFleet.firstTrailerPlate || "",
        secondTrailerPlate: editingFleet.secondTrailerPlate || "",
        thirdTrailerPlate: editingFleet.thirdTrailerPlate || "",
        carrierId: editingFleet.carrierId.toString(),
        status: editingFleet.status as "ATIVO" | "INATIVO",
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
    editingFleet,
    setEditingFleet,
  };
}