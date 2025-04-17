// import { useCallback } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { motion, AnimatePresence } from "framer-motion";
// import { useToast } from "@/components/Toast/toast";
// import { Loader2, Plus } from 'lucide-react';
// import {
//   IChecklistItemTemplate,
//   useAddChecklistItem,
// } from "../hooks/use-add-checklist-item";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
// import { ChecklistTemplateHeader } from "@/components/checklist-template-header/checklist-template-header";
// import { useChecklistTemplateItemByTemplateId } from "../hooks/use-checklist-items-by-template-id";

// interface AddChecklistItemDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   templateId: string;
//   templateName: string;
//   templateIcon?: string;
// }

// export default function AddChecklistItemDialog({
//   open,
//   onOpenChange,
//   templateId,
//   templateName,
//   templateIcon,
// }: AddChecklistItemDialogProps) {
//   const { addToast, ToastComponent } = useToast();
//   const { data, isLoading } = useChecklistTemplateItemByTemplateId(templateId);
//   const templateItems: IChecklistItemTemplate[] = data?.data || [];

//   const { addChecklistItemForm, handleSubmit, isSubmitting } =
//     useAddChecklistItem(templateId, addToast);

//   const { control } = addChecklistItemForm;

//   // useEffect(() => {
//   //   if (open) {
//   //     reset();
//   //   }
//   // }, [open, reset]);

//   const handleFormSubmit = useCallback(
//     (event: React.FormEvent<HTMLFormElement>) => {
//       event.preventDefault();
//       handleSubmit();
//     },
//     [handleSubmit]
//   );

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col">
//         <DialogHeader>
//           <DialogTitle hidden>{templateName}</DialogTitle>
//           <ChecklistTemplateHeader name={templateName} icon={templateIcon} />
//         </DialogHeader>
//         <Separator className="my-4" />
//         <Form {...addChecklistItemForm}>
//           <form
//             onSubmit={handleFormSubmit}
//             className="space-y-4 flex-grow flex flex-col"
//           >
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key="description"
//                 initial={{ y: -20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 exit={{ y: -20, opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <FormField
//                   control={control}
//                   name="description"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Descrição do Item</FormLabel>
//                       <FormControl>
//                         <div className="flex space-x-2">
//                           <Input
//                             {...field}
//                             placeholder="Ex: Verificar pressão dos pneus"
//                             className="flex-grow"
//                           />
//                           <Button
//                             type="submit"
//                             size="icon"
//                             disabled={isSubmitting}
//                           >
//                             {isSubmitting ? (
//                               <Loader2 className="h-4 w-4 animate-spin" />
//                             ) : (
//                               <Plus className="h-4 w-4" />
//                             )}
//                           </Button>
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </motion.div>
//             </AnimatePresence>
//             <ScrollArea className="flex-grow">
//               <div className="space-y-2 pr-4">
//                 <h3 className="text-sm font-medium mb-2">Itens Adicionados:</h3>
//                 <AnimatePresence>
//                   {isLoading ? (
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                   ) : (
//                     templateItems.map((item) => (
//                       <motion.div
//                         key={item.id}
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <div className="flex items-center justify-between p-3 bg-muted rounded-md">
//                           <span className="text-sm">{item.description}</span>
//                         </div>
//                       </motion.div>
//                     ))
//                   )}
//                 </AnimatePresence>
//               </div>
//             </ScrollArea>
//           </form>
//         </Form>
//         <Separator className="my-4" />
//         <div className="flex justify-end">
//           <Button variant="outline" onClick={() => onOpenChange(false)}>
//             Concluir
//           </Button>
//         </div>
//       </DialogContent>
//       <ToastComponent />
//     </Dialog>
//   );
// }

