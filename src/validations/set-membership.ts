import { z } from "zod";

export const selectCompanySchema = z.object({
  membershipId: z.string().nonempty("É necessário selecionar uma companhia."),
});
