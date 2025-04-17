import { z } from "zod";

export const editNoteSchema = z.object({
  content: z.string({
    required_error: "O conteúdo da nota não pode estar vazio"
  }),
  workOrderId: z.string({
    required_error: "O ID da ordem de serviço é obrigatório"
  }).optional(),
})

export type EditNoteSchema = z.infer<typeof editNoteSchema>;

export const editNoteDefaultValues: EditNoteSchema = {
  content: "",
}