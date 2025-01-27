// import { useMutation } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect, useState } from "react";
// import { queryClient } from "@/services/query-client";
// import { z } from "zod";
// import { IApiResponse } from "@/services/api";
// import { createChecklistTemplateSchema } from "@/validations/create-checklist-template";
// import {
//   IChecklistTemplate,
//   ICreateChecklistTemplate,
// } from "@/shared/types/checklist";
// import { ChecklistTemplateService } from "@/services/checklist/checklist-template";

// type CreateChecklistTemplateData = z.infer<
//   typeof createChecklistTemplateSchema
// >;

// export function useCreateChecklistTemplate(
//   setIsDialogOpen: (open: boolean) => void,
//   addToast: (toast: any) => void
// ) {
//   const [createdItem, setCreatedItem] = useState()
//   const defaultValues: CreateChecklistTemplateData = {
//     name: "",
//     icon: undefined,
//   };

//   const createChecklistTemplateForm = useForm<CreateChecklistTemplateData>({
//     resolver: zodResolver(createChecklistTemplateSchema),
//     defaultValues,
//   });

//   const {
//     handleSubmit,
//     reset,
//     formState: { isSubmitting },
//   } = createChecklistTemplateForm;

//   const {
//     mutate: mutateCreate,
//     isSuccess,
//     isError,
//     data,
//     error,
//   } = useMutation<
//     IApiResponse<IChecklistTemplate>,
//     Error,
//     ICreateChecklistTemplate
//   >({
//     mutationFn: ChecklistTemplateService.create,
//     onSuccess: (response) => {
//       queryClient.invalidateQueries({ queryKey: ["checklist-templates"] });
//       if (response.success && response.data) {
//         addToast({
//           type: "success",
//           title: "Sucesso!",
//           message: "Template de checklist criado com sucesso!",
//           duration: 5000,
//         });
//       }
//     },
//     onError: (error) => {
//       console.error("Error in mutation:", error);
//       addToast({
//         type: "error",
//         title: "Erro ao criar template de checklist",
//         message:
//           error.message || "Ocorreu um erro ao criar template de checklist.",
//         duration: 5000,
//       });
//     },
//   });

//   const submitChecklistTemplateData = (data: CreateChecklistTemplateData) => {
//     mutateCreate(data);
//     reset();
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       setIsDialogOpen(false);
//     }
//   }, [isSuccess]);

//   return {
//     createChecklistTemplateForm,
//     handleSubmit: handleSubmit(submitChecklistTemplateData),
//     isSubmitting,
//     isError,
//     error,
//     data,
//     reset,
//   };
// }
