import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PartRequestDetailsDialog } from "@/features/part-request/components/part-request-details/part-request-details";
import { RequestStatus } from "@/shared/enums/part-request";
import { ActivityFeed } from "../activity-feed";
import { ActivityItemProps } from "@/shared/types/activity";
import { EventActionEnum } from "@/shared/enums/event-action";
import { SubjectEnum } from "@/shared/enums/subject";
import { TabValue } from "@/shared/types/event";
import { usePartRequests } from "@/features/part-request/hooks/use-part-requests";
import { getDataOrDefault } from "@/utils/data";
import { IPartRequestRelationalData } from "@/shared/types/part-request-relational-data";

export function OpenRequestsList() {
  const [selectedRequests, setSelectedRequests] = useState<
    IPartRequestRelationalData[] | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<TabValue>("all");

  const { data, isLoading: isPartRequestLoading } = usePartRequests({
    status: RequestStatus.PENDING,
  });
  const requestData = data?.data?.partRequests || [];

  const partRequestData: IPartRequestRelationalData[] = requestData
    ? requestData.map((request) => {
        return { ...request };
      })
    : [];

  const partRequest = getDataOrDefault<IPartRequestRelationalData[]>(
    partRequestData,
    []
  );

  const handleTabChange = (value: string) => {
    setSelectedTab(value as TabValue);
    // setCurrentPage(1);
  };

  // const groupedByWorkOrder = useMemo(() => {
  //   return pendingRequests.reduce((acc, request) => {
  //     const workOrderId = request.workOrder?.displayId || "Sem OS";
  //     if (!acc[workOrderId]) {
  //       acc[workOrderId] = [];
  //     }
  //     acc[workOrderId].push(request);
  //     return acc;
  //   }, {} as Record<string, IPartRequest[]>);
  // }, [pendingRequests]);

  const handleViewRequest = (request: IPartRequestRelationalData) => {
    setSelectedRequests([request]);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedRequests(null);
  };

  const requestActivity: ActivityItemProps[] = partRequest.map((request) => {
    return {
      id: request.id,
      event: EventActionEnum.Requested,
      subject: SubjectEnum.Part_Request,
      quantity: request.quantity,
      workOrder: {
        id: request.workOrder.id,
        displayId: request.workOrder.displayId!,
      },
      handledBy: request.requestedBy!,
      handledAt: request.requestedAt.toString(),
      subjectDetails: request.part?.name,
      actionTrigger: (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleViewRequest(request)}
        >
          Ver
        </Button>
      ),
    };
  });

  const tabs = [
    { value: "all" as TabValue, label: "Todas", count: partRequest.length },
  ];

  return (
    <>
      <ActivityFeed
        title="Solicitações em Aberto"
        activities={requestActivity}
        isLoading={isPartRequestLoading}
        error={null}
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={handleTabChange}
        emptyStateMessage="Solicitações de Peças está vazio"
      />
      {selectedRequests && (
        <PartRequestDetailsDialog
          partRequests={selectedRequests}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
        />
      )}
    </>
  );
}
