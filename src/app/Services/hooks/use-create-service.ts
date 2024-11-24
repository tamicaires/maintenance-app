import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { queryClient } from "@/services/query-client";
import { IApiResponse } from "@/services/api";
import {
  IService,
  IServiceCreateAndUpdate,
} from "@/shared/types/service.interface";

import { ServicesService } from "@/services/service";
import {
  CreateServiceData,
  createServiceSchema,
} from "@/validations/service-validations";

export function useCreateService() {
  const [isSuccess, setIsSuccess] = useState(false);

  const defaultValues: CreateServiceData = {
    serviceName: "",
    serviceCategory: "",
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

  const mutation = useMutation<
    IApiResponse<IService>,
    Error,
    IServiceCreateAndUpdate
  >({
    mutationFn: ServicesService.create,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      if (response.success && response.data) {
        console.log("Service created:", response.data);
        toast.success("Serviço criado com sucesso!");
        setIsSuccess(true);
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
      toast.error(error.message || "Ocorreu um erro ao criar o serviço.");
    },
  });

  const submitServiceData = (data: CreateServiceData) => {
    mutation.mutate(data);
  };

  const resetForm = () => {
    reset();
    setIsSuccess(false);
  };

  return {
    createServiceForm,
    handleSubmit: handleSubmit(submitServiceData),
    isSubmitting,
    isSuccess,
    resetForm,
  };
}

export type FormFields = keyof CreateServiceData;
