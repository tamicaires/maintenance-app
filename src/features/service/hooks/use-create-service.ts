import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { queryClient } from "@/shared/services/query-client";
import { IApiResponse } from "@/shared/services/api";
import {
  IService,
  IServiceCreateAndUpdate,
} from "@/shared/types/service.interface";

import { ServicesService } from "@/shared/services/service";
import {
  CreateServiceData,
  createServiceSchema,
} from "@/validations/service-validations";
import { QueryKeysEnum } from "@/shared/enums/query-keys";


export function useCreateService() {
  const [isCreateServiceOpen, setIsCreateServiceOpen] = useState(false);

  const defaultValues: CreateServiceData = {
    serviceName: "",
    serviceCategory: "",
    weight: 0.5
  };

  const createServiceForm = useForm<CreateServiceData>({
    resolver: zodResolver(createServiceSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = createServiceForm;

  const { mutate, isPending } = useMutation<
    IApiResponse<IService>,
    Error,
    IServiceCreateAndUpdate
  >({
    mutationFn: ServicesService.create,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Service] });
      if (response.success && response.data) {
        toast.success("Serviço criado com sucesso!");
        resetForm()
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
      toast.error(error.message || "Ocorreu um erro ao criar o serviço.");
    },
  });

  const submitServiceData = (data: CreateServiceData) => {
    mutate(data);
  };

  const resetForm = () => {
    reset();
  };

  return {
    createServiceForm,
    handleSubmit: handleSubmit(submitServiceData),
    isSubmitting,
    isPending,
    resetForm,
    isCreateServiceOpen,
    setIsCreateServiceOpen
  };
}

export type FormFields = keyof CreateServiceData;
