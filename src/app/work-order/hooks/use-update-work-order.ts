import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { WorkOrderService } from "@/shared/services/work-order";
import { IWorkOrder } from "@/shared/types/work-order.interface";
import { IApiResponse } from "@/shared/services/api";
import { queryClient } from "@/shared/services/query-client";
import {
  MaintenanceStatus,
  TypeOfMaintenance,
  Box,
} from "@/shared/enums/work-order";

const workOrderUpdateSchema = z.object({
  severityLevel: z.string().optional(),
  entryQueue: z.date().optional(),
  entryMaintenance: z.date().optional(),
  exitMaintenance: z.date().optional(),
  startWaitingParts: z.date().optional(),
  endWaitingParts: z.date().optional(),
  exitSupervisor: z.string().optional(),
  fleetId: z.string().optional(),
  typeOfMaintenance: z.nativeEnum(TypeOfMaintenance).optional(),
  box: z.nativeEnum(Box).optional(),
  status: z.nativeEnum(MaintenanceStatus).optional(),
});

export type WorkOrderUpdateFormFields = z.infer<typeof workOrderUpdateSchema>;

export function useUpdateWorkOrder(onClose: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingWorkOrder, setEditingWorkOrder] = useState<IWorkOrder | null>(
    null
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<WorkOrderUpdateFormFields>({
    resolver: zodResolver(workOrderUpdateSchema),
    defaultValues: {
      severityLevel: "",
      entryQueue: undefined,
      entryMaintenance: undefined,
      exitMaintenance: undefined,
      startWaitingParts: undefined,
      endWaitingParts: undefined,
      exitSupervisor: "",
      fleetId: "",
      typeOfMaintenance: undefined,
      box: undefined,
      status: undefined,
    },
  });

  const updateMutation = useMutation<
    IApiResponse<IWorkOrder>,
    Error,
    { id: string; data: Partial<IWorkOrder> }
  >({
    mutationFn: ({ id, data }) => WorkOrderService.update(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
      if (response.success && response.data) {
        console.log("Work Order updated:", response.data);
        setIsSuccess(true);
        toast.success("Work Order updated successfully!");
      }
    },
    onError: (error) => {
      console.error("Error updating work order:", error);
      toast.error(
        error.message ||
          "An error occurred while updating the work order. Please try again."
      );
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const formatDateToISO = (date: Date | undefined): string | undefined => {
    if (!date) return undefined;
    return date.toISOString();
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log("Submitting form:", data);
    setIsSubmitting(true);
    if (editingWorkOrder) {
      console.log("editingWorkOrder:", editingWorkOrder);
      const updateData: Partial<IWorkOrder> = {
        severityLevel: data.severityLevel,
        entryQueue: data.entryQueue
          ? formatDateToISO(data.entryQueue)
          : undefined,
        entryMaintenance: data.entryMaintenance
          ? formatDateToISO(data.entryMaintenance)
          : undefined,
        exitMaintenance: data.exitMaintenance
          ? formatDateToISO(data.exitMaintenance)
          : undefined,
        startWaitingParts: data.startWaitingParts
          ? formatDateToISO(data.startWaitingParts)
          : undefined,
        endWaitingParts: data.endWaitingParts
          ? formatDateToISO(data.endWaitingParts)
          : undefined,
        exitSupervisor: data.exitSupervisor,
        fleetId: data.fleetId,
        typeOfMaintenance: data.typeOfMaintenance,
        // box: data.box,
        status: data.status,
      };

      console.log("Formatted updateData:", updateData);
      updateMutation.mutate({ id: editingWorkOrder.id, data: updateData });
    }
  });

  const handleEdit = (workOrder: IWorkOrder) => {
    console.log("Editing work order:", workOrder);
    setEditingWorkOrder(workOrder);
    form.reset({
      severityLevel: workOrder.severityLevel,
      entryQueue: workOrder.entryQueue
        ? new Date(workOrder.entryQueue)
        : undefined,
      entryMaintenance: workOrder.entryMaintenance
        ? new Date(workOrder.entryMaintenance)
        : undefined,
      exitMaintenance: workOrder.exitMaintenance
        ? new Date(workOrder.exitMaintenance)
        : undefined,
      startWaitingParts: workOrder.startWaitingParts
        ? new Date(workOrder.startWaitingParts)
        : undefined,
      endWaitingParts: workOrder.endWaitingParts
        ? new Date(workOrder.endWaitingParts)
        : undefined,
      exitSupervisor: workOrder.exitSupervisor || "",
      fleetId: workOrder.fleetId,
      typeOfMaintenance: workOrder.typeOfMaintenance as TypeOfMaintenance,
      // box: {
      //   id: workOrder.box!.id
      // },
      status: workOrder.status,
    });
  };

  useEffect(() => {
    if (editingWorkOrder) {
      handleEdit(editingWorkOrder);
    }
  }, [editingWorkOrder]);

  return {
    form,
    handleSubmit,
    errors: form.formState.errors,
    isSubmitting,
    handleEdit,
    onClose,
    editingWorkOrder,
    setEditingWorkOrder,
    isSuccess,
    setIsSuccess,
  };
}
