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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

import {
  Box,
  MaintenanceStatus,
  SeverityLevel,
  TypeOfMaintenance,
} from "@/shared/enums/work-order";
import { Select as CustomSelect } from "@/components/CustomCombobox";
import { useFleet } from "@/app/Fleet/hooks/use-fleet";
import { useCreateWorkOrder } from "../hooks/use-create-order";

export function CreateWorkOrder() {
  const [status, setStatus] = useState<MaintenanceStatus | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, isLoading } = useFleet();
  const fleets = data?.data || [];

  const { createWorkOrderForm, handleSubmit, isSubmitting, reset } =
    useCreateWorkOrder(setIsOpen);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => {
    setIsOpen(false);
    reset();
  };

  const formatDateTimeForInput = (date: Date | null | undefined): string => {
    if (!date) return "";
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={openDialog}>
          <Plus className="mr-2 h-4 w-4" /> Abrir Ordem de Serviço
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Abrir Ordem de Serviço</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para abrir uma nova ordem de serviço.
          </DialogDescription>
        </DialogHeader>
        <Form {...createWorkOrderForm}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <FormField
              control={createWorkOrderForm.control}
              name="fleetId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Frota</FormLabel>
                  <CustomSelect
                    options={fleets.map((fleet) => ({
                      value: fleet.id,
                      label: fleet.fleetNumber,
                    }))}
                    placeholder="Selecione a frota..."
                    isFiltered
                    onChange={field.onChange}
                    isLoading={isLoading}
                    value={field.value}
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {Object.entries(TypeOfMaintenance).map(
                          ([key, value]) => (
                            <SelectItem key={key} value={value}>
                              {value}
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
            <FormField
              control={createWorkOrderForm.control}
              name="severityLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grau de Severidade</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o grau de severidade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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
                              {value}
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
                control={createWorkOrderForm.control}
                name="entryQueue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entrada Fila</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        value={formatDateTimeForInput(field.value)}
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
                          value={formatDateTimeForInput(field.value)}
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o Box" />
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
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={closeDialog}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Carregando..." : "Abrir Ordem de Serviço"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
