import { z } from "zod";

export const createCarrierSchema = z.object({
  carrierName: z.string().min(2, {
    message: "O nome da transportadora deve ter pelo menos 2 caracteres.",
  }),
  managerName: z.string().min(2, {
    message: "O nome do responsável deve ter pelo menos 2 caracteres.",
  }),
  managerPhone: z.string().min(6, {
    message: "O telefone deve ter pelo menos 10 dígitos.",
  }),
  isActive: z.boolean().default(true),
});
