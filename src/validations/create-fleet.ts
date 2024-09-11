import { z } from "zod";

export const createFleetSchema = z.object({
  fleetNumber: z.string().min(1, "Número da frota é obrigatório"),
  plate: z.string().regex(/^[A-Z]{3}-\d{4}$/, "Formato de placa inválido"),
  firstTrailerPlate: z
    .string()
    .regex(/^[A-Z]{3}-\d{4}$/, "Formato de placa inválido")
    .optional()
    .or(z.literal("")),
  secondTrailerPlate: z
    .string()
    .regex(/^[A-Z]{3}-\d{4}$/, "Formato de placa inválido")
    .optional()
    .or(z.literal("")),
  thirdTrailerPlate: z
    .string()
    .regex(/^[A-Z]{3}-\d{4}$/, "Formato de placa inválido")
    .optional()
    .or(z.literal("")),
  km: z.string().refine((val) => val === "" || Number(val) >= 0, {
    message: "KM deve ser maior ou igual a 0",
  }),
  carrierId: z.string().min(1, "Transportadora é obrigatória"),
  status: z.string().default("ATIVO"),
});