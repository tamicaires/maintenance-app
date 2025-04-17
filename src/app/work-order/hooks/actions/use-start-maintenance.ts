// import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { queryClient } from "@/shared/services/query-client"
import { IApiResponse } from "@/shared/services/api"
import { MaintenanceStatus } from "@/shared/enums/work-order"
import { IStartMaintenance } from "@/shared/types/work-order.interface"
import { WorkOrderService } from "@/shared/services/work-order"
import { useEffect, useMemo, useState } from "react"
import { startMaintenanceDefaultValues, StartMaintenanceSchema, startMaintenanceSchema } from "../../form/start-maintenace-form"
import { workOrderService } from "@/shared/services/work-order-service/work-order"
import { QueryKeysEnum } from "@/shared/enums/query-keys"
import { useMutation } from "@/core/api/hooks/use-mutation"

// const startMaintenanceSchema = z.object({
//   status: z.nativeEnum(MaintenanceStatus, { errorMap: () => ({ message: "Status inválido" }) }),
//   entryMaintenance: z.date(),
//   boxId: z.string().min(1),
// })

// type MutationStatusMaintenance = {
//   workOrderId: string
//   data: IStartMaintenance
// }

// type StatusMaintenanceData = z.infer<typeof startMaintenanceSchema>

export function useStartMaintenance(workOrderId: string) {
  const [isStartMaintenanceOpen, setIsStartMaintenanceOpen] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(startMaintenanceSchema),
    defaultValues: startMaintenanceDefaultValues
  })
  const values = form.watch();

  const { mutate: startMaintenance, isPending } = useMutation(
    (data: StartMaintenanceSchema) => workOrderService.startMaintenance(workOrderId, data), {
    successMessage: "Manutenção inicializada com sucesso.",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Work_Order] })
      handleClose()
    }
  });

  const handleSubmit = form.handleSubmit(
    (data) => {
      startMaintenance(data)
    }
  )

  const handleClose = () => {
    setIsStartMaintenanceOpen(false)
    form.reset()
  }

  const canSubmit = useMemo(() => {
    return startMaintenanceSchema.safeParse(values).success;
  }, [values])

  return {
    form,
    handleSubmit,
    isPending,
    canSubmit,
    isStartMaintenanceOpen,
    setIsStartMaintenanceOpen
  };

  // const defaultValues: StatusMaintenanceData = {
  //   status: MaintenanceStatus.MANUTENCAO,
  //   entryMaintenance: new Date(),
  //   boxId: "",
  // }

  // const startMaintenanceForm = useForm<StatusMaintenanceData>({
  //   resolver: zodResolver(startMaintenanceSchema),
  //   defaultValues,
  // })

  // const {
  //   handleSubmit,
  //   reset,
  //   control,
  //   formState: { isSubmitting, isLoading },
  // } = startMaintenanceForm

  // const {
  //   mutate: mutateStartMaintenance,
  //   isSuccess,
  //   isError,
  //   isPending,
  //   data,
  //   error,
  // } = useMutation<IApiResponse<IStartMaintenance>, Error, MutationStatusMaintenance>({
  //   mutationFn: ({ workOrderId, data }) => WorkOrderService.startMaintenance(workOrderId, data),
  //   onSuccess: (response) => {
  //     queryClient.invalidateQueries({ queryKey: ["work-orders"] });
  //     if (response.success && response.data) {
  //       addToast({
  //         type: "success",
  //         title: "Sucesso!",
  //         message: `Manutenção iniciada com sucesso!`,
  //         duration: 4000,
  //       })
  //       reset()
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Error in mutation:", error)
  //     addToast({
  //       type: "error",
  //       title: "Ops, algo deu errado!",
  //       message: error.message || "Ocorreu um erro ao iniciar a manutenção.",
  //       duration: 5000,
  //     })
  //   },
  // })

  // const submitStartMaintenanceData = (data: StatusMaintenanceData) => {
  //   mutateStartMaintenance({ workOrderId, data })
  //   reset()
  // }

  // useEffect(() => {
  //   if (isSuccess) {
  //     setIsDialogOpen(false)
  //   }
  // }, [isSuccess, setIsDialogOpen])

  // return {
  //   startMaintenanceForm,
  //   handleSubmit: handleSubmit(submitStartMaintenanceData),
  //   isSubmitting,
  //   control,
  //   isLoading,
  //   isPending,
  //   isError,
  //   error,
  //   data,
  //   reset,
  // }
}

