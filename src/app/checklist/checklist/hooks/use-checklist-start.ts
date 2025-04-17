import { useToast } from "@/hooks/use-toast";
import { useWizard } from "@/hooks/use-wizard";
// import useWizard from "@/hooks/use-wizard";
import { QueryKeysEnum } from "@/shared/enums/query-keys";
import { IApiResponse } from "@/shared/services/api";
import { ChecklistService } from "@/shared/services/checklist/checklist";
import { queryClient } from "@/shared/services/query-client";
import { IChecklist } from "@/shared/types/checklist";
import { ICreateChecklist } from "@/shared/types/checklist/checklist";
// import { startChecklistSchema } from "@/validations/start-checklist";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { startChecklistSteps } from "../data/steps";
import { startChecklistDefaultValues, StartChecklistSchema, startChecklistSchema } from "../forms/create-checklist-form";
import { useMutation } from "@/core/api/hooks/use-mutation";
import { checklistService } from "@/shared/services/checklist/checklist-service";

// export type ChecklistStepType = "template" | "workOrder" | "items";
// type StartChecklistData = z.infer<typeof startChecklistSchema>;

type StartChecklistProps = {
  workOrderId?: string;
}

export const useChecklistStart = ({ workOrderId: initialWorkOrderId }: StartChecklistProps) => {
  const [startedChecklist, setStartedChecklist] = useState<IChecklist | null>(null);

  const {
    currentStepName,
    goToStepByName,
  } = useWizard(startChecklistSteps);

  const form = useForm({
    resolver: zodResolver(startChecklistSchema),
    defaultValues: {
      ...startChecklistDefaultValues,
      workOrderId: initialWorkOrderId || "",
    }
  })

  const values = form.watch();

  const { mutate: startChecklist, isPending } = useMutation(
    (data: StartChecklistSchema) => checklistService.create(data), {
    successMessage: "Checklist iniciado com sucesso.",
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Checklist] })
      setStartedChecklist(response);
      handleClose()
    }
  });

  const handleSubmit = form.handleSubmit(
    (data) => {
      startChecklist(data)
    }
  )

  const handleTemplateSelect = (templateId: string) => {
    if (initialWorkOrderId) {
      form.setValue("templateId", templateId);
      form.setValue("workOrderId", initialWorkOrderId);
      handleSubmit();
    } else {
      form.setValue("templateId", templateId);
      goToStepByName("workOrder")
    }
  };

  const handleWorkOrderSelect = (workOrderId: string) => {
    form.setValue("workOrderId", workOrderId);
    handleSubmit();
  };

  const handleClose = () => {
    form.reset()
  }

  const canSubmit = useMemo(() => {
    return startChecklistSchema.safeParse(values).success;
  }, [values])

  return {
    form,
    handleSubmit,
    isPending,
    canSubmit,
    handleTemplateSelect,
    handleWorkOrderSelect,
    currentStepName,
    startedChecklist
  };
  // const { toast } = useToast();
  // const [isStartDialogOpen, setIsStartDialogOpen] = useState<boolean>(isOpen);
  // const [step, setStep] = useState<ChecklistStepType>("template");
  // const [seletecTemplateId, setSeletecTemplateId] = useState<string>("");
  // const [selectedOrderId, setSelectedOrderId] = useState<string>(
  //   initialWorkOrderId || ""
  // );
  // const [isItemsDialogOpen, setItemsDialogOpen] = useState<boolean>(false);
  // const [startedChecklist, setStartedChecklist] = useState<IChecklist | null>(null);


  // const defaultValues: StartChecklistData = {
  //   templateId: "",
  //   workOrderId: ""
  // }

  // const startChecklistForm = useForm<StartChecklistData>({
  //   resolver: zodResolver(startChecklistSchema),
  //   defaultValues
  // });
  // console.log("selectedOrderId", selectedOrderId)
  // console.log("seletecTemplateId", seletecTemplateId)
  // console.log("seletecTemplateId", seletecTemplateId)
  // const startChecklistMutation = useMutation<
  //   IApiResponse<IChecklist>,
  //   Error,
  //   ICreateChecklist
  // >({
  //   mutationFn: ChecklistService.create,
  //   onSuccess: async (response) => {
  //     if (response.success && response.data) {
  //       handleSuccess(response.data);
  //     }
  //   },
  //   onError: (error) => {
  //     handleError(error);
  //   },
  //   onSettled: () => {
  //   },
  // });

  // const handleTemplateSelect = (templateId: string) => {
  //   setSeletecTemplateId(templateId);
  //   setStep("workOrder");
  //   if (initialWorkOrderId) {
  //     startChecklistForm.setValue("templateId", templateId);
  //     startChecklistForm.setValue("workOrderId", initialWorkOrderId);
  //     // handleSubmit();
  //     setStep("items");
  //   } else {
  //     setStep("workOrder");
  //   }
  // };

  // const handleSuccess = (data: IChecklist) => {
  //   setStartedChecklist(data);
  //   queryClient.invalidateQueries({
  //     queryKey: [QueryKeysEnum.ChecklistItem],
  //   });
  //   setIsStartDialogOpen(false);
  //   setItemsDialogOpen(true);
  //   toast({
  //     title: "Sucesso!",
  //     description: `Checklist iniciado com sucesso.`,
  //     variant: "success",
  //   })
  //   resetComponent("items");
  // }

  // const handleError = (error: Error) => {
  //   setIsStartDialogOpen(false);
  //   toast({
  //     title: "Erro!",
  //     description: error.message || `Ocorreu um erro ao iniciar o checklist.`,
  //     variant: "destructive",
  //   })
  //   startChecklistForm.reset();
  // }
  // const resetComponent = (step?: ChecklistStepType) => {
  //   startChecklistForm.reset();
  //   setStep(step ? step : "template");
  //   setIsStartDialogOpen(false);
  // }
  // console.log("checkerror", startChecklistForm.formState.errors)
  // const submitStartChecklistData = (data: StartChecklistData) => {
  //   startChecklistMutation.mutate(data);
  // };
  // return {
  //   handleSubmit: startChecklistForm.handleSubmit(submitStartChecklistData),
  //   startChecklistForm,
  //   isPending: startChecklistMutation.isPending,
  //   isStartDialogOpen,
  //   setIsStartDialogOpen,
  //   seletecTemplateId,
  //   setSeletecTemplateId,
  //   selectedOrderId,
  //   setSelectedOrderId,
  //   currentStep: step,
  //   setStep,
  //   isItemsDialogOpen,
  //   setItemsDialogOpen,
  //   startedChecklist,
  //   setStartedChecklist,
  //   resetComponent
  // }
}