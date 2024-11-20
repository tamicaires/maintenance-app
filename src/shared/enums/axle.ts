export enum AxleType {
  Tracionado = "Tracionado",
  Livre = "Livre",
  Direcional = "Direcional"
}

export type TAxle = keyof typeof AxleType;