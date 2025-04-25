import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MoreVertical, CheckCircle, Play } from "lucide-react";
import { useChecklist } from "../hooks/use-checklist";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataWrapper } from "@/components/data-wrapper/data-wrapper";
import { useDialog } from "@/core/providers/dialog";
import { ChecklistStart } from "../components/checklist-start";
import { Profile } from "@/components/Profile";
import ChecklistDetails from "../components/checklist-details";

export default function ActiveChecklistList() {
  const { openDialog } = useDialog();

  const { data, isLoading: isActiveChecklistLoading } = useChecklist();
  const activeChecklists = data || [];

  const handleStartChecklist = () => {
    openDialog({
      title: "Iniciar Checklist",
      content: <ChecklistStart />,
      size: "2xl",
      onClose: () => {},
    });
  };

  const handleOpenChecklistItems = (checklistId: string) => {
    openDialog({
      title: "Checklist Items",
      content: <ChecklistDetails checklistId={checklistId} />,
      size: "4xl",
    });
  };

  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Checklists Pendentes</CardTitle>
        <div>
          <Button variant="default" onClick={handleStartChecklist}>
            <Play className="w-4 h-4 mr-2" />
            Iniciar Checklist
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 ">
        <ScrollArea className="h-[calc(80vh-200px)] flex flex-col gap-3">
          <DataWrapper
            data={activeChecklists}
            isLoading={isActiveChecklistLoading}
            emptyMessage="Nenhum Checklist Aberto"
            emptyDescription="Inicie um novo checklist para começar a rastrear suas atividades."
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
                      <Profile
                        name={"Elves Caires"}
                        description="Executor"
                        descriptionPosition="bottom"
                        showAvatar
                      />
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0"
                        onClick={() => handleOpenChecklistItems(checklist.id)}
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </DataWrapper>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
