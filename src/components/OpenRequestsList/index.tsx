import { useState, useMemo, useEffect } from "react";
import { Clock, List, Wrench } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IPartRequest } from "@/interfaces/part-request";
import { dateUtil } from "@/utils/date";
import { Spinner } from "../Spinner";
import { Profile } from "../Profile";
import { PartRequestDetailsDialog } from "@/app/PartRequest/part-request-details";
import { RequestStatus } from "@/shared/enums/part-request";

type OpenRequestsListProps = {
  requests: IPartRequest[];
  isLoading?: boolean;
  onUpdateRequests: (updatedRequests: IPartRequest[]) => void;
};

export function OpenRequestsList({
  requests,
  isLoading = false,
  onUpdateRequests
}: OpenRequestsListProps) {
  const [selectedRequests, setSelectedRequests] = useState<IPartRequest[] | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "workOrder">("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [localRequests, setLocalRequests] = useState<IPartRequest[]>(requests);

  useEffect(() => {
    setLocalRequests(requests);
  }, [requests]);

  const pendingRequests = useMemo(() => {
    return localRequests.filter(request => request.status === RequestStatus.PENDING);
  }, [localRequests]);

  const groupedByWorkOrder = useMemo(() => {
    return pendingRequests.reduce((acc, request) => {
      const workOrderId = request.workOrder?.displayId || "Sem OS";
      if (!acc[workOrderId]) {
        acc[workOrderId] = [];
      }
      acc[workOrderId].push(request);
      return acc;
    }, {} as Record<string, IPartRequest[]>);
  }, [pendingRequests]);

  const handleViewRequest = (request: IPartRequest) => {
    setSelectedRequests([request]);
    setIsDialogOpen(true);
  };

  const handleViewWorkOrder = (workOrderId: string) => {
    setSelectedRequests(groupedByWorkOrder[workOrderId]);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedRequests(null);
  };

  const handleUpdateRequests = (updatedRequests: IPartRequest[]) => {
    setLocalRequests(prevRequests => {
      const newRequests = prevRequests.map(req => {
        const updatedReq = updatedRequests.find(r => r.id === req.id);
        return updatedReq || req;
      });
      console.log("Updating requests:", newRequests.filter(req => req.status === RequestStatus.PENDING).length);
      onUpdateRequests(newRequests);
      return newRequests;
    });
  };

  const renderWorkOrderItem = (
    workOrderId: string,
    workOrderRequests: IPartRequest[]
  ) => (
    <div key={workOrderId} className="bg-muted/20 rounded-lg p-4 space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">OS: {workOrderId}</h3>
        <Badge variant="secondary">{workOrderRequests.length} peças</Badge>
      </div>
      <div className="flex justify-between">
        <p className="flex flex-col text-sm text-muted-foreground">
          <Profile
            showAvatar
            size="small"
            description="Solicitante"
            companyName={
              workOrderRequests[0].requestedBy?.name || "Desconhecido"
            }
          />
        </p>
        <p className="text-sm text-muted-foreground">
          {dateUtil.timeSince(new Date(workOrderRequests[0].requestedAt))}
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="w-full mt-2"
        onClick={() => handleViewWorkOrder(workOrderId)}
      >
        Ver Detalhes
      </Button>
    </div>
  );

  const renderPartItem = (request: IPartRequest) => (
    <div key={request.id} className="flex items-start space-x-4">
      <Avatar className="h-10 w-10">
        <AvatarImage
          src={`https://api.dicebear.com/6.x/initials/svg?seed=${request.requestedBy?.name}`}
        />
        <AvatarFallback>{request.requestedBy?.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">
          {request.requestedBy?.name}{" "}
          <span className="text-muted-foreground font-normal">solicitou</span>{" "}
          {request.quantity}x {request.part?.name}
        </p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>{dateUtil.timeSince(new Date(request.requestedAt))}</span>
          <span className="mx-2">•</span>
          <span>OS: {request.workOrder?.displayId || "N/I"}</span>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleViewRequest(request)}
      >
        Ver
      </Button>
    </div>
  );

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Solicitações em Aberto</CardTitle>
          <Badge
            variant="outline"
            className="rounded-full border border-primary/40 bg-primary/10 text-primary/80 font-bold py-1"
          >
            {pendingRequests.length}
          </Badge>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "all" | "workOrder")
            }
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">
                <List className="h-4 w-4 mr-2" />
                Todas
              </TabsTrigger>
              <TabsTrigger value="workOrder">
                <Wrench className="h-4 w-4 mr-2" />
                Por OS
              </TabsTrigger>
            </TabsList>
            <ScrollArea className="mt-4">
              <TabsContent value="all">
                {isLoading ? (
                  <Spinner />
                ) : (
                  <div className="space-y-4">
                    {pendingRequests.map((request) => (
                      <div key={request.id}>
                        {renderPartItem(request)}
                        <Separator className="my-4" />
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="workOrder">
                {isLoading ? (
                  <Spinner />
                ) : (
                  <div className="space-y-4">
                    {Object.entries(groupedByWorkOrder).map(
                      ([workOrderId, workOrderRequests]) =>
                        renderWorkOrderItem(workOrderId, workOrderRequests)
                    )}
                  </div>
                )}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>
      {selectedRequests && (
        <PartRequestDetailsDialog
          partRequests={selectedRequests}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onUpdateRequests={handleUpdateRequests}
        />
      )}
    </>
  );
}