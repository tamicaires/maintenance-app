import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { queryClient } from "@/shared/services/query-client";
import { BoxService } from "@/shared/services/box";
import { toast } from "sonner";
import { IApiResponse } from "@/shared/services/api";
import { IBox, IBoxCreateAndUpdate } from "@/shared/types/box";
import { CreateBoxData, createBoxSchema } from "@/validations/create-box";

export function useCreateBox() {
  const [step, setStep] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const defaultValues: CreateBoxData = {
    name: "",
    description: null,
    isActive: true,
  };

  const createBoxForm = useForm<CreateBoxData>({
    resolver: zodResolver(createBoxSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = createBoxForm;

  const {
    mutate: mutateCreate,
    isSuccess,
    isError,
    isPending,
    data,
    error,
  } = useMutation<IApiResponse<IBox>, Error, IBoxCreateAndUpdate>({
    mutationFn: BoxService.create,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
      if (response.success && response.data) {
        setStep(2);
        toast.success("Box criado com sucesso!");
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
      toast.error(error.message || "Ocorreu um erro ao criar o box.");
    },
  });

  const submitBoxData = (data: CreateBoxData) => {
    mutateCreate(data);
    reset();
  };

  return {
    createBoxForm,
    handleSubmit: handleSubmit(submitBoxData),
    isSubmitting,
    isSuccess,
    isError,
    isPending,
    error,
    data,
    open,
    setOpen,
    control,
    reset,
    step,
    setStep,
  };
}

export type FormFields = keyof CreateBoxData;