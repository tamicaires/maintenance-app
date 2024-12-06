import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { PartRequestService } from "@/services/part-request";
import { toast } from "sonner";
import { IApiResponse } from "@/services/api";
import { THandledPartRequestResponse } from "@/shared/types/part-request";

export function useHandlePartRequest() {
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const [currentRequestId, setCurrentRequestId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { mutate: mutateApprove, isPending: isApprovePending } = useMutation<
    IApiResponse<THandledPartRequestResponse>,
    Error,
    { id: string; approvedQuantity: number }
  >({
    mutationFn: ({ id, approvedQuantity }) => PartRequestService.approve(id, approvedQuantity),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["part-requests"] });
      if (response.success && response.data) {
        toast.success("Solicitação de peça aprovada com sucesso!");
      }
    },
    onError: (error) => {
      console.error("Error in approve mutation:", error);
      toast.error(error.message || "Ocorreu um erro ao aprovar a solicitação de peça.");
    },
  });

  const { mutate: mutateReject, isPending: isRejectPending } = useMutation<
    IApiResponse<THandledPartRequestResponse>,
    Error,
    { id: string; rejectionReason: string }
  >({
    mutationFn: ({ id, rejectionReason }) => PartRequestService.reject(id, rejectionReason),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["part-requests"] });
      if (response.success && response.data) {
        toast.success("Solicitação de peça rejeitada com sucesso!");
      }
    },
    onError: (error) => {
      console.error("Error in reject mutation:", error);
      toast.error(error.message || "Ocorreu um erro ao rejeitar a solicitação de peça.");
    },
  });

  const handleAction = (type: "approve" | "reject", id: string) => {
    setActionType(type);
    setCurrentRequestId(id);
    setIsActionModalOpen(true);
  };

  const handleActionConfirm = (data: { quantity?: number; reason?: string }) => {
    if (!currentRequestId || !actionType) return;

    if (actionType === "approve" && data.quantity) {
      mutateApprove({ id: currentRequestId, approvedQuantity: data.quantity });
    } else if (actionType === "reject" && data.reason) {
      mutateReject({ id: currentRequestId, rejectionReason: data.reason });
    }

    setIsActionModalOpen(false);
    setActionType(null);
    setCurrentRequestId(null);
  };

  return {
    handleAction,
    handleActionConfirm,
    isActionModalOpen,
    setIsActionModalOpen,
    actionType,
    isApprovePending,
    isRejectPending,
  };
}