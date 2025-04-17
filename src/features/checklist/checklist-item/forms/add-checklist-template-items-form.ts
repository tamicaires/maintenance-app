import { z } from "zod"

export const addChecklistTemplateItemSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória"),
  templateId: z.string().min(1, "ID do template é obrigatório"),
  weight: z.number().min(1, "Peso deve ser no mínimo 1"),
  checklistCategoryId: z.string().min(1, "ID da categoria é obrigatório"),
})

export type CreateChecklistTemplateItemSchema = z.infer<typeof addChecklistTemplateItemSchema>

export const addChecklistTemplateItemDefaultValues: CreateChecklistTemplateItemSchema = {
  description: "",
  templateId: "",
  weight: 1,
  checklistCategoryId: "",
}