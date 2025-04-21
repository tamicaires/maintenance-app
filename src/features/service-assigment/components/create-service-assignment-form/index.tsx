import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Wrench } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CustomDialogHeader } from "@/components/CustomDialogHeader";
import {
  Select as CustomSelect,
  IOption,
} from "@/components/custom-combobox/index";
import { useService } from "@/features/service/hooks/use-service";
import { ServiceAssigmentStatus } from "@/shared/enums/service-assigment";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/Toast/toast";
import { useCreateServiceAssignment } from "../../hooks/use-create-service-assigment";
import { IActiveTrailer } from "@/shared/types/trailer.interface";
import { DateTimePicker } from "@/components/date-time-picker/date-time-picker";
import { IService, IServiceWithCount } from "@/shared/types/service.interface";
import { getDataOrDefault } from "@/utils/data";

type ServiceAssignmentCreationDialogProps = {
  workOrderId: string;
  trailers: IActiveTrailer[];
  isDisabled?: boolean;
  iconButton?: boolean;
};

export function ServiceAssignmentCreationDialog({
  workOrderId,
  trailers,
  isDisabled,
  iconButton,
}: ServiceAssignmentCreationDialogProps) {
  // const { ToastComponent, toast: addToast } = useToast();
  // const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    form,
    handleSubmit,
    isPending,
    statusWatcher,
    trailerIdWatcher,
    canSubmit,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
  } = useCreateServiceAssignment(workOrderId);

  const { data: services, isLoading: isServicesLoading } = useService();
  const servicesData: IServiceWithCount = useMemo(
    () => ({
      services: getDataOrDefault<IService[]>(services, [], "services"),
      totalCount: getDataOrDefault<number>(services, 0, "totalCount"),
    }),
    [services]
  );
  // const { control, watch } = createServiceAssignmentForm;
  // const status = watch("status");
  // const selectedTrailerId = watch("trailerId");

  const handleOpenChange = (newOpen: boolean) => {
    setIsCreateDialogOpen(newOpen);
    // if (!newOpen) {
    //   reset();
    // }
  };

  const serviceOptions =
    servicesData.services.map((service) => ({
      value: service.id,
      label: service.serviceName,
      description: service.serviceCategory,
    })) || [];

  const trailersOptions: IOption[] =
    trailers.map((trailer) => ({
      value: trailer.id,
      label: trailer.plate,
      description: `SR${trailer.position?.toString()}` || "",
    })) || [];

  const statusOptions: IOption[] = [
    {
      value: ServiceAssigmentStatus.PENDING,
      label: "Pendente",
      description: "",
    },
    {
      value: ServiceAssigmentStatus.IN_PROGRESS,
      label: "Em Progresso",
      description: "",
    },
  ];

  const axleOptions: IOption[] = useMemo(() => {
    const selectedTrailer = trailers.find(
      (trailer) => trailer.id === trailerIdWatcher
    );
    if (!selectedTrailer) return [];

    return selectedTrailer.axles.map((axle) => ({
      value: axle.id,
      label: `Eixo ${axle.position}`,
    }));
  }, [trailerIdWatcher, trailers]);

  return (
    <>
      <Dialog open={isCreateDialogOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button disabled={isDisabled}>
            {iconButton ? (
              <Wrench className="h-4 w-4" />
            ) : (
              <div className="flex gap-1 items-center">
                <Wrench className="mr-2 h-4 w-4" /> Adicionar Serviço
              </div>
            )}
            {/* <Wrench className="mr-2 h-4 w-4" /> Adicionar Serviço */}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <CustomDialogHeader
            title="Adicionar Serviço"
            subtitle="Preencha os campos abaixo para criar uma nova atribuição de serviço"
          />
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex gap-3 w-full">
                <FormField
                  control={form.control}
                  name="serviceId"
                  render={({ field }) => (
                    <FormItem className="w-3/5">
                      <FormLabel>Serviço</FormLabel>
                      <FormControl>
                        <CustomSelect
                          options={serviceOptions}
                          placeholder="Selecione um serviço"
                          emptyText="Nenhum serviço encontrado"
                          onChange={field.onChange}
                          isLoading={isServicesLoading}
                          isFiltered={true}
                          value={field.value || undefined}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="w-2/5">
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <CustomSelect
                          options={statusOptions}
                          placeholder="Selecione o status"
                          emptyText="Nenhum status encontrado"
                          onChange={field.onChange}
                          isFiltered={true}
                          value={field.value || undefined}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-3 w-full">
                <FormField
                  control={form.control}
                  name="trailerId"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Reboque</FormLabel>
                      <FormControl>
                        <CustomSelect
                          options={trailersOptions}
                          placeholder="Escolha um Reboque"
                          emptyText="Nenhum reboque encontrado"
                          onChange={field.onChange}
                          isFiltered={true}
                          value={field.value || undefined}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="axleId"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Eixo</FormLabel>
                      <FormControl>
                        <CustomSelect
                          options={axleOptions}
                          placeholder="Escolha um Eixo"
                          emptyText="Nenhum eixo encontrado"
                          onChange={field.onChange}
                          isFiltered={true}
                          value={field.value || undefined}
                          disabled={!trailerIdWatcher}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <AnimatePresence>
                {statusWatcher === ServiceAssigmentStatus.IN_PROGRESS && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="startAt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data e Hora de Início</FormLabel>
                            <FormControl>
                              <DateTimePicker
                                value={field.value}
                                onChange={(date) => {
                                  field.onChange(date);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <FormField
                control={form.control}
                name="workOrderId"
                render={({ field }) => <input type="hidden" {...field} />}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isPending || !canSubmit}
                isLoading={isPending}
              >
                Adicionar Serviço
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
