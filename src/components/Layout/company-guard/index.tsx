import { useSelectCompany } from "@/app/SelectCompany/hooks/useSelectCompany";
import { PrivateRoutes } from "@/shared/enums/routes";
import { Navigate } from "react-router-dom";

type AuthGuardProps = {
  children: React.ReactNode;
};

export function CompanyGuard({ children }: AuthGuardProps) {
  const { hasCompanySelected } = useSelectCompany();

  return hasCompanySelected ? (
    children
  ) : (
    <Navigate to={PrivateRoutes.CompanySelection} />
  );
}
