import {
  Car,
  Palette,
  Gauge,
  Calendar,
  Hash,
  BadgeCheck,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFleet } from "@/app/fleet/hooks/use-fleet";
import {
  MultiStepForm,
  MultiStepFormConfig,
} from "@/components/multi-step-form";
import {
  vehicleFieldConfigs,
  VehicleFormData,
  vehicleFormsteps,
} from "../../data/form";
import { useCreateVehicle } from "../../hooks/use-create-vehicle";

export default function VehicleCreationDialog() {
  const { handleSubmit, isSubmitting, isPending, isSuccess, resetForm } =
    useCreateVehicle();
  const { data: fleetsData, isLoading } = useFleet();

  const vehicleFieldConfigsCopy = [...vehicleFieldConfigs];

  // Atualizar as opções de frota dinamicamente
  const fleetFieldConfig = vehicleFieldConfigsCopy.find(
    (field) => field.name === "fleetId"
  );
  if (fleetFieldConfig) {
    fleetFieldConfig.options =
      fleetsData?.fleets.map((fleet) => ({
        value: fleet.id,
        label: fleet.fleetNumber,
      })) || [];
    fleetFieldConfig.customComponent = isLoading ? (
      <div>Carregando frotas...</div>
    ) : undefined;
  }

  // Componente de sucesso personalizado
  const SuccessComponent = (data: VehicleFormData) => (
    <Card className="border-dashed bg-muted/30 overflow-hidden">
      <div className="absolute top-0 right-0 bg-gradient-to-bl from-green-100 to-transparent w-32 h-32 rounded-bl-full opacity-50" />
      <CardContent className="p-6 relative">
        <div className="absolute top-2 right-2">
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 font-medium"
          >
            Ativo
          </Badge>
        </div>
        <h4 className="font-medium text-sm text-muted-foreground mb-4">
          Detalhes do Veículo
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Hash className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Placa</p>
            </div>
            <p className="font-medium uppercase text-base">
              {data.plate || "—"}
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Car className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Modelo</p>
            </div>
            <p className="font-medium text-base">{data.model || "—"}</p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <BadgeCheck className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Marca</p>
            </div>
            <p className="font-medium text-base">{data.brand || "—"}</p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Ano</p>
            </div>
            <p className="font-medium text-base">{data.year || "—"}</p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Palette className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Cor</p>
            </div>
            <p className="font-medium text-base">{data.color || "—"}</p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Gauge className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Quilometragem</p>
            </div>
            <p className="font-medium text-base">{data.km || "0"} km</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const formConfig: MultiStepFormConfig<VehicleFormData> = {
    steps: vehicleFormsteps,
    onSubmit: handleSubmit,
    defaultValues: {
      plate: "",
      model: "",
      brand: "",
      year: "",
      color: null,
      km: 0,
      power: 0,
      fleetId: null,
      isActive: true,
    },
    submitButtonText: "Cadastrar Veículo",
    cancelButtonText: "Cancelar",
    nextButtonText: "Próximo",
    backButtonText: "Voltar",
    successTitle: "Veículo Cadastrado com Sucesso!",
    successDescription:
      "O veículo foi adicionado ao sistema e já está disponível para uso",
    successComponent: SuccessComponent,
  };

  return (
    <MultiStepForm
      config={formConfig}
      isSubmitting={isSubmitting || isPending}
      isSuccess={isSuccess}
      onCancel={() => resetForm()}
      triggerComponent={
        <Button className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md">
          <Plus className="h-4 w-4" />
          Cadastrar Novo Veículo
        </Button>
      }
    />
  );
}
