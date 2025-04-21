import { PartLocation, PartStatus } from "@/shared/enums/part";
import { z } from "zod";

export const createPartSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable(),
  partNumber: z.string().min(1, "Part number is required"),
  serialNumber: z.string().min(1, "Serial number is required"),
  model: z.string().nullable(),
  brand: z.string().nullable(),
  supplier: z.string().nullable(),
  costPrice: z.number().min(0, "Cost price must be non-negative"),
  sellingPrice: z.number().nullable(),
  stockQuantity: z.number().int().min(0, "Stock quantity must be non-negative"),
  location: z.nativeEnum(PartLocation),
  status: z.nativeEnum(PartStatus),
  categoryId: z.string().min(1, "Category is required"),
  trailerId: z.string().nullable(),
  axleId: z.string().nullable(),
});

export type CreatePartSchema = z.infer<typeof createPartSchema>;

export const createPartDefaultValues: CreatePartSchema = {
  name: "",
  description: null,
  partNumber: "",
  serialNumber: "",
  model: null,
  brand: null,
  supplier: null,
  costPrice: 0,
  sellingPrice: null,
  stockQuantity: 0,
  location: PartLocation.ESTOQUE,
  status: PartStatus.NOVO,
  categoryId: "",
  trailerId: null,
  axleId: null,
};