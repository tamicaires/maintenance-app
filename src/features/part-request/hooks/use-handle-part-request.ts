import { useState } from "react";
import { queryClient } from "@/shared/services/query-client";
import { useMutation } from "@/core/api/hooks/use-mutation";
import { partRequestService } from "@/shared/services/part-request-service/part-request";
import { QueryKeysEnum } from "@/shared/enums/query-keys";

export type ApproveRequestData = {
  id: string;
  approvedQuantity: number;
};

export type RejectRequestData = {
  id: string;
  rejectionReason: string;
};

export function useHandlePartRequest() {
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const [currentRequestId, setCurrentRequestId] = useState<string | null>(null);

  const { mutate: approvePartRequest, isPending: isApprovePending } = useMutation(
    (data: ApproveRequestData) => partRequestService.approve(data.id, data.approvedQuantity), {
    successMessage: "Solicitação de peça aprovada com sucesso!",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Part_Request] })
      // handleClose()
    }
  });
  const { mutate: rejectPartRequest, isPending: isRejectPending } = useMutation(
    (data: RejectRequestData) => partRequestService.reject(data.id, data.rejectionReason), {
    successMessage: "Solicitação de peça aprovada com sucesso!",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Part_Request] })
      // handleClose()
    }
  });

  const handleAction = (type: "approve" | "reject", id: string) => {
    setActionType(type);
    setCurrentRequestId(id);
    setIsActionModalOpen(true);
  };

  const handleActionConfirm = (data: { quantity?: number; reason?: string }) => {
    if (!currentRequestId || !actionType) return;

    if (actionType === "approve" && data.quantity) {
      approvePartRequest({ id: currentRequestId, approvedQuantity: data.quantity });
    } else if (actionType === "reject" && data.reason) {
      rejectPartRequest({ id: currentRequestId, rejectionReason: data.reason });
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