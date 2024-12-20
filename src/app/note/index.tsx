import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";
import { INote } from "@/shared/types/note";
import { AnimatePresence } from "framer-motion";
import { NoteEditor } from "./components/note-editor";
import { NoteList } from "./components/note-list";

interface WorkOrderNotesProps {
  notes: INote[];
  workOrderId: string;
}

export function WorkOrderNotes({ notes, workOrderId }: WorkOrderNotesProps) {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  return (
    <Card className="w-full mx-auto  shadow-sm">
      <CardHeader className="border-b px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Notas</CardTitle>
          <div className="flex items-center gap-4">
            <Button
              variant="link"
              size="sm"
              onClick={() => setIsCreating(true)}
            >
              <MessageSquarePlus className="mr-2 h-4 w-4" />
              Nova nota
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <AnimatePresence>
          {isCreating && (
            <NoteEditor
              workOrderId={workOrderId}
              onCancel={() => setIsCreating(false)}
              setIsDialogOpen={() => {}}
            />
          )}
        </AnimatePresence>
        <ScrollArea className="h-[500px] -mr-6 pr-6">
          <NoteList notes={notes} />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
