// import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { queryClient } from "@/shared/services/query-client";
import { PartRequestService } from "@/shared/services/part-request";
import { toast } from "sonner";
import { IApiResponse } from "@/shared/services/api";
// import {
//   CreatePartRequestBatchData,
//   createPartRequestBatchSchema,
//   PartRequestItem,
// } from "@/validations/create-part-request-batch";
import { usePartRequestItems } from "@/features/part-request/hooks/use-handle-item";
import { createPartRequestBatchSchema, CreatePartRequestBatchSchema, PartRequestItem, createBatchPartRequestdefaultValues } from "../form/create-batch-part-request-form";
import { useMutation } from "@/core/api/hooks/use-mutation";
import { partRequestService } from "@/shared/services/part-request-service/part-request";
import { QueryKeysEnum } from "@/shared/enums/query-keys";

export function useCreatePartRequestBatch() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const partRequestItemHandler = usePartRequestItems();

  const form = useForm<CreatePartRequestBatchSchema>({
    resolver: zodResolver(createPartRequestBatchSchema),
    defaultValues: createBatchPartRequestdefaultValues,
  });

  const values = form.watch();

  const { mutate: createPartRequestBatch, isPending } = useMutation(
    (data: CreatePartRequestBatchSchema) => partRequestService.createBatch(data), {
    successMessage: "Peça criada com sucesso!",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Part] })
      handleClose()
    }
  });

  const handleSubmit = form.handleSubmit(
    (data) => {
      createPartRequestBatch(data)
    }
  )

  const handleClose = () => {
    setIsCreateDialogOpen(false)
    form.reset()
  }

  const handleAddItem = (newItem: PartRequestItem) => {
    partRequestItemHandler.addItem(newItem);
  };

  const handleRemoveItem = (index: number) => {
    partRequestItemHandler.removeItem(index);
  };

  const handleCreateRequest = (batchData: CreatePartRequestBatchSchema) => {
    if (batchData.batchData.length === 0) {
      toast.error("Adicione pelo menos um item à solicitação.");
      return;
    }
    createPartRequestBatch(batchData);

  };

  const totalItems = partRequestItemHandler.getItems().reduce((acc, item) => acc + (item.quantity || 0), 0);

  const canSubmit = useMemo(() => {
    return createPartRequestBatchSchema.safeParse(values).success;
  }, [values])


  return {
    form,
    handleSubmit,
    isPending,
    canSubmit,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    handleAddItem,
    handleRemoveItem,
    handleCreateRequest,
    totalItems
  };
  // const {
  //   handleSubmit,
  //   reset,
  //   control,
  //   formState: { isSubmitting },
  // } = form;

  // const { mutate: mutateCreateBatch } = useMutation<IApiResponse<any>, Error, CreatePartRequestBatchData>({
  //   mutationFn: PartRequestService.createBatch,
  //   onSuccess: (response) => {
  //     setIsLoading(true)
  //     queryClient.invalidateQueries({ queryKey: ["part-requests"] });
  //     if (response.success) {
  //       toast.success("Solicitação de peças criada com sucesso!");
  //       reset(defaultValues);
  //       partRequestItemHandler.clearItems();
  //       setIsOpen(false);
  //       setIsLoading(false)
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Error in mutation:", error);
  //     toast.error(error.message || "Ocorreu um erro ao criar as solicitações de peças. Por favor, tente novamente.");
  //   },
  // });

  // const handleAddItem = (newItem: PartRequestItem) => {
  //   partRequestItemHandler.addItem(newItem);
  // };

  // const handleRemoveItem = (index: number) => {
  //   partRequestItemHandler.removeItem(index);
  // };

  // const handleCreateRequest = (batchData: CreatePartRequestBatchSchema) => {
  //   if (batchData.batchData.length === 0) {
  //     toast.error("Adicione pelo menos um item à solicitação.");
  //     return;
  //   }
  //   createPartRequestBatch(batchData);

  // };

  // const totalItems = partRequestItemHandler.getItems().reduce((acc, item) => acc + (item.quantity || 0), 0);

  // return {
  //   createPartRequestBatchForm: form,
  //   handleSubmit,
  //   isSubmitting,
  //   isOpen,
  //   setIsOpen,
  //   isLoading,
  //   setIsLoading,
  //   control,
  //   reset,
  //   totalItems,
  //   handleAddItem,
  //   handleRemoveItem,
  //   handleCreateRequest,
  // };
}
