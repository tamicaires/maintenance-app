export interface ITrailer {
  id: string;
  plate: string;
  position: string;
  isActive: boolean;
  companyId: string
  fleetId: string | null;
  createdAt?: string;
  updatedAt?: string;
}
