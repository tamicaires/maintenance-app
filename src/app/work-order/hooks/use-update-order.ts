import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { z } from "zod";
import { queryClient } from "@/shared/services/query-client";
import { IApiResponse } from "@/shared/services/api";
import { IWorkOrder } from "@/shared/types/work-order.interface";
import { WorkOrderService } from "@/shared/services/work-order";
import { MaintenanceStatus } from "@/shared/enums/work-order";
import { toast } from "sonner";

const updateWorkOrderSchema = z
  .object({
    id: z.string(),
    status: z.nativeEnum(MaintenanceStatus).optional(),
    entryQueue: z.date().optional(),
    entryMaintenance: z.date().optional(),
    exitMaintenance: z.date().optional(),
    startWaitingParts: z.date().optional(),
    endWaitingParts: z.date().optional(),
    severityLevel: z.string().optional(),
    fleetId: z.string(),
    typeOfMaintenance: z.string(),
    boxId: z.string().uuid().optional(),
  })
  .refine(
    (data) => {
      if (
        data.status === MaintenanceStatus.MANUTENCAO &&
        data.entryMaintenance &&
        data.entryQueue
      ) {
        return data.entryMaintenance >= data.entryQueue;
      }
      if (
        data.status === MaintenanceStatus.FINALIZADA &&
        data.exitMaintenance &&
        data.entryMaintenance
      ) {
        return data.exitMaintenance >= data.entryMaintenance;
      }
      if (
        data.status === MaintenanceStatus.AGUARDANDO_PECA &&
        data.startWaitingParts &&
        data.entryMaintenance
      ) {
        return data.startWaitingParts >= data.entryMaintenance;
      }
      if (data.endWaitingParts && data.startWaitingParts) {
        return data.endWaitingParts >= data.startWaitingParts;
      }
      if (data.exitMaintenance && data.endWaitingParts) {
        return data.exitMaintenance >= data.endWaitingParts;
      }
      return true;
    },
    {
      message: "Invalid date sequence for status change",
      path: ["status"],
    }
  );

type UpdateWorkOrderData = z.infer<typeof updateWorkOrderSchema>;

export function useUpdateWorkOrder(
  workOrder: IWorkOrder,
  setIsDialogOpen: (open: boolean) => void
) {
  console.log("useUpdateWorkOrder hook chamado");
  const defaultValues: UpdateWorkOrderData = {
    id: workOrder.id,
    status: workOrder.status,
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
    severityLevel: workOrder.severityLevel,
    fleetId: workOrder.fleetId,
    typeOfMaintenance: workOrder.typeOfMaintenance,
    boxId: workOrder.box!.id,
  };

  const updateWorkOrderForm = useForm<UpdateWorkOrderData>({
    resolver: zodResolver(updateWorkOrderSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = updateWorkOrderForm;

  const {
    mutate: mutateUpdate,
    isSuccess,
    isError,
    data,
    error,
  } = useMutation<
    IApiResponse<IWorkOrder>,
    Error,
    { id: string; data: Partial<IWorkOrder> }
  >({
    mutationFn: ({ id, data }) => WorkOrderService.update(id, data),
    onSuccess: (response) => {
      console.log("deucerto", response);
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
      if (response.success && response.data) {
        console.log("Work Order updated:", response.data);
        toast.success("Ordem de serviço atualizada com sucesso!");
      }
    },
    onError: (error) => {
      console.log("deu erro", error);
      console.error("Error in mutation:", error);
      toast.error(
        error.message || "Ocorreu um erro ao atualizar a ordem de serviço."
      );
    },
  });

  const submitWorkOrderData = (data: UpdateWorkOrderData) => {
    console.log("Dados de submissão", data);
    console.log("subimtWorkOrderData", data);
    const updateData: Partial<IWorkOrder> = {
      status: data.status,
      fleetId: data.fleetId,
      typeOfMaintenance: data.typeOfMaintenance,
      severityLevel: data.severityLevel,
    };

    if (data.entryQueue) updateData.entryQueue = data.entryQueue.toISOString();
    if (data.entryMaintenance)
      updateData.entryMaintenance = data.entryMaintenance.toISOString();
    if (data.exitMaintenance)
      updateData.exitMaintenance = data.exitMaintenance.toISOString();
    if (data.startWaitingParts)
      updateData.startWaitingParts = data.startWaitingParts.toISOString();
    if (data.endWaitingParts)
      updateData.endWaitingParts = data.endWaitingParts.toISOString();

    mutateUpdate({ id: data.id, data: updateData });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsDialogOpen(false);
    }
  }, [isSuccess, setIsDialogOpen]);

  return {
    updateWorkOrderForm,
    handleSubmit: handleSubmit(submitWorkOrderData),
    isSubmitting,
    isError,
    error,
    data,
  };
}
