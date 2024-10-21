export interface ICompany {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string | null;
  createdAt: Date;
  updatedAt: Date;
}