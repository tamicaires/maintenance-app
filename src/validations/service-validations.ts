import * as z from "zod";

export const createServiceSchema = z.object({
  serviceName: z
    .string()
    .min(1, "Nome do serviço é obrigatório")
    .max(100, "Nome do serviço deve ter no máximo 100 caracteres"),
  serviceCategory: z
    .string()
    .min(1, "Categoria do serviço é obrigatória")
    .max(50, "Categoria do serviço deve ter no máximo 50 caracteres"),
  weight: z
    .number()
    .min(0.5, "Peso do serviço é obrigatória")
});

export type CreateServiceData = z.infer<typeof createServiceSchema>;

export const updateServiceSchema = z.object({
  serviceName: z
    .string()
    .min(1, "Nome do serviço é obrigatório")
    .max(100, "Nome do serviço deve ter no máximo 100 caracteres")
    .optional(),
  serviceCategory: z
    .string()
    .min(1, "Categoria do serviço é obrigatória")
    .max(50, "Categoria do serviço deve ter no máximo 50 caracteres")
    .optional(),
});

export type UpdateServiceData = z.infer<typeof updateServiceSchema>;
