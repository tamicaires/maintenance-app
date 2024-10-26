import { z } from "zod";

export const createBoxSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable(),
  isActive: z.boolean().default(true),
});

export type CreateBoxData = z.infer<typeof createBoxSchema>;