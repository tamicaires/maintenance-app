import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { queryClient } from "@/services/query-client";
import { TrailerService } from "@/services/trailer";
import { IApiResponse } from "@/services/api";
import { ITrailer, ITrailerCreateAndUpdate } from "@/shared/types/trailer.interface";
import { z } from "zod";

const createTrailerSchema = z.object({
  plate: z.string().min(1, "Plate is required"),
  position: z.number().nullable(),
  isActive: z.boolean(),
  fleetId: z.string().nullable(),
});

export type CreateTrailerData = z.infer<typeof createTrailerSchema>;

export function useCreateTrailer() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const defaultValues: CreateTrailerData = {
    plate: "",
    position: null,
    isActive: true,
    fleetId: null,
  };

  const createTrailerForm = useForm<CreateTrailerData>({
    resolver: zodResolver(createTrailerSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = createTrailerForm;

  const mutation = useMutation<
    IApiResponse<ITrailer>,
    Error,
    ITrailerCreateAndUpdate
  >({
    mutationFn: TrailerService.create,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["trailers"] });
      if (response.success && response.data) {
        console.log("Trailer created:", response.data);
        toast.success("Trailer criado com sucesso!");
        setIsSuccess(true);
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
      toast.error(error.message || "Ocorreu um erro ao criar o trailer.");
    },
  });

  const submitTrailerData = (data: CreateTrailerData) => {
    mutation.mutate(data);
  };

  const resetForm = () => {
    reset();
    setIsSuccess(false);
  };

  return {
    createTrailerForm,
    handleSubmit: handleSubmit(submitTrailerData),
    isSubmitting,
    isSuccess,
    resetForm,
  };
}

export type FormFields = keyof CreateTrailerData;