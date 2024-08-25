export interface ICarrier {
  id: string;
  carrierName: string;
  managerName: string;
  managerPhone: string;
  status?: string;
  createdAt?: string;
}

export interface ICarrierUpdate {
  id: string;
  carrierName: string;
  managerName: string;
  managerPhone: string;
  status?: string;
}
