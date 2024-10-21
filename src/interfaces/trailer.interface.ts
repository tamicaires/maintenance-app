export interface ITrailer {
  id: string;
  plate: string;
  position: number | null;
  isActive: boolean;
  companyId: string
  fleetId: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ITrailerCreateAndUpdate {
  plate: string;
  position?: number | null;
  isActive: boolean;
  fleetId?: string | null;
}