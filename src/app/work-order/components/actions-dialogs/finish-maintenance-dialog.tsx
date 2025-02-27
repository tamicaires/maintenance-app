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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomDialogHeader } from "@/components/CustomDialogHeader";
import { useEmployee } from "@/app/Employee/hooks/use-employee";
import { useFinishMaintenance } from "../../hooks/use-finish-maintenance";

type FinishMaintenanceDialogProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  onClose?: () => void;
  workOrderId: string;
};

export function FinishMaintenanceDialog({
  onClose,
  children,
  workOrderId,
}: FinishMaintenanceDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast: addToast, ToastComponent } = useToast();
  const { data: employees, isLoading: isEmployeesLoading } = useEmployee();

  const supervisors =
    employees?.data?.filter((employee) => employee.jobTitle === "Supervisor") ||
    [];
  const {
    control,
    finishMaintenanceForm,
    handleSubmit,
    isPending: isFinishMaintenancePending,
  } = useFinishMaintenance(setIsDialogOpen, addToast, workOrderId);

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
            title="Finalizar Manutenção"
            subtitle="Selecione a data e hora de finalização da manutenção"
          />
        </DialogHeader>
        <Form {...finishMaintenanceForm}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-3 w-full justify-between">
              <FormField
                control={control}
                name={"exitMaintenance"}
                render={({ field: { onChange, value } }) => (
                  <FormItem className="w-full">
                    <FormLabel>Data e Hora de saida</FormLabel>
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
                name="exitSupervisor"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Supervisor de Saida</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o supervisor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isEmployeesLoading ? (
                          <SelectItem value="">
                            Carregando supervisores...
                          </SelectItem>
                        ) : (
                          supervisors.map((box) => (
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
              <Button type="submit" disabled={isFinishMaintenancePending}>
                {isFinishMaintenancePending ? "Processando..." : "Confirmar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      <ToastComponent />
    </Dialog>
  );
}
