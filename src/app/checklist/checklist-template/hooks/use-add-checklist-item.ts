// import { useMutation } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { queryClient } from "@/shared/services/query-client";
// import { IApiResponse } from "@/shared/services/api";
// import { ChecklistTemplateItemService } from "@/shared/services/checklist/checklist-template-item";
// import { useState } from "react";
// import { ICreateChecklistTemplateItem } from "@/shared/types/checklist/checklist-template-item";

// type statusType = "loading" | "success" | "error";

// const addChecklistItemSchema = z.object({
//   description: z.string().min(1, "Descrição do item é obrigatória"),
//   weight: z.number(),
//   checklistCategoryId: z.string().uuid()
// });

// export interface ICreateChecklistItem {
//   description: string;
//   templateId: string;
// }

// export interface IChecklistItemTemplate {
//   id: string;
//   description: string;
//   templateId: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface IChecklistItem {
//   id: string;
//   description: string;
//   status: statusType;
// }

// type AddChecklistItemData = z.infer<typeof addChecklistItemSchema>;

// export function useAddChecklistItem(
//   templateId: string,
//   addToast: (toast: any) => void
// ) {
//   const [items, setItems] = useState<IChecklistItem[]>([]);

//   const defaultValues: AddChecklistItemData = {
//     description: "",
//     weight: 1,
//     checklistCategoryId: ""
//   };

//   const addChecklistItemForm = useForm<AddChecklistItemData>({
//     resolver: zodResolver(addChecklistItemSchema),
//     defaultValues,
//   });

//   const {
//     handleSubmit,
//     reset,
//     control,
//     formState: { isSubmitting },
//   } = addChecklistItemForm;

//   const { mutate: mutateAddChecklistItem } = useMutation<
//     IApiResponse<ICreateChecklistTemplateItem>,
//     Error,
//     ICreateChecklistTemplateItem
//   >({
//     mutationFn: (data) => ChecklistTemplateItemService.create(data),
//     onSuccess: (response) => {
//       queryClient.invalidateQueries({ queryKey: ["checklist-items", templateId] });
//       if (response.success && response.data) {
//         addToast({
//           type: "success",
//           title: "Sucesso!",
//           message: `Item adicionado ao template com sucesso.`,
//           duration: 4000,
//         });
//         response.data && updateItemsList(response.data, "success");
//         reset();
//       }
//     },
//     onError: (error) => {
//       console.error("Error in mutation:", error);
//       addToast({
//         type: "error",
//         title: "Ops, algo deu errado!",
//         message: error.message || "Ocorreu um erro ao adicionar o item ao template.",
//         duration: 5000,
//       });
//     },
//   });

//   const updateItemsList = (newItem: IChecklistItemTemplate, status: statusType) => {
//     setItems((prevItems) => [
//       { ...newItem, status },
//       ...prevItems,
//     ]);
//   }

//   const submitChecklistItemData = (data: AddChecklistItemData) => {
//     mutateAddChecklistItem({ ...data, templateId });
//     reset()
//   };

//   return {
//     addChecklistItemForm,
//     handleSubmit: handleSubmit(submitChecklistItemData),
//     isSubmitting,
//     items,
//     control,
//   };
// }

