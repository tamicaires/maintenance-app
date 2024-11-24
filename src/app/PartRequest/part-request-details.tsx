import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CustomDialogHeader } from "@/components/CustomDialogHeader";
import { IPartRequest } from "@/shared/types/part-request";
import { RequestStatus } from "@/shared/enums/part-request";
import { useHandlePartRequest } from "./hooks/use-handle-part-request";
import PartRequestItem from "@/components/PartRequesItem/part-request-item";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { quantity?: number; reason?: string }) => void;
  type: "approve" | "reject";
}

function ActionModal({ isOpen, onClose, onConfirm, type }: ActionModalProps) {
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    onConfirm(type === "approve" ? { quantity: Number(quantity) } : { reason });
    setQuantity("");
    setReason("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <h2 className="text-lg font-semibold">
            {type === "approve"
              ? "Aprovar Solicitação"
              : "Rejeitar Solicitação"}
          </h2>
        </DialogHeader>
        {type === "approve" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantidade Aprovada</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Digite a quantidade"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Motivo da Rejeição</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Digite o motivo"
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface PartRequestDetailsDialogProps {
  partRequests: IPartRequest[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateRequests: (updatedRequests: IPartRequest[]) => void;
}

export function PartRequestDetailsDialog({
  partRequests: initialPartRequests,
  isOpen,
  onClose,
  onUpdateRequests,
}: PartRequestDetailsDialogProps) {
  const [localPartRequests, setLocalPartRequests] =
    useState<IPartRequest[]>(initialPartRequests);

  const {
    handleAction,
    handleActionConfirm: handleActionConfirmHook,
    isActionModalOpen,
    setIsActionModalOpen,
    actionType,
    isApprovePending,
    isRejectPending,
  } = useHandlePartRequest();

  useEffect(() => {
    setLocalPartRequests(initialPartRequests);
  }, [initialPartRequests]);

  const workOrderId =
    localPartRequests.length > 0
      ? localPartRequests[0].workOrder?.displayId
      : "N/A";

  const handleLocalAction = (type: "approve" | "reject", id: string) => {
    handleAction(type, id);
  };

  const handleLocalActionConfirm = (data: {
    quantity?: number;
    reason?: string;
  }) => {
    handleActionConfirmHook(data);
    setLocalPartRequests((prevRequests) => {
      const updatedRequests = prevRequests.map((req) => {
        if (req.id === actionType) {
          return {
            ...req,
            status:
              actionType === "approve"
                ? RequestStatus.APPROVED
                : RequestStatus.REJECTED,
            ...(actionType === "approve"
              ? { approvedQuantity: data.quantity ?? null }
              : { rejectionReason: data.reason ?? null }),
          };
        }
        return req;
      });

      // Call onUpdateRequests with all updated requests
      onUpdateRequests(updatedRequests);

      // Filter out non-pending requests for local state
      return updatedRequests.filter(
        (req) => req.status === RequestStatus.PENDING
      );
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0">
        <DialogHeader className="p-6 pb-0">
          <CustomDialogHeader
            title="Solicitações de Peças"
            subtitle={`Ordem de Serviço: ${workOrderId}`}
          />
        </DialogHeader>

        <ScrollArea className="max-h-[400px] px-6 pb-10">
          <div className="space-y-2">
            {localPartRequests.map((request) => (
              <PartRequestItem
                key={request.id}
                request={request}
                onApprove={handleLocalAction.bind(null, "approve")}
                onReject={handleLocalAction.bind(null, "reject")}
                isApprovePending={isApprovePending}
                isRejectPending={isRejectPending}
              />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>

      <ActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        onConfirm={handleLocalActionConfirm}
        type={actionType || "approve"}
      />
    </Dialog>
  );
}
