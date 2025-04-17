import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IApiResponse } from "@/shared/services/api";
import { useState } from "react";
import { ChecklistService } from "@/shared/services/checklist/checklist";
import { ChecklistItemService } from "@/shared/services/checklist/checklist-item";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import {
  IChecklist,
  ICreateChecklist,
} from "@/shared/types/checklist/checklist";
import { useLoader } from "@/store/hook/use-loader";
import {
  IChecklistItem,
  ICreateChecklisItemBatch,
} from "@/shared/types/checklist/checklist-item";

const startChecklistSchema = z.object({
  workOrderId: z.string().min(1, "ID da ordem de serviço é obrigatório"),
  templateId: z.string().min(1, "ID do template é obrigatório"),
});

export type UseStartChecklistReturn = {
  startChecklistForm: UseFormReturn<StartChecklistData>;
  handleSubmit: () => void;
  isSubmitting: boolean;
  startedChecklist: IChecklist | null;
  control: any;
  isStartChecklistLoading: boolean;
  isCreateBatchLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: IApiResponse<IChecklist> | undefined;
  batchData: IApiResponse<IChecklistItem[]> | undefined;
  reset: () => void;
  isStartChecklistSuccess: boolean;
  isCreateItemsBatchLoading: boolean;
  isCreateBatchSuccess: boolean;
  isStartChecklistOpen: boolean;
  setIsStartChecklistOpen: (isOpen: boolean) => void;
};

type StartChecklistData = z.infer<typeof startChecklistSchema>;

export function useStartChecklist(
  toast: (toast: any) => void,
  onHandleClose?: VoidFunction,
  onSuccessCallback?: () => VoidFunction
): UseStartChecklistReturn {
  const [isStartChecklistOpen, setIsStartChecklistOpen] =
    useState<boolean>(false);
  const [startedChecklist, setStartedChecklist] = useState<IChecklist | null>(
    null
  );
  const queryClient = useQueryClient();

  const defaultValues: StartChecklistData = {
    workOrderId: "",
    templateId: "",
  };

  const loader = useLoader();

  const startChecklistForm = useForm<StartChecklistData>({
    resolver: zodResolver(startChecklistSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = startChecklistForm;

  const createBatchMutation = useMutation<
    IApiResponse<IChecklistItem[]>,
    Error,
    ICreateChecklisItemBatch
  >({
    mutationFn: ChecklistItemService.createBatch,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeysEnum.ChecklistItem],
      });
      toast({
        type: "success",
        title: "Sucesso!",
        message: `Itens do checklist criados com sucesso.`,
        duration: 4000,
      });
    },
    onError: (error) => {
      console.error("Error in createBatch:", error);
      toast({
        type: "error",
        title: "Ops, algo deu errado!",
        message: "Ocorreu um erro ao criar os itens do checklist.",
        duration: 5000,
      });

      onHandleClose && onHandleClose();
    },
    onSettled: () => {
      loader.hide();
    },
  });

  const startChecklistMutation = useMutation<
    IApiResponse<IChecklist>,
    Error,
    ICreateChecklist
  >({
    mutationFn: ChecklistService.create,
    onSuccess: async (response) => {
      if (response.success && response.data) {
        queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Checklist] });
        toast({
          type: "success",
          title: "Sucesso!",
          message: `Checklist iniciado com sucesso.`,
          duration: 4000,
        });
        setStartedChecklist(response.data);
        setIsStartChecklistOpen(false);
        reset();

        loader.show({
          message: "Criando os items do seu checklist",
          variant: "dots",
          scope: "local",
          isTransparentBg: false,
        });

        createBatchMutation.mutate({
          checklistId: response.data.id,
          templateId: response.data.templateId,
        });

        if (onSuccessCallback) {
          onSuccessCallback();
        }
      }
    },
    onError: (error) => {
      console.error("Error in startChecklist:", error);
      toast({
        type: "error",
        title: "Ops, algo deu errado!",
        message: error.message || "Ocorreu um erro ao iniciar o checklist.",
        duration: 5000,
      });
      setIsStartChecklistOpen(false);
    },
    onSettled: () => {
      loader.hide();
    },
  });

  const submitStartChecklistData = (data: StartChecklistData) => {
    startChecklistMutation.mutate(data);
    loader.show({
      message: "Iniciando seu checklist...",
      variant: "dots",
      scope: "local",
      isTransparentBg: false,
    });
  };

  return {
    startChecklistForm,
    handleSubmit: handleSubmit(submitStartChecklistData),
    startedChecklist,
    control,
    isSubmitting,
    isCreateItemsBatchLoading: createBatchMutation.isPending,
    isStartChecklistLoading: startChecklistMutation.isPending,
    isCreateBatchLoading: createBatchMutation.isPending,
    isError: startChecklistMutation.isError || createBatchMutation.isError,
    error: startChecklistMutation.error || createBatchMutation.error,
    data: startChecklistMutation.data,
    batchData: createBatchMutation.data,
    reset,
    isStartChecklistSuccess: startChecklistMutation.isSuccess,
    isCreateBatchSuccess: createBatchMutation.isSuccess,
    isStartChecklistOpen,
    setIsStartChecklistOpen,
  };
}
