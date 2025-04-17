import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { CustomDialogHeader } from "@/components/CustomDialogHeader";
import { IconSelector } from "@/components/icon-selector/icon-selector";
import { useCreateChecklistTemplate } from "../hooks/use-create-checklist-template";
import { useToast } from "@/components/Toast/toast";
import { ChecklistTemplateDetailsDialog } from "../../components/checklist-template-details";

export default function CreateTemplateDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [isAddItemDialogOpen, setAddItemDialogOpen] = useState<boolean>(false);
  const { toast: addToast, ToastComponent } = useToast();

  const {
    createChecklistTemplateForm,
    handleSubmit,
    isSubmitting,
    createdTemplate,
    control,
    reset,
  } = useCreateChecklistTemplate(addToast, setAddItemDialogOpen);

  const handleDetailsDialogClose = useCallback(() => {
    setAddItemDialogOpen(false);
    reset();
  }, [setAddItemDialogOpen, reset]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle hidden>Criar Checklist Template</DialogTitle>
            <CustomDialogHeader
              title="Criar Template de Checklist"
              subtitle=""
            />
          </DialogHeader>
          <Form {...createChecklistTemplateForm}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key="info"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Template</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Ex: Inspeção de Veículo"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-start gap-2">
                        <FormLabel>Escolha um ícone</FormLabel>
                        <FormControl>
                          <div>
                            <IconSelector
                              onSelect={(icon) => field.onChange(icon)}
                              triggerVariant="ghost"
                              triggerText="Personalizar"
                              triggerClassName="ml-[-12px]"
                              showIcon
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-between gap-2 mt-2 w-full">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="w-full"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  Criar Template
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {createdTemplate && (
        <ChecklistTemplateDetailsDialog
          isOpen={isAddItemDialogOpen}
          onClose={handleDetailsDialogClose}
          template={createdTemplate}
        />
      )}
      <ToastComponent />
    </>
  );
}
