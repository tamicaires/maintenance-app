import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Input } from "@/components/ui/input";
import { useChangeServiceAssignmentStatus } from "@/app/service-assigment/hooks/use-change-service-assigment-status";
import { useToast } from "@/components/Toast/toast";
import { dateUtil } from "@/utils/date";

interface ServiceActionDialogProps {
  serviceAssignmentId: string;
  isOpen?: boolean;
  action: "start" | "finish";
  onClose?: () => void;
  children?: React.ReactNode;
}

export function ServiceActionDialog({
  isOpen,
  onClose,
  serviceAssignmentId,
  action,
  children,
}: ServiceActionDialogProps) {
  const { addToast, ToastComponent } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(isOpen);
  isDialogOpen
  const {
    changeServiceAssignmentStatusForm,
    handleSubmit,
    isPending,
    control,
  } = useChangeServiceAssignmentStatus(
    setIsDialogOpen,
    addToast,
    action,
    serviceAssignmentId
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && onClose) onClose();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {action === "start" ? "Iniciar Serviço" : "Finalizar Serviço"}
          </DialogTitle>
          <DialogDescription>
            Selecione a data e hora{" "}
            {action === "start" ? "para inicio do" : " de finalização do"}{" "}
            serviço
          </DialogDescription>
        </DialogHeader>
        <Form {...changeServiceAssignmentStatusForm}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              control={control}
              name={action === "start" ? "startAt" : "endAt"}
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Data e Hora</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      type="datetime-local"
                      value={dateUtil.formatDate(value)}
                      onChange={(e) =>
                        onChange(dateUtil.parseDate(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                type="button"
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Processando..." : "Confirmar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      <ToastComponent />
    </Dialog>
  );
}
