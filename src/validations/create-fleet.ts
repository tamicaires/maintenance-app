import { z } from "zod";

export const createFleetSchema = z.object({
  fleetNumber: z.string().min(1, "Número da frota é obrigatório"),
  carrierId: z.string().min(1, "Transportadora é obrigatória"),
  isActive: z.boolean().default(true),
});

export type CreateFleetData = z.infer<typeof createFleetSchema>;
