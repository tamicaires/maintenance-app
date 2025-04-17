import { useAuth } from "@/features/Login/hooks/signIn";
import { PublicRoutes } from "@/shared/enums/routes";
import { Navigate } from "react-router-dom";

type AuthGuardProps = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to={PublicRoutes.Login} />;
}
