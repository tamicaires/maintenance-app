import { IApiResponse } from "@/services/api";
import { WorkOrderService } from "@/services/work-order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useBackToQueueWorkOrder(
  addToast: (toast: any) => void
) {
  const queryClient = useQueryClient();

  const { mutate: mutateBackToQueue, isPending: isBackToQueuePending } = useMutation<
    IApiResponse<void>,
    Error,
    { workOrderId: string }
  >({
    mutationFn: ({ workOrderId }) => WorkOrderService.backToQueue(workOrderId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
      if (response.success && response.data) {
        addToast({
          type: "success",
          title: "Sucesso!",
          message: "Ordem de serviço retonarda para fila com sucesso.",
          duration: 4000,
        });
      }
    },
    onError: (error) => {
      console.error("Error in cancel mutation:", error);
      addToast({
        type: "error",
        title: "Erro ao retornar para fila",
        message: error.message || "Ocorreu um erro ao retornar a ordem de serviço para fila.",
        duration: 5000,
      });
    },
  });

  const handleBackToQueueWorkOrder = (workOrderId: string) => {
    mutateBackToQueue({ workOrderId });
  };

  return {
    handleBackToQueueWorkOrder,
    isBackToQueuePending,
  };
}
