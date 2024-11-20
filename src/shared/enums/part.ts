export enum PartLocation {
  ESTOQUE = "ESTOQUE",
  APLICADO = "APLICADO",
  RECUPERACAO = "RECUPERACAO",
}

export type TPartLocation = keyof typeof PartLocation;

export enum PartStatus {
  NOVO = "NOVO",
  RECUPERADO = "RECUPERADO",
}

export type TPartStatus = keyof typeof PartStatus;