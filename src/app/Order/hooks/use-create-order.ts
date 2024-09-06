import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { createWorkOrderSchema } from "@/validations/create-work-order";
import { queryClient } from "@/services/query-client";
import { z } from "zod";
import { IApiResponse } from "@/services/api";
import { IWorkOrder } from "@/interfaces/work-order.interface";
import { WorkOrderService } from "@/services/work-order";
import {
  MaintenanceStatus,
  SeverityLevel,
  TypeOfMaintenance,
} from "@/shared/enums/work-order";
import { toast } from "sonner";

type CreateWorkOrderData = z.infer<typeof createWorkOrderSchema>;

export function useCreateWorkOrder(setIsDialogOpen: (open: boolean) => void) {
  const defaultValues: CreateWorkOrderData = {
    severityLevel: SeverityLevel.NORMAL,
    entryQueue: undefined,
    entryMaintenance: undefined,
    exitMaintenance: undefined,
    status: MaintenanceStatus.FILA,
    fleetId: "",
    typeOfMaintenance: TypeOfMaintenance.CORRETIVA,
    box: undefined,
  };

  const createWorkOrderForm = useForm<CreateWorkOrderData>({
    resolver: zodResolver(createWorkOrderSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = createWorkOrderForm;

  const {
    mutate: mutateCreate,
    isSuccess,
    isError,
    data,
    error,
  } = useMutation<IApiResponse<IWorkOrder>, Error, CreateWorkOrderData>({
    mutationFn: WorkOrderService.create,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
      if (response.success && response.data) {
        console.log("Work Order created:", response.data);
        toast.success("Ordem de serviço criada com sucesso!");
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
      toast.error(
        error.message || "Ocorreu um erro ao criar a ordem de serviço."
      );
    },
  });

  const submitWorkOrderData = (data: CreateWorkOrderData) => {
    mutateCreate(data);
    reset();
  };

  useEffect(() => {
    if (isSuccess) {
      setIsDialogOpen(false);
    }
  }, [isSuccess]);

  return {
    createWorkOrderForm,
    handleSubmit: handleSubmit(submitWorkOrderData),
    isSubmitting,
    isError,
    error,
    data,
  };
}
