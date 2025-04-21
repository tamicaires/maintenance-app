// import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { queryClient } from "@/shared/services/query-client";
import { PartService } from "@/shared/services/part";
import { toast } from "sonner";
import { IApiResponse } from "@/shared/services/api";
import { IPart, IPartCreateAndUpdate } from "@/shared/types/part";
import { z } from "zod";
import { PartLocation, PartStatus } from "@/shared/enums/part";
import { createPartDefaultValues, CreatePartSchema, createPartSchema } from "../form/create-part-form";
import { partService } from "@/shared/services/part-service/part";
import { useMutation } from "@/core/api/hooks/use-mutation";
import { QueryKeysEnum } from "@/shared/enums/query-keys";

// const createPartSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   description: z.string().nullable(),
//   partNumber: z.string().min(1, "Part number is required"),
//   serialNumber: z.string().min(1, "Serial number is required"),
//   model: z.string().nullable(),
//   brand: z.string().nullable(),
//   supplier: z.string().nullable(),
//   costPrice: z.number().min(0, "Cost price must be non-negative"),
//   sellingPrice: z.number().nullable(),
//   stockQuantity: z.number().int().min(0, "Stock quantity must be non-negative"),
//   location: z.nativeEnum(PartLocation),
//   status: z.nativeEnum(PartStatus),
//   categoryId: z.string().min(1, "Category is required"),
//   trailerId: z.string().nullable(),
//   axleId: z.string().nullable(),
// });

// export type CreatePartData = z.infer<typeof createPartSchema>;

export function useCreatePart() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(createPartSchema),
    defaultValues: createPartDefaultValues
  })
  const values = form.watch();
  const statusWatcher = values.status

  const { mutate: createOrder, isPending } = useMutation(
    (data: CreatePartSchema) => partService.create(data), {
    successMessage: "Peça criada com sucesso!",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.Part] })
      handleClose()
    }
  });

  const handleSubmit = form.handleSubmit(
    (data) => {
      createOrder(data)
    }
  )

  const handleClose = () => {
    setIsCreateDialogOpen(false)
    form.reset()
  }

  const canSubmit = useMemo(() => {
    return createPartSchema.safeParse(values).success;
  }, [values])

  return {
    form,
    handleSubmit,
    isPending,
    canSubmit,
    statusWatcher,
    isCreateDialogOpen,
    setIsCreateDialogOpen
  };
  // const [step, setStep] = useState<number>(1);
  // const [open, setOpen] = useState<boolean>(false);
  // const defaultValues: CreatePartData = {
  //   name: "",
  //   description: null,
  //   partNumber: "",
  //   serialNumber: "",
  //   model: null,
  //   brand: null,
  //   supplier: null,
  //   costPrice: 0,
  //   sellingPrice: null,
  //   stockQuantity: 0,
  //   location: PartLocation.ESTOQUE,
  //   status: PartStatus.NOVO,
  //   categoryId: "",
  //   trailerId: null,
  //   axleId: null,
  // };

  // const createPartForm = useForm<CreatePartData>({
  //   resolver: zodResolver(createPartSchema),
  //   defaultValues,
  // });

  // const {
  //   handleSubmit,
  //   reset,
  //   control,
  //   formState: { isSubmitting },
  // } = createPartForm;

  // const {
  //   mutate: mutateCreate,
  //   isSuccess,
  //   isError,
  //   isPending,
  //   data,
  //   error,
  // } = useMutation<IApiResponse<IPart>, Error, IPartCreateAndUpdate>({
  //   mutationFn: PartService.create,
  //   onSuccess: (response) => {
  //     queryClient.invalidateQueries({ queryKey: ["parts"] });
  //     if (response.success && response.data) {
  //       setStep(2);
  //       toast.success("Peça criada com sucesso!");
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Error in mutation:", error);
  //     toast.error(error.message || "Ocorreu um erro ao criar a peça.");
  //   },
  // });

  // const submitPartData = (data: CreatePartData) => {
  //   mutateCreate(data);
  //   reset();
  // };

  // return {
  //   createPartForm,
  //   handleSubmit: handleSubmit(submitPartData),
  //   isSubmitting,
  //   isSuccess,
  //   isError,
  //   isPending,
  //   error,
  //   data,
  //   open,
  //   setOpen,
  //   control,
  //   reset,
  //   step,
  //   setStep,
  // };
}

// export type FormFields = keyof CreatePartData;