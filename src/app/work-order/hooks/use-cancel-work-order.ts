import { IApiResponse } from "@/shared/services/api";
import { WorkOrderService } from "@/shared/services/work-order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCancelWorkOrder(
  addToast: (toast: any) => void
) {
  const queryClient = useQueryClient();

  const { mutate: mutateCancel, isPending: isCancelPending } = useMutation<
    IApiResponse<void>,
    Error,
    { workOrderId: string }
  >({
    mutationFn: ({ workOrderId }) => WorkOrderService.cancel(workOrderId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
      if (response.success && response.data) {
        addToast({
          type: "success",
          title: "Sucesso!",
          message: "Ordem de Serviço Cancelada com sucesso!",
          duration: 4000,
        });
      }
    },
    onError: (error) => {
      console.error("Error in cancel mutation:", error);
      addToast({
        type: "error",
        title: "Erro ao cancelar ordem de serviço",
        message: error.message || "Ocorreu um erro ao cancelar ordem de serviço.",
        duration: 5000,
      });
    },
  });

  const handleCancelWorkOrder = (workOrderId: string) => {
    console.log("Cancelling work order");
    mutateCancel({ workOrderId });
  };

  return {
    handleCancelWorkOrder,
    isCancelPending,
  };
}
