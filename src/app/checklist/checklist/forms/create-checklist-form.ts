import { z } from "zod";

export const startChecklistSchema = z.object({
  workOrderId: z.string().min(1, "ID da ordem de serviço é obrigatório"),
  templateId: z.string().min(1, "ID do template é obrigatório"),
});

export type StartChecklistSchema = z.infer<typeof startChecklistSchema>;

export const startChecklistDefaultValues: StartChecklistSchema = {
  workOrderId: "",
  templateId: "",
};