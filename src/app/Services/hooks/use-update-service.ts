import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import {
  IService,
  IServiceCreateAndUpdate,
} from "@/shared/types/service.interface";
import { IApiResponse } from "@/shared/services/api";
import { ServicesService } from "@/shared/services/service";
import { queryClient } from "@/shared/services/query-client";

const serviceSchema = z.object({
  serviceName: z.string().min(1, "Nome do serviço é obrigatório"),
  serviceCategory: z.string().min(1, "Categoria do serviço é obrigatória"),
});

export type FormFields = z.infer<typeof serviceSchema>;

export function useUpdateService(onClose: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingService, setEditingService] = useState<IService | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      serviceName: "",
      serviceCategory: "",
    },
  });

  const updateMutation = useMutation<
    IApiResponse<IService>,
    Error,
    IServiceCreateAndUpdate
  >({
    mutationFn: (data: IServiceCreateAndUpdate) => {
      if (!editingService) throw new Error("No service selected for editing");
      return ServicesService.update(editingService.id, data);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      if (response.success && response.data) {
        console.log("Service updated:", response.data);
        setIsSuccess(true);
        toast.success("Serviço atualizado com sucesso!");
      }
    },
    onError: (error) => {
      console.error("Error updating service:", error);
      toast.error(
        error.message ||
          "Ocorreu um erro ao atualizar o serviço. Tente novamente."
      );
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const deleteMutation = useMutation<IApiResponse<void>, Error, string>({
    mutationFn: ServicesService.deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Serviço excluído com sucesso!");
    },
    onError: (error) => {
      console.error("Error deleting service:", error);
      toast.error(
        error.message ||
          "Ocorreu um erro ao excluir o serviço. Tente novamente."
      );
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log("Submitting form:", data);
    setIsSubmitting(true);
    if (editingService) {
      console.log("editingService:", editingService);
      const updateData: IServiceCreateAndUpdate = {
        serviceName: data.serviceName,
        serviceCategory: data.serviceCategory,
      };
      updateMutation.mutate(updateData);
    }
  });

  const handleEdit = (service: IService) => {
    console.log("Editing service:", service);
    setEditingService(service);
    form.reset({
      serviceName: service.serviceName,
      serviceCategory: service.serviceCategory,
    });
  };

  const handleDelete = (serviceId: string) => {
    deleteMutation.mutate(serviceId);
  };

  useEffect(() => {
    if (editingService) {
      form.reset({
        serviceName: editingService.serviceName,
        serviceCategory: editingService.serviceCategory,
      });
    }
  }, [editingService, form]);

  return {
    form,
    handleSubmit,
    errors: form.formState.errors,
    isSubmitting,
    handleEdit,
    handleDelete,
    onClose,
    editingService,
    setEditingService,
    isSuccess,
    setIsSuccess,
  };
}
