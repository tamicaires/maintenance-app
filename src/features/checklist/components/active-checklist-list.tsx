import { lazy, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MoreVertical, CheckCircle, Play } from "lucide-react";
import { useChecklist } from "../hooks/use-checklist";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmptyState from "@/components/empty-state";
import { Spinner } from "@/components/Spinner";
import { useToast } from "@/components/Toast/toast";
import { DataWrapper } from "@/components/data-wrapper/data-wrapper";
import { useDialog } from "@/context/dialog";
import { ChecklistStart } from "../checklist/components/checklist-start";

const LazyChecklistItems = lazy(() => import("./checklist-items"));

export default function ActiveChecklistList() {
  const { ToastComponent } = useToast();
  const { openDialog } = useDialog();

  const { data, isLoading: isActiveChecklistLoading } = useChecklist();
  const activeChecklists = data?.data || [];

  const handleStartChecklist = () => {
    openDialog({
      title: "Iniciar Checklist",
      content: <ChecklistStart />,
      size: "2xl",
      onClose: () => {},
    });
  };

  return (
    <Card className="py-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Checklists Ativos</CardTitle>
        <div>
          {/* <StartChecklistDialog
            trigger={ */}
          <Button variant="default" onClick={handleStartChecklist}>
            <Play className="w-4 h-4 mr-2" />
            Iniciar Checklist
          </Button>
          {/* } */}
          {/* /> */}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 ">
        <ScrollArea className="h-[calc(80vh-200px)] flex flex-col gap-3">
          <DataWrapper
            data={activeChecklists}
            isLoading={isActiveChecklistLoading}
            EmptyComponent={({ message }) => (
              <EmptyState
                message={message || "Nenhum Checklist Ativo"}
                description="Inicie um novo checklist para começar a rastrear suas atividades."
              />
            )}
          >
            {(activeChecklists) => (
              <>
                {activeChecklists.map((checklist) => (
                  <div
                    key={checklist.id}
                    className="flex flex-col gap-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors my-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <CheckCircle className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {checklist.template.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Ordem de Serviço • {checklist.workOrder.displayId}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <Progress value={60} className="flex-1" />
                      <span className="text-sm font-medium">{60}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{"Elves Caires"}</Badge>
                      <Suspense fallback={<Spinner />}>
                        <LazyChecklistItems
                          checklistId={checklist.id}
                          // onFinish={() => {}}
                          trigger={
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0"
                            >
                              Ver Detalhes
                            </Button>
                          }
                        />
                      </Suspense>
                    </div>
                  </div>
                ))}
              </>
            )}
          </DataWrapper>
          {/* {hasActiveChecklists ? (
            activeChecklists.map((checklist) => (
              <div
                key={checklist.id}
                className="flex flex-col gap-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors my-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {checklist.template.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Ordem de Serviço • {checklist.workOrder.displayId}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <Progress value={60} className="flex-1" />
                  <span className="text-sm font-medium">{60}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{"Elves Caires"}</Badge>
                  <Suspense fallback={<Spinner />}>
                    <LazyChecklistItems
                      checklistId={checklist.id}
                      templateId={checklist.template.id}
                      workOrderId={checklist.workOrder.id}
                      itemStatuses={itemStatuses}
                      onItemStatusChange={handleItemStatusChange}
                      onFinish={() => {}}
                      trigger={
                        <Button variant="link" size="sm" className="h-auto p-0">
                          Ver Detalhes
                        </Button>
                      }
                    />
                  </Suspense>
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              message="Nenhum Checklist Ativo"
              description="Inicie um novo checklist para começar a rastrear suas atividades."
            />
          )} */}
        </ScrollArea>
      </CardContent>
      <ToastComponent />
    </Card>
  );
}
