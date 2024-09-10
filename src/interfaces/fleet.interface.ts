export interface IFleet {
  id: string;
  fleetNumber: string;
  plate: string;
  firstTrailerPlate: string;
  secondTrailerPlate: string;
  thirdTrailerPlate: string;
  km: string;
  status?: string;
  carrierId: string;
  carrierName: string;
  createdAt?: string;
}

export interface IFleetUpdate {
  id: string;
  fleetNumber: string;
  firstTrailerPlate: string;
  secondTrailerPlate: string;
  thirdTrailerPlate: string;
  km: string;
  status?: string;
  carrierId: string;
  carrierName: string;
}
