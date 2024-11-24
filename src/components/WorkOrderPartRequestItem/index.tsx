import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IPartRequest } from "@/shared/types/part-request";
import { RequestStatus } from "@/shared/enums/part-request";
import { cn } from "@/lib/utils";
import { Profile } from "../Profile";
import { getRequestStatusInfo } from "@/utils/part-request";

interface WorkOrderPartRequestItemProps {
  partRequest: IPartRequest;
  index: number;
  totalRequests: number;
}

const WorkOrderPartRequestItem: React.FC<WorkOrderPartRequestItemProps> = ({
  partRequest,
  index,
  totalRequests,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const statusInfo = getRequestStatusInfo(partRequest.status);

  return (
    <div
      key={partRequest.id}
      className={cn(
        "py-2.5 px-4 rounded-lg border bg-card transition-colors hover:bg-accent/50",
        index !== totalRequests - 1 && "mb-4"
      )}
    >
      <div className="flex justify-between">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <div className="w-auto">
              <h3 className="font-semibold">{partRequest.part?.name}</h3>
              <p className="text-xs text-muted-foreground">
                NI: {partRequest.part?.partNumber}
              </p>
            </div>
            <div className="flex gap-5 ml-10">
              <div className="flex flex-col text-right items-end">
                <div className="flex flex-col justify-center items-center leading-none">
                  <span className="text-muted-foreground text-sm">Qtd.</span>
                  <span className="font-semibold">x{partRequest.quantity}</span>
                </div>
              </div>
              {partRequest.status === RequestStatus.APPROVED && (
                <div className="flex flex-col text-right items-end">
                  <div className="flex flex-col justify-center items-center leading-none">
                    <span className="text-muted-foreground text-sm">
                      Qtd. Aprovada
                    </span>
                    <span className="font-semibold">
                      x{partRequest.approvedQuantity}
                    </span>
                  </div>
                </div>
              )}
              {partRequest.status === RequestStatus.REJECTED && (
                <div className="flex flex-col justify-center leading-none">
                  <p className="text-sm text-muted-foreground">
                    Motivo da Rejeição
                  </p>
                  <p className="font-semibold">{partRequest.rejectionReason}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <Badge
            variant="secondary"
            className={cn(
              `bg-${statusInfo.color}-100 text-${statusInfo.color}-800`
            )}
          >
            {statusInfo.label}
          </Badge>
          <Button variant="ghost" size="sm" onClick={toggleExpand}>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 ml-2" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-2" />
            )}
          </Button>
          <p className="text-muted-foreground text-xs pt-1">
            {new Date(partRequest.requestedAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        {partRequest.deliveredAt && (
          <>
            <span>•</span>
            <span>
              Entregue: {new Date(partRequest.deliveredAt).toLocaleString()}
            </span>
          </>
        )}
      </div>
      {isExpanded && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-4 text-sm justify-between">
            <div className="flex gap-6">
              <div>
                <p className="text-muted-foreground">Reboque</p>
                <p className="font-medium">{partRequest.trailer.plate}</p>
              </div>
              {partRequest.trailer.axle && (
                <div>
                  <p className="text-muted-foreground">Eixo</p>
                  <p className="font-medium">
                    {partRequest.trailer.axle.position}
                  </p>
                </div>
              )}
              <div>
                <p className="text-muted-foreground">Posição</p>
                <p className="font-medium">{partRequest.trailer.position}</p>
              </div>
            </div>
            {partRequest.requestedBy && (
              <Profile
                companyName={partRequest.requestedBy.name}
                description="Solicitante"
                showAvatar
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkOrderPartRequestItem;
