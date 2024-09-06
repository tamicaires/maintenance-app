import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Dialog } from "@/components/CustomDialog";

import {
  Box,
  MaintenanceStatus,
  SeverityLevel,
  TypeOfMaintenance,
} from "@/shared/enums/work-order";
import { Combobox } from "@/components/CustomCombobox";
import { useFleet } from "@/app/Fleet/hooks/use-fleet";
import { useCreateWorkOrder } from "../hooks/use-create-order";

interface CreateWorkOrderProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

export function CreateWorkOrder({
  isDialogOpen,
  setIsDialogOpen,
}: CreateWorkOrderProps) {
  const [status, setStatus] = useState<MaintenanceStatus | null>(null);

  const { data, isLoading } = useFleet();
  const fleets = data?.data || [];

  const { createWorkOrderForm, handleSubmit, isSubmitting } =
    useCreateWorkOrder(setIsDialogOpen);

  const closeDialog = () => setIsDialogOpen(false);
  return (
    <Dialog
      title="Abrir Ordem de Serviço"
      description="Preencha os campos abaixo para abrir uma nova ordem de serviço."
      isOpen={isDialogOpen}
      onClose={closeDialog}
      confirmText="Cadastrar"
      cancelText="Cancelar"
    >
      <Form {...createWorkOrderForm}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <FormField
            control={createWorkOrderForm.control}
            name="fleetId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Frota</FormLabel>
                <Combobox
                  options={fleets.map((fleet) => ({
                    value: fleet.id,
                    label: fleet.fleetNumber,
                  }))}
                  placeholder="Selecione a frota..."
                  onChange={(value) => field.onChange(value)}
                  isLoading={isLoading}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createWorkOrderForm.control}
            name="typeOfMaintenance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Manutenção</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="select-content">
                    <SelectGroup>
                      {Object.entries(TypeOfMaintenance).map(([key, value]) => (
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
          <FormField
            control={createWorkOrderForm.control}
            name="severityLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grau de Severidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o grau de severidade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="select-content">
                    <SelectGroup>
                      {Object.entries(SeverityLevel).map(([key, value]) => (
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
          <FormField
            control={createWorkOrderForm.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setStatus(value as MaintenanceStatus);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="select-content">
                    <SelectGroup>
                      {Object.entries(MaintenanceStatus).map(([key, value]) => (
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
          {status === MaintenanceStatus.FILA && (
            <FormField
              control={createWorkOrderForm.control}
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
            <div className="flex justify-between gap-3">
              <FormField
                control={createWorkOrderForm.control}
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
                control={createWorkOrderForm.control}
                name="box"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Box</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o Box" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="select-content">
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
            </div>
          )}

          <div className="w-full flex gap-3">
            <Button variant="outline" className="w-full" onClick={closeDialog}>
              Cancelar
            </Button>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Abrir Ordem de Serviço
            </Button>
          </div>
        </form>
      </Form>
    </Dialog>
  );
}
