import { FormFieldConfig, FormStep } from "@/components/multi-step-form";
import {
  BadgeCheck,
  Calendar,
  Car,
  Gauge,
  Hash,
  Palette,
  Settings,
  Truck,
} from "lucide-react";
import { z } from "zod";

export interface VehicleFormData {
  plate: string;
  model: string;
  brand: string;
  year: string;
  color: string | null;
  km: number;
  power: number;
  fleetId: string | null;
  isActive: boolean | null;
}

export const vehicleFieldConfigs: FormFieldConfig<VehicleFormData>[] = [
  {
    name: "plate",
    label: "Placa",
    placeholder: "ABC1234",
    icon: Hash,
    required: true,
    description: "Formato padrão de placa do veículo",
    validation: z
      .string()
      .min(7, "A placa deve ter pelo menos 7 caracteres")
      .max(8, "A placa deve ter no máximo 8 caracteres"),
  },
  {
    name: "year",
    label: "Ano",
    placeholder: "2023",
    icon: Calendar,
    required: true,
    validation: z
      .string()
      .min(4, "O ano deve ter 4 dígitos")
      .max(4, "O ano deve ter 4 dígitos"),
  },
  {
    name: "brand",
    label: "Marca",
    placeholder: "Toyota",
    icon: BadgeCheck,
    required: true,
    validation: z.string().min(2, "A marca deve ter pelo menos 2 caracteres"),
  },
  {
    name: "model",
    label: "Modelo",
    placeholder: "Corolla",
    icon: Car,
    required: true,
    validation: z.string().min(2, "O modelo deve ter pelo menos 2 caracteres"),
  },
  {
    name: "color",
    label: "Cor",
    placeholder: "Prata",
    icon: Palette,
    validation: z.string().nullable(),
  },
  {
    name: "fleetId",
    label: "Frota",
    placeholder: "Selecione uma frota",
    icon: Truck,
    type: "select",
    validation: z.string().nullable(),
  },
  {
    name: "km",
    label: "Quilometragem",
    placeholder: "0",
    icon: Gauge,
    type: "number",
    validation: z.number().min(0, "A quilometragem não pode ser negativa"),
  },
  {
    name: "power",
    label: "Potência (cv)",
    placeholder: "0",
    icon: Settings,
    type: "number",
    validation: z.number().min(0, "A potência não pode ser negativa"),
  },
];

const vehicleFieldConfigsCopy = [...vehicleFieldConfigs];

export const vehicleFormsteps: FormStep<VehicleFormData>[] = [
  {
    id: 1,
    title: "Informações Básicas",
    description: "Detalhes de identificação do veículo",
    icon: Car,
    fields: ["plate", "model", "brand", "year"],
    fieldConfigs: vehicleFieldConfigsCopy.filter((field) =>
      ["plate", "model", "brand", "year"].includes(field.name)
    ),
  },
  {
    id: 2,
    title: "Detalhes Técnicos",
    description: "Especificações e características técnicas",
    icon: Settings,
    fields: ["color", "km", "power", "fleetId"],
    fieldConfigs: vehicleFieldConfigsCopy.filter((field) =>
      ["color", "km", "power", "fleetId"].includes(field.name)
    ),
  },
];
