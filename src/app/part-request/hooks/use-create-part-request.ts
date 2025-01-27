// import { useMutation } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
// import { queryClient } from "@/services/query-client";
// import { PartRequestService } from "@/services/part-request";
// import { toast } from "sonner";
// import { IApiResponse } from "@/services/api";
// import { CreatePartRequestData, createPartRequestSchema } from "@/validations/create-part-request";
// import { RequestStatus } from "@/shared/enums/part-request";
// import { ICreatePartRequest, IPartRequest } from "@/shared/types/part-request";

// export function useCreatePartRequest() {
//   const [step, setStep] = useState<number>(1);
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   const defaultValues: CreatePartRequestData = {
//     partId: "",
//     requestedForEmployeeId: null,
//     handledById: null,
//     quantity: 1,
//     approvedQuantity: null,
//     status: RequestStatus.PENDING,
//     isRejected: false,
//     axleId: null,
//     trailerId: "",
//     workOrderId: null,
//   };

//   const createPartRequestForm = useForm<CreatePartRequestData>({
//     resolver: zodResolver(createPartRequestSchema),
//     defaultValues,
//   });

//   const {
//     handleSubmit,
//     reset,
//     control,
//     formState: { isSubmitting },
//   } = createPartRequestForm;

//   const {
//     mutate: mutateCreate,
//     isSuccess,
//     isError,
//     isPending,
//     data,
//     error,
//   } = useMutation<IApiResponse<IPartRequest>, Error, ICreatePartRequest>({
//     mutationFn: PartRequestService.create,
//     onSuccess: (response) => {
//       queryClient.invalidateQueries({ queryKey: ["part-requests"] });
//       if (response.success && response.data) {
//         setStep(2);
//         toast.success("Solicitação de peça criada com sucesso!");
//       }
//     },
//     onError: (error) => {
//       console.error("Error in mutation:", error);
//       toast.error(error.message || "Ocorreu um erro ao criar a solicitação de peça.");
//     },
//   });

//   const submitPartRequestData = (data: CreatePartRequestData) => {
//     mutateCreate(data);
//     reset();
//   };

//   return {
//     createPartRequestForm,
//     handleSubmit: handleSubmit(submitPartRequestData),
//     isSubmitting,
//     isSuccess,
//     isError,
//     isPending,
//     error,
//     data,
//     isOpen,
//     setIsOpen,
//     control,
//     reset,
//     step,
//     setStep,
//   };
// }

// export type FormFields = keyof CreatePartRequestData;