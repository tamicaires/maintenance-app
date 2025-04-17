import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { queryClient } from "@/shared/services/query-client";
import { PartRequestService } from "@/shared/services/part-request";
import { toast } from "sonner";
import { IApiResponse } from "@/shared/services/api";
import {
  CreatePartRequestBatchData,
  createPartRequestBatchSchema,
  PartRequestItem,
} from "@/validations/create-part-request-batch";
import { usePartRequestItems } from "@/features/part-request/hooks/use-handle-item";

export function useCreatePartRequestBatch() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const partRequestItemHandler = usePartRequestItems();

  const defaultValues: CreatePartRequestBatchData = {
    batchData: [],
  };

  const createPartRequestBatchForm = useForm<CreatePartRequestBatchData>({
    resolver: zodResolver(createPartRequestBatchSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = createPartRequestBatchForm;

  const { mutate: mutateCreateBatch } = useMutation<IApiResponse<any>, Error, CreatePartRequestBatchData>({
    mutationFn: PartRequestService.createBatch,
    onSuccess: (response) => {
      setIsLoading(true)
      queryClient.invalidateQueries({ queryKey: ["part-requests"] });
      if (response.success) {
        toast.success("Solicitação de peças criada com sucesso!");
        reset(defaultValues);
        partRequestItemHandler.clearItems();
        setIsOpen(false);
        setIsLoading(false)
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
      toast.error(error.message || "Ocorreu um erro ao criar as solicitações de peças. Por favor, tente novamente.");
    },
  });

  const handleAddItem = (newItem: PartRequestItem) => {
    partRequestItemHandler.addItem(newItem);
  };

  const handleRemoveItem = (index: number) => {
    partRequestItemHandler.removeItem(index);
  };

  const handleCreateRequest = (batchData: CreatePartRequestBatchData) => {
    if (batchData.batchData.length === 0) {
      toast.error("Adicione pelo menos um item à solicitação.");
      return;
    }
    mutateCreateBatch(batchData);

  };

  const totalItems = partRequestItemHandler.getItems().reduce((acc, item) => acc + (item.quantity || 0), 0);

  return {
    createPartRequestBatchForm,
    handleSubmit,
    isSubmitting,
    isOpen,
    setIsOpen,
    isLoading,
    setIsLoading,
    control,
    reset,
    totalItems,
    handleAddItem,
    handleRemoveItem,
    handleCreateRequest,
  };
}
