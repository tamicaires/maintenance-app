export interface ICarrier {
  id: string;
  carrierName: string;
  managerName: string;
  managerPhone: string;
  companyId: string;
  isActive: boolean;
  createdAt?: string;
}

export interface ICarrierCreate {
  carrierName: string;
  managerName: string;
  managerPhone: string;
  isActive: boolean;
}
export interface ICarrierUpdate {
  id: string;
  carrierName: string;
  managerName: string;
  managerPhone: string;
  companyId: string;
  isActive: boolean;
}
