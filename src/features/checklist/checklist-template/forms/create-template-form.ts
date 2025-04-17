import { z } from "zod";

export const createChecklistTemplateSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  icon: z.string().optional(),
});

export type CreateChecklistTemplateSchema = z.infer<typeof createChecklistTemplateSchema>;

export const createChecklistTemplateDefaultValues: CreateChecklistTemplateSchema = {
  name: "",
  icon: "",
}