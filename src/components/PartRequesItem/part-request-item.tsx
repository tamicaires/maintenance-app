import { useState } from "react";
import { Check, X, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IPartRequest } from "@/shared/types/part-request";
import { RequestStatus } from "@/shared/enums/part-request";
import { dateUtil } from "@/utils/date";

interface PartRequestItemProps {
  request: IPartRequest;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isApprovePending: boolean;
  isRejectPending: boolean;
}

function PartRequestItem({
  request,
  onApprove,
  onReject,
  isApprovePending,
  isRejectPending,
}: PartRequestItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="rounded-lg bg-card shadow-sm">
      <div className="pl-4 py-4 pr-0.5">
        <div className="flex items-center justify-between">
          <div className="flex gap-10 w-full justify-between">
            <div className="w-auto">
              <h3 className="font-semibold">{request.part?.name}</h3>
              <p className="text-sm text-muted-foreground">
                NI: {request.part?.partNumber}
              </p>
            </div>
            <div className="flex items-center justify-around gap-10 px-4">
              <div className="flex flex-col text-right items-end justify-items-stretch">
                <div className="flex flex-col justify-center items-center leading-none">
                  <span className="text-muted-foreground text-sm">Qtd.</span>
                  <span className="font-semibold">x{request.quantity}</span>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center leading-none">
                <span className="text-muted-foreground text-xs">
                  Solicitado por
                </span>
                <span className="text-sm font-semibold">
                  {request.requestedBy?.name}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            {request.status === RequestStatus.PENDING ? (
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  className="bg-[#fd6161] bg-opacity-15 text-[#FB5757] hover:bg-[#da4a4a] hover:text-white rounded-full py-1"
                  onClick={() => onReject(request.id)}
                  disabled={isRejectPending}
                >
                  <X className="w-4 h-4 mr-1" />
                  Rejeitar
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-[#4CE02A] bg-opacity-10 text-[#43a02e] hover:bg-[#50af3b] hover:text-white rounded-full"
                  onClick={() => onApprove(request.id)}
                  disabled={isApprovePending}
                >
                  <Check className="w-4 h-4 mr-1" />
                  Aprovar
                </Button>
              </div>
            ) : (
              <div
                className={`px-3 py-1 rounded-full text-sm ${
                  request.status === RequestStatus.APPROVED
                    ? "bg-[#78DC36] text-white"
                    : "bg-[#F25252] text-white"
                }`}
              >
                {request.status === RequestStatus.APPROVED
                  ? "Aprovado"
                  : "Rejeitado"}
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={toggleExpand}>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
        {isExpanded && (
          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-5 items-center gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Reboque</p>
                <p className="font-medium">{request.trailer.plate}</p>
              </div>
              {request.trailer.axle && (
                <div>
                  <p className="text-muted-foreground">Eixo</p>
                  <p className="font-medium">{request.trailer.axle.position}</p>
                </div>
              )}
              <div>
                <p className="text-muted-foreground">Posição</p>
                <p className="font-medium">{request.trailer.position}</p>
              </div>
              {request.stockQuantity && (
                <div
                  className={`${
                    request.stockQuantity < request.quantity
                      ? "text-red-500"
                      : ""
                  } flex flex-col justify-center items-center`}
                >
                  <span className="text-sm">Estoque </span>
                  <span className={`font-semibold text-sm`}>
                    {request.stockQuantity}
                  </span>
                </div>
              )}
              <div>
                <p className="text-muted-foreground">
                  {dateUtil.timeSince(new Date(request.requestedAt))}
                </p>
              </div>
              {request.status === RequestStatus.APPROVED && (
                <div className="">
                  <p className="text-sm text-muted-foreground">Qtd. Aprovada</p>
                  <p className="font-medium">{request.approvedQuantity}</p>
                </div>
              )}
            </div>
            {request.status === RequestStatus.REJECTED && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Motivo da Rejeição
                </p>
                <p className="font-medium">{request.rejectionReason}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PartRequestItem;
