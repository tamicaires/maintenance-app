export interface IBox {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  companyId: string;
}

export interface IBoxCreateAndUpdate {
  name: string;
  description: string | null;
  isActive: boolean;
}