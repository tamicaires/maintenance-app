import { z } from "zod"

export const createChecklistCategorySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  templateId: z.string().min(1, "ID do template é obrigatório"),
})

export type CreateChecklistCategorySchema = z.infer<typeof createChecklistCategorySchema>

export const createChecklistCategoryDefaultValues: CreateChecklistCategorySchema = {
  name: "",
  description: "",
  templateId: "",
}
