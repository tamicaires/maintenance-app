import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, ClipboardList, Eye } from "lucide-react";
import { useChecklistTemplate } from "../checklist-template/hooks/use-checklist-templates";
import { IChecklistTemplate } from "@/shared/types/checklist";
import * as Icons from "lucide-react";
import { ChecklistTemplateDetailsDialog } from "./checklist-template-details";
import { ScrollArea } from "@/components/ui/scroll-area";
import CreateTemplateDialog from "../checklist-template/components/create-template-dialog";
import EmptyState from "@/components/states/empty-state";

export default function ChecklistTemplateList() {
  const [selectedTemplate, setSelectedTemplate] =
    useState<IChecklistTemplate | null>(null);

  const { data } = useChecklistTemplate();

  const templates = data?.data || [];
  const hasTemplates = templates.length > 0;

  const renderIcon = (iconName: string | undefined) => {
    if (!iconName) return <ClipboardList className="w-5 h-5 text-primary" />;

    const IconComponent = (Icons as any)[iconName] as React.ComponentType<any>;
    return IconComponent ? (
      <IconComponent className="w-5 h-5 text-primary" />
    ) : (
      <ClipboardList className="w-5 h-5 text-primary" />
    );
  };

  return (
    <Card className="shadow-md border-r border-muted rounded-md px-6 py-4 ">
      <CardHeader className="flex flex-row items-center justify-between p-0">
        <CardTitle className="font-bold">Checklist Templates</CardTitle>
        <CreateTemplateDialog>
          <Button variant="default">
            <Icons.Plus className="w-4 h-4 mr-2" />
            Novo Template
          </Button>
        </CreateTemplateDialog>
      </CardHeader>
      <CardContent className="p-0 py-4 pr-2">
        <ScrollArea className="h-[calc(80vh-200px)]">
          <div className="space-y-4">
            {hasTemplates ? (
              templates.map((template) => (
                <div
                  key={template.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {renderIcon(template.icon)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {template.items?.length || 0} items • Last used 12 horas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:text-muted-foreground"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                message="Nenhum Template de Checklist"
                description="Crie um novo template para começar a rastrear suas atividades."
              />
            )}
          </div>
        </ScrollArea>
      </CardContent>
      {selectedTemplate && (
        <ChecklistTemplateDetailsDialog
          template={selectedTemplate}
          isOpen={!!selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
    </Card>
  );
}
