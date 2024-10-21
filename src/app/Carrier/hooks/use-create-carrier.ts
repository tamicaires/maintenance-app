import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { createCarrierSchema } from "@/validations/create-carrier";
import { queryClient } from "@/services/query-client";
import { CarrierService } from "@/services/carrier";
import { ICarrier } from "@/interfaces/carrier";
import { toast } from "sonner";
import { IApiResponse } from "@/services/api";

type CreateCarrierData = z.infer<typeof createCarrierSchema>;

export function useCreateCarrier(setShowModal: (show: boolean) => void) {
  const defaultValues = {
    carrierName: "",
    managerName: "",
    managerPhone: "",
    isActive: true,
  };

  const createCarrierForm = useForm<CreateCarrierData>({
    resolver: zodResolver(createCarrierSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = createCarrierForm;

  const {
    mutate: mutateCreate,
    isSuccess,
    isError,
    data,
    error,
  } = useMutation<IApiResponse<ICarrier>, Error, CreateCarrierData>({
    mutationFn: CarrierService.create,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["carriers"] });
      if (response.success && response.data) {
        console.log("Carrier created:", response.data);
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
      toast.error(error.message || "Ocorreu um erro ao criar a transportadora.");
    },
  });

  const submitCarrierData = (carrier: CreateCarrierData) => {
    mutateCreate(carrier);
    reset();
  };

  useEffect(() => {
    if (isSuccess) {
      setShowModal(false);
    }
  }, [isSuccess]);

  return {
    createCarrierForm,
    handleSubmit: handleSubmit(submitCarrierData),
    isSubmitting,
    isError,
    error,
    data,
  };
}
