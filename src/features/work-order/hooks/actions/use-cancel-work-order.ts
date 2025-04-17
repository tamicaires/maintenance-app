import { useMutation } from "@/core/api/hooks/use-mutation";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { IApiResponse } from "@/shared/services/api";
import { queryClient } from "@/shared/services/query-client";
import { WorkOrderService } from "@/shared/services/work-order";
import { workOrderService } from "@/shared/services/work-order-service/work-order";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useCancelWorkOrder() {
  const [isCancelDialogOpen,
    setIsCancelDialogOpen] = useState<boolean>(false);

  const { mutate: cancelWorkOrder, isPending: isCancelPending } = useMutation(
    (orderId: string) => workOrderService.cancel(orderId), {
    successMessage: "Ordem de serviço cancelada com sucesso.",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Work_Order] })
      handleClose()
    }
  });

  const handleClose = () => {
    setIsCancelDialogOpen(false)
  }

  return {
    cancelWorkOrder,
    isCancelPending,
    isCancelDialogOpen,
    setIsCancelDialogOpen
  };
  // const queryClient = useQueryClient();

  // const { mutate: mutateCancel, isPending: isCancelPending } = useMutation<
  //   IApiResponse<void>,
  //   Error,
  //   { workOrderId: string }
  // >({
  //   mutationFn: ({ workOrderId }) => WorkOrderService.cancel(workOrderId),
  //   onSuccess: (response) => {
  //     queryClient.invalidateQueries({ queryKey: ["work-orders"] });
  //     if (response.success && response.data) {
  //       addToast({
  //         type: "success",
  //         title: "Sucesso!",
  //         message: "Ordem de Serviço Cancelada com sucesso!",
  //         duration: 4000,
  //       });
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Error in cancel mutation:", error);
  //     addToast({
  //       type: "error",
  //       title: "Erro ao cancelar ordem de serviço",
  //       message: error.message || "Ocorreu um erro ao cancelar ordem de serviço.",
  //       duration: 5000,
  //     });
  //   },
  // });

  // const handleCancelWorkOrder = (workOrderId: string) => {
  //   console.log("Cancelling work order");
  //   mutateCancel({ workOrderId });
  // };

  // return {
  //   handleCancelWorkOrder,
  //   isCancelPending,
  // };
}
