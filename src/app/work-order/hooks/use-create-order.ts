import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { createWorkOrderSchema } from "@/validations/create-work-order";
import { queryClient } from "@/services/query-client";
import { z } from "zod";
import { IApiResponse } from "@/services/api";
import { IWorkOrder } from "@/shared/types/work-order.interface";
import { WorkOrderService } from "@/services/work-order";
import {
  MaintenanceStatus,
  SeverityLevel,
  TypeOfMaintenance,
} from "@/shared/enums/work-order";
import { QueryKeysEnum } from "@/shared/enums/query-keys";

type CreateWorkOrderData = z.infer<typeof createWorkOrderSchema>;

export function useCreateWorkOrder(setIsDialogOpen: (open: boolean) => void, addToast: (toast: any) => void) {
  const defaultValues: CreateWorkOrderData = {
    severityLevel: SeverityLevel.NORMAL,
    entryQueue: undefined,
    entryMaintenance: undefined,
    exitMaintenance: undefined,
    status: MaintenanceStatus.FILA,
    fleetId: "",
    typeOfMaintenance: TypeOfMaintenance.CORRETIVA,
    boxId: undefined,
    isCancelled: false
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
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Work_Order, QueryKeysEnum.Dashboard] });
      if (response.success && response.data) {
        addToast({
          type: "success",
          title: "Sucesso!",
          message: "Ordem de serviço criada com sucesso!",
          duration: 5000,
        })
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
      addToast({
        type: "error",
        title: "Erro ao criar ordem de serviço",
        message: error.message || "Ocorreu um erro ao criar ordem de serviço.",
        duration: 5000,
      });
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
    reset,
  };
}
