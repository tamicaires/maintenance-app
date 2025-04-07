import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CustomDialogHeader } from "@/components/CustomDialogHeader";
import { MaintenanceStatus } from "@/shared/enums/work-order";
import { useBoxes } from "@/app/boxes/hooks/use-box";
import { useFleet } from "@/app/fleet/hooks/use-fleet";
import { useCreateWorkOrder } from "@/app/work-order/hooks/use-create-order";
import SelectField from "@/components/forms/select-field";
import { IOption } from "@/components/custom-combobox";
import { severityOptions } from "@/shared/constants/options/severity-options";
import { typeOfMaintenanceOptions } from "@/shared/constants/options/type-of-maintenance-options";
import { maintenanceStatusOptions } from "@/shared/constants/options/status-options";
import InputField from "@/components/forms/input-field";
import { DateTimeField } from "@/components/forms/date-time-field";

export function WorkOrderCreationDialog() {
  const {
    form,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    handleSubmit,
    isPending,
    canSubmit,
    statusWatcher,
  } = useCreateWorkOrder();

  const { data: boxesData, isLoading: isBoxesLoading } = useBoxes();
  const { data: fleetsData, isLoading: isFleetsLoading } = useFleet();

  const handleOpenChange = (newOpen: boolean) => {
    setIsCreateDialogOpen(newOpen);
  };

  const fleetOptions: IOption[] =
    fleetsData?.fleets.map((fleet) => ({
      value: fleet.id,
      label: fleet.fleetNumber,
      description: fleet.carrierName,
    })) || [];

  const boxOptions: IOption[] =
    boxesData?.data?.map((box) => ({
      value: box.id,
      label: `Box ${box.name}`,
      description: box.description,
    })) || [];

  const availableStatusesForCreation = maintenanceStatusOptions.filter(
    (status) =>
      [MaintenanceStatus.FILA, MaintenanceStatus.MANUTENCAO].includes(
        status.value
      )
  );

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={handleOpenChange}>
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
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <SelectField
                name="fleetId"
                options={fleetOptions}
                label="Frota"
                placeholder="Selecione uma frota..."
                isLoading={isFleetsLoading}
                isFiltered
                required
              />
              <SelectField
                name="typeOfMaintenance"
                options={typeOfMaintenanceOptions}
                label="Plano de Manutenção"
                placeholder="Selecione tipo manutenção..."
                required
              />
            </div>
            <div className="flex gap-3">
              <SelectField
                name="severityLevel"
                options={severityOptions}
                label="Nivel de Severidade"
                placeholder="Escolha..."
                required
              />
              <SelectField
                name="status"
                options={availableStatusesForCreation}
                label="Status"
                placeholder="Selecione status..."
                className="w-full"
                required
              />
              {statusWatcher === MaintenanceStatus.FILA && (
                <DateTimeField name="entryQueue" label="Entrada Fila" />
                // <InputField
                //   name="entryQueue"
                //   type="datetime-local"
                //   label="Entrada Fila"
                //   placeholder="Selecione nivel severidade..."
                //   className="w-full"
                // />
              )}
            </div>
            {statusWatcher === MaintenanceStatus.MANUTENCAO && (
              <div className="flex gap-3">
                <InputField
                  name="entryMaintenance"
                  type="datetime-local"
                  label="Entrada Manutenção"
                  placeholder="Selecione nivel severidade..."
                  className="w-full"
                />
                <SelectField
                  name="boxId"
                  options={boxOptions}
                  label="Box"
                  placeholder="Selecione o Box..."
                  className="w-full"
                  isLoading={isBoxesLoading}
                  isFiltered
                />
              </div>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={isPending || !canSubmit}
              isLoading={isPending}
            >
              Criar Ordem de Serviço
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
