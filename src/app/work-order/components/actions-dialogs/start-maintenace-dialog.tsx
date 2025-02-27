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
import { useStartMaintenance } from "../../hooks/use-start-work-order";
import { useToast } from "@/components/Toast/toast";
import { useState } from "react";
import { useBoxes } from "@/app/boxes/hooks/use-box";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomDialogHeader } from "@/components/CustomDialogHeader";

type StartMaintenanceDialogProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  onClose?: () => void;
  workOrderId: string;
};

export function StartMaintenanceDialog({
  onClose,
  children,
  workOrderId,
}: StartMaintenanceDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast: addToast, ToastComponent } = useToast();
  const { data: boxes, isLoading: isBoxesLoading } = useBoxes();

  const {
    control,
    startMaintenanceForm,
    handleSubmit,
    isPending: isStartMaintenancePending,
  } = useStartMaintenance(setIsDialogOpen, addToast, workOrderId);

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
          <DialogTitle hidden>Iniciar Manutenção</DialogTitle>
          <CustomDialogHeader
            title="Iniciar Manutenção"
            subtitle="Selecione a data e hora de inicio da manutenção"
          />
        </DialogHeader>
        <Form {...startMaintenanceForm}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-3 w-full justify-between">
              <FormField
                control={control}
                name={"entryMaintenance"}
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
              <FormField
                control={control}
                name="boxId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Box</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o box" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isBoxesLoading ? (
                          <SelectItem value="">Carregando boxes...</SelectItem>
                        ) : (
                          boxes?.data?.map((box) => (
                            <SelectItem key={box.id} value={box.id}>
                              {box.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" type="button">
                Cancelar
              </Button>
              <Button type="submit" disabled={isStartMaintenancePending}>
                {isStartMaintenancePending ? "Processando..." : "Confirmar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      <ToastComponent />
    </Dialog>
  );
}
