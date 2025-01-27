// import { ScrollArea } from "@/components/ui/scroll-area";
// import { IChecklistItemTemplate } from "@/shared/types/checklist";
// import { motion, AnimatePresence } from "framer-motion";
// // import { IChecklistItemTemplate } from "../hooks/use-add-checklist-item";

// export function ChecklistTemplateItemList(items: IChecklistItemTemplate[]) {
//   return (
//     <ScrollArea className="flex-grow">
//       <div className="space-y-2 pr-4">
//         <h3 className="text-sm font-medium mb-2">Itens Adicionados:</h3>
//         <AnimatePresence>
//           {items.map((item) => (
//             <motion.div  
//               key={item.id}
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.2 }}
//             >
//               <div className="flex items-center justify-between p-3 bg-muted rounded-md">
//                 {item.description}
//                 {/* <span className="text-sm">{item.description}</span>
//                         {item.status === "loading" && (
//                           <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
//                         )}
//                         {item.status === "success" && (
//                           <CheckCircle className="text-green-500" size={16} />
//                         )}
//                         {item.status === "error" && (
//                           <XCircle className="text-red-500" size={16} />
//                         )} */}
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//     </ScrollArea>
//   );
// }
