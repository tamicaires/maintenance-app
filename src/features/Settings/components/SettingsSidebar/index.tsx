import { PrivateRoutes } from "@/shared/enums/routes";
import { Link } from "react-router-dom";

export function SettingsSidebar() {
  return (
    <nav
      className="flex justify-between sm:grid gap-4 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      <Link to={PrivateRoutes.Account} className="font-semibold text-primary">
        Minha Conta
      </Link>
      <Link to={PrivateRoutes.Appearance}>Aparência</Link>
      <Link to={PrivateRoutes.Subscription}>Assinatura</Link>
      <Link to={PrivateRoutes.Home}>Suporte</Link>
    </nav>
  );
}
