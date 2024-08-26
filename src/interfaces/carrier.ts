export interface ICarrier {
  id: string;
  carrierName: string;
  managerName: string;
  managerPhone: string;
  status?: string;
  createdAt?: string;
}

export interface ICarrierCreate {
  carrierName: string;
  managerName: string;
  managerPhone: string;
}
export interface ICarrierUpdate {
  id: string;
  carrierName: string;
  managerName: string;
  managerPhone: string;
  status?: string;
}
