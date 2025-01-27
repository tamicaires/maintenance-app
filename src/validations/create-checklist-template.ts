import { z } from "zod";

export const createChecklistTemplateSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  icon: z.string().optional(),
});

