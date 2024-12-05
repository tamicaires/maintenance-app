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
import {
  Loader2,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CustomDialogHeader } from "@/components/CustomDialogHeader";
import { Select as CustomSelect } from "@/components/CustomCombobox/index";
import { useService } from "@/app/Services/hooks/use-service";
import { useEmployee } from "@/app/Employee/hooks/use-employee";
import { dateUtil } from "@/utils/date";
import { cn } from "@/lib/utils";
import {
  ServiceAssigmentStatus,
  TServiceAssigmentStatus,
} from "@/shared/enums/service-assigment";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/Toast/toast";
import { useTrailer } from "@/app/Trailer/hooks/use-trailer";
import { useCreateServiceAssignment } from "../../hooks/use-create-service-assigment";

export function ServiceAssignmentCreationDialog({
  workOrderId,
}: {
  workOrderId: string;
}) {
  const { ToastComponent, addToast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    createServiceAssignmentForm,
    handleSubmit,
    isSubmitting,
    isLoading,
    isError,
    error,
    reset,
  } = useCreateServiceAssignment(setIsDialogOpen, workOrderId, addToast);

  const { data: services, isLoading: isServicesLoading } = useService();
  const { data: employees, isLoading: isEmployeesLoading } = useEmployee();
  const { data: trailers, isLoading: isTrailerLoading } = useTrailer();

  const { control, watch } = createServiceAssignmentForm;
  const status = watch("status");

  const handleOpenChange = (newOpen: boolean) => {
    setIsDialogOpen(newOpen);
    if (!newOpen) {
      reset();
    }
  };

  const serviceOptions =
    services?.data?.map((service) => ({
      value: service.id,
      label: service.serviceName,
      description: service.serviceCategory,
    })) || [];

  const employeeOptions =
    employees?.data?.map((employee) => ({
      value: employee.id,
      label: employee.name,
      description: employee.jobTitle,
    })) || [];

  const trailersOptions =
    trailers?.data?.map((trailer) => ({
      value: trailer.id,
      label: trailer.plate,
      description: trailer.position,
    })) || [];

  const statusOptions: {
    value: TServiceAssigmentStatus;
    label: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      value: ServiceAssigmentStatus.PENDING,
      label: "Pendente",
      icon: <AlertTriangle className="w-4 h-4" />,
      color: "yellow",
    },
    {
      value: ServiceAssigmentStatus.IN_PROGRESS,
      label: "Em Progresso",
      icon: <Clock className="w-4 h-4" />,
      color: "blue",
    },
    {
      value: ServiceAssigmentStatus.COMPLETED,
      label: "Concluído",
      icon: <CheckCircle2 className="w-4 h-4" />,
      color: "green",
    },
  ];
  console.log("trailer", trailersOptions);
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Adicionar Serviço
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <CustomDialogHeader
            title="Adicionar Serviço"
            subtitle="Preencha os campos abaixo para criar uma nova atribuição de serviço"
          />
          <Form {...createServiceAssignmentForm}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex gap-3 w-full">
                <FormField
                  control={control}
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
                  control={control}
                  name="trailerId"
                  render={({ field }) => (
                    <FormItem className="w-2/5">
                      <FormLabel>Reboque</FormLabel>
                      <FormControl>
                        <CustomSelect
                          options={trailersOptions}
                          placeholder="Escolha um Reboque"
                          emptyText="Nenhum reboque encontrado"
                          onChange={field.onChange}
                          isLoading={isTrailerLoading}
                          isFiltered={true}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <div className="flex space-x-2">
                        {statusOptions.map((option) => (
                          <TooltipProvider key={option.value}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  variant={
                                    field.value === option.value
                                      ? "default"
                                      : "outline"
                                  }
                                  className={cn(
                                    "flex-1",
                                    field.value === option.value &&
                                      `bg-${option.color}-500 bg-opacity-20 hover:bg-opacity-20 text-${option.color}-600 hover:bg-${option.color}-600`
                                  )}
                                  onClick={() => field.onChange(option.value)}
                                >
                                  {option.icon}
                                  <span className="ml-2">{option.label}</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{option.label}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <AnimatePresence>
                {status !== ServiceAssigmentStatus.PENDING && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={control}
                        name="startAt"
                        render={({ field: { onChange, value } }) => (
                          <FormItem>
                            <FormLabel>Data e Hora de Início</FormLabel>
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

                      {status === ServiceAssigmentStatus.COMPLETED && (
                        <FormField
                          control={control}
                          name="endAt"
                          render={({ field: { onChange, value } }) => (
                            <FormItem>
                              <FormLabel>Data e Hora de Término</FormLabel>
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
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <FormField
                control={control}
                name="workOrderId"
                render={({ field }) => <input type="hidden" {...field} />}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adicionar Serviço...
                  </>
                ) : (
                  "Adicionando Serviço"
                )}
              </Button>
            </form>
          </Form>
          {isError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-500 mt-2"
            >
              Erro: {error?.message}
            </motion.p>
          )}
        </DialogContent>
      </Dialog>
      <ToastComponent />
    </>
  );
}
