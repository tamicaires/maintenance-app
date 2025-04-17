import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { dateUtil } from "@/utils/date";
import { useToast } from "@/components/Toast/toast";
import { useState } from "react";
import { CustomDialogHeader } from "@/components/CustomDialogHeader";
import { useStartWaitingParts } from "../../hooks/actions/use-start-waiting-parts";

type StartWaitingPartsDialogProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  onClose?: () => void;
  workOrderId: string;
};

export function StartWaitingPartsDialog({
  onClose,
  children,
  workOrderId,
}: StartWaitingPartsDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast: addToast, ToastComponent } = useToast();

  const {
    control,
    startWaitingPartsForm,
    handleSubmit,
    isPending: isStartWaitingPartsPending,
  } = useStartWaitingParts(setIsDialogOpen, addToast, workOrderId);

  const handleOpenChange = (newOpen: boolean) => {
    setIsDialogOpen(newOpen);
    if (!newOpen) {
      onClose && onClose();
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle hidden>Iniciar Aguardando Peça</DialogTitle>
          <CustomDialogHeader
            title="Iniciar Aguardando Peça"
            subtitle="Selecione a data e hora de início de aguardando peça"
          />
        </DialogHeader>
        <Form {...startWaitingPartsForm}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-3 w-full justify-between">
              <FormField
                control={control}
                name={"startWaitingParts"}
                render={({ field: { onChange, value } }) => (
                  <FormItem className="w-full">
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
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isStartWaitingPartsPending}>
                {isStartWaitingPartsPending ? "Processando..." : "Confirmar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      <ToastComponent />
    </Dialog>
  );
}
