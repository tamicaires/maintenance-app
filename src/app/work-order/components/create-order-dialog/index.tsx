import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Plus, Flag } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CustomDialogHeader } from "@/components/CustomDialogHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MaintenanceStatus,
  SeverityLevel,
  TypeOfMaintenance,
} from "@/shared/enums/work-order";
import { Select as CustomSelect } from "@/components/CustomCombobox/index";
import { useBoxes } from "@/app/Box/hooks/use-box";
import { useFleet } from "@/app/Fleet/hooks/use-fleet";
import { useCreateWorkOrder } from "@/app/work-order/hooks/use-create-order";
import { useToast } from "@/components/Toast/toast";

const severityColors = {
  [SeverityLevel.BAIXA]: "text-green-500",
  [SeverityLevel.NORMAL]: "text-gray-500",
  [SeverityLevel.ALTA]: "text-red-500",
  [SeverityLevel.URGENTE]: "text-purple-500",
};

const dateUtil = {
  formatDate: (date: Date | null | undefined): string => {
    if (!date) return "";
    return date.toISOString().slice(0, 16);
  },
  parseDate: (dateString: string): Date => {
    return new Date(dateString);
  },
};

export function WorkOrderCreationDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addToast, ToastComponent } = useToast();

  const {
    createWorkOrderForm,
    handleSubmit,
    isSubmitting,
    isError,
    error,
    reset,
  } = useCreateWorkOrder(setIsDialogOpen, addToast);

  const { data: boxes, isLoading: isBoxesLoading } = useBoxes();
  const { data: fleets, isLoading: isFleetsLoading } = useFleet();

  const { control, watch } = createWorkOrderForm;
  const status = watch("status");

  const handleOpenChange = (newOpen: boolean) => {
    setIsDialogOpen(newOpen);
    if (!newOpen) {
      reset();
    }
  };

  const fleetOptions =
    fleets?.data?.map((fleet) => ({
      value: fleet.id,
      label: fleet.fleetNumber,
    })) || [];

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Criar Nova Ordem de Serviço
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <CustomDialogHeader
          title="Cadastro de Ordem de Serviço"
          subtitle="Preencha os campos abaixo para criar uma nova ordem de serviço"
        />
        <Form {...createWorkOrderForm}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              control={control}
              name="fleetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frota</FormLabel>
                  <FormControl>
                    <CustomSelect
                      options={fleetOptions}
                      placeholder="Selecione uma frota"
                      emptyText="Nenhuma frota encontrada"
                      onChange={field.onChange}
                      isLoading={isFleetsLoading}
                      isFiltered={true}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={control}
                name="severityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nível de Severidade</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o nível" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(SeverityLevel).map((level) => (
                          <SelectItem key={level} value={level}>
                            <div className="flex items-center">
                              <Flag
                                className={`mr-2 h-4 w-4 ${severityColors[level]}`}
                              />
                              {level}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
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
                        {Object.values(TypeOfMaintenance).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={MaintenanceStatus.FILA}>
                          Fila
                        </SelectItem>
                        <SelectItem value={MaintenanceStatus.MANUTENCAO}>
                          Manutenção
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {status === MaintenanceStatus.FILA && (
              <FormField
                control={control}
                name="entryQueue"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>Data e Hora de Entrada na Fila</FormLabel>
                    <FormControl>
                      <Input
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
            )}

            {status === MaintenanceStatus.MANUTENCAO && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="entryMaintenance"
                  render={({ field: { onChange, value } }) => (
                    <FormItem>
                      <FormLabel>
                        Data e Hora de Entrada em Manutenção
                      </FormLabel>
                      <FormControl>
                        <Input
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
                          {isBoxesLoading ? (
                            <SelectItem value="">
                              Carregando boxes...
                            </SelectItem>
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
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando Ordem de Serviço...
                </>
              ) : (
                "Criar Ordem de Serviço"
              )}
            </Button>
          </form>
          <ToastComponent />
        </Form>
        {isError && <p className="text-red-500 mt-2">Erro: {error?.message}</p>}
      </DialogContent>
    </Dialog>
  );
}
