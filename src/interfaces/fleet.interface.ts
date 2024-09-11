export interface IFleet {
  id: string;
  fleetNumber: string;
  plate: string;
  firstTrailerPlate: string;
  secondTrailerPlate: string;
  thirdTrailerPlate: string;
  km: string;
  status: "ATIVO" | "INATIVO";
  carrierId: string;
  carrierName: string;
  createdAt?: string;
}

export interface IFleetCreate {
  fleetNumber: string;
  plate: string;
  firstTrailerPlate: string;
  secondTrailerPlate: string;
  thirdTrailerPlate: string;
  km: string;
  status: "ATIVO" | "INATIVO";
  carrierId: string;
}

export interface IFleetUpdate {
  fleetNumber?: string;
  plate?: string;
  firstTrailerPlate?: string;
  secondTrailerPlate?: string;
  thirdTrailerPlate?: string;
  km?: string;
  carrierId?: string;
  status?: "ATIVO" | "INATIVO";
}
