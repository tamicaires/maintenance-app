import { z } from "zod";

export const createNoteSchema = z.object({
  content: z.string({
    required_error: "O conteúdo da nota não pode estar vazio"
  }),
  workOrderId: z.string({
    required_error: "O ID da ordem de serviço é obrigatório"
  }).optional(),
})

export type CreateNoteSchema = z.infer<typeof createNoteSchema>;

export const createNotedefaultValues: CreateNoteSchema = {
  content: "",
}