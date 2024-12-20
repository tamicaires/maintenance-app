import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/Toast/toast";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useCreateNote } from "../hooks/use-create-note";
import { motion } from "framer-motion";

interface NoteEditorProps {
  workOrderId: string;
  onCancel: () => void;
  setIsDialogOpen: (open: boolean) => void;
}

export function NoteEditor({
  workOrderId,
  onCancel,
  setIsDialogOpen,
}: NoteEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { addToast } = useToast();

  const { handleSubmit, createNoteForm, isSubmitting, isPending, control } =
    useCreateNote(setIsDialogOpen, addToast, workOrderId, onCancel);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="pb-4"
    >
      <Form {...createNoteForm}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3 items-start">
            <div className="flex-1 space-y-2">
              <FormField
                control={control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        ref={textareaRef}
                        placeholder="Adicione uma nota a Ordem de Serviço..."
                        className="min-h-[80px] resize-none focus-visible:ring-1 bg-muted/5"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onCancel}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  variant="secondary"
                  disabled={isSubmitting || isPending}
                >
                  {isSubmitting || isPending ? "Enviando..." : "Enviar"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
