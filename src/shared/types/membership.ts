import { TRole } from "@/shared/enums/membership";

export interface IMembership {
  id: string;
  role: TRole[];
  companyId: string;
  userId: string;
}
