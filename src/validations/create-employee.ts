import { z } from "zod";

export const createEmployeeSchema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
      invalid_type_error: "Nome deve ser uma string",
    })
    .min(1, "Nome não pode ser vazio"),

  workShift: z
    .string({
      required_error: "Turno de trabalho é obrigatório",
      invalid_type_error: "Turno de trabalho deve ser uma string",
    })
    .min(1, "Turno de trabalho não pode ser vazio"),

  jobTitleId: z
    .string({
      required_error: "ID do cargo é obrigatório",
      invalid_type_error: "ID do cargo deve ser uma string",
    })
    .min(1, "ID do cargo não pode ser vazio"),
  status: z.enum(["ATIVO", "INATIVO"]),
});

export type CreateEmployeeData = z.infer<typeof createEmployeeSchema>;
