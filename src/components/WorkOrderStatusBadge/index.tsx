import { useState } from "react";
import { IWorkOrder } from "@/shared/types/work-order.interface";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MaintenanceStatus, Box } from "@/shared/enums/work-order";
import { useUpdateWorkOrder } from "@/app/work-order/hooks/use-update-work-order";
import { CustomDialogHeader } from "../CustomDialogHeader";
import { getMaintenanceStatusInfo } from "@/utils/work-order";

interface WorkOrderStatusBadgeProps {
  workOrder: IWorkOrder;
}

const statusLabels: Record<MaintenanceStatus, string> = {
  [MaintenanceStatus.FILA]: "Fila",
  [MaintenanceStatus.MANUTENCAO]: "Manutenção",
  [MaintenanceStatus.AGUARDANDO_PECA]: "Aguardando Peça",
  [MaintenanceStatus.FINALIZADA]: "Finalizada",
  [MaintenanceStatus.CANCELADA]: "Cancelada",
};

export default function WorkOrderStatusBadge({
  workOrder,
}: WorkOrderStatusBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<MaintenanceStatus | null>(null);
  const { form, handleSubmit, isSubmitting, handleEdit, setEditingWorkOrder } =
    useUpdateWorkOrder(() => setIsOpen(false));

  const statusInfo = getMaintenanceStatusInfo(workOrder.status);
  const onOpenChange = (open: boolean) => {
    if (open) {
      handleEdit(workOrder);
      setStatus(workOrder.status);
    } else {
      setEditingWorkOrder(null);
    }
    setIsOpen(open);
  };

  const onSubmit = async (data: any) => {
    try {
      await handleSubmit(data);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          role="combobox"
          className={`justify-between text-sm bg-${statusInfo.color}-200 text-${statusInfo.color}-600 border-${statusInfo.color}-300 bg-opacity-15`}
        >
          <span className="flex items-center">
            <statusInfo.icon className="mr-2 h-4 w-4" />
            {workOrder.status.toUpperCase()}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle hidden>Atualizar Status da Ordem de Serviço</DialogTitle>
          <CustomDialogHeader
            title="Atualizar Status"
            subtitle="Preencha os dados para mudança de status"
          />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setStatus(value as MaintenanceStatus);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {Object.entries(MaintenanceStatus).map(
                          ([key, value]) => (
                            <SelectItem key={key} value={value}>
                              {statusLabels[value]}
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {status === MaintenanceStatus.FILA && (
              <FormField
                control={form.control}
                name="entryQueue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entrada Fila</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        value={
                          field.value
                            ? new Date(field.value).toISOString().slice(0, -1)
                            : ""
                        }
                        onChange={(e) => {
                          const value = e.target.value
                            ? new Date(e.target.value)
                            : null;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {status === MaintenanceStatus.MANUTENCAO && (
              <>
                <FormField
                  control={form.control}
                  name="entryMaintenance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entrada Manutenção</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          value={
                            field.value
                              ? new Date(field.value).toISOString().slice(0, -1)
                              : ""
                          }
                          onChange={(e) => {
                            const value = e.target.value
                              ? new Date(e.target.value)
                              : null;
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="box"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Box</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o box" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {Object.entries(Box).map(([key, value]) => (
                              <SelectItem key={key} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {status === MaintenanceStatus.AGUARDANDO_PECA && (
              <FormField
                control={form.control}
                name="startWaitingParts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Início Aguardando Peça</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        value={
                          field.value
                            ? new Date(field.value).toISOString().slice(0, -1)
                            : ""
                        }
                        onChange={(e) => {
                          const value = e.target.value
                            ? new Date(e.target.value)
                            : null;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {status === MaintenanceStatus.FINALIZADA && (
              <>
                <FormField
                  control={form.control}
                  name="exitMaintenance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Saída Manutenção</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          value={
                            field.value
                              ? new Date(field.value).toISOString().slice(0, -1)
                              : ""
                          }
                          onChange={(e) => {
                            const value = e.target.value
                              ? new Date(e.target.value)
                              : null;
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="exitSupervisor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supervisor de Saída</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Atualizando..." : "Atualizar Status"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
