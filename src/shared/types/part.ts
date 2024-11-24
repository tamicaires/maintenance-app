import { TPartLocation, TPartStatus } from "@/shared/enums/part";

export interface IPart {
  id: string;
  name: string;
  description: string | null;
  partNumber: string;
  serialNumber: string;
  model: string | null;
  brand: string | null;
  supplier: string | null;
  costPrice: number;
  sellingPrice: number | null;
  stockQuantity: number;
  location: TPartLocation;
  status: TPartStatus;
  categoryId: string;
  trailerId: string | null;
  companyId: string;
  axleId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPartCreateAndUpdate {
  name: string;
  description: string | null;
  partNumber: string;
  serialNumber: string;
  model: string | null;
  brand: string | null;
  supplier: string | null;
  costPrice: number;
  sellingPrice: number | null;
  stockQuantity: number;
  location: TPartLocation;
  status: TPartStatus;
  categoryId: string;
  trailerId: string | null;
  axleId: string | null;
}