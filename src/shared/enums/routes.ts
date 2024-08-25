export enum PublicRoutes {
  Login = "/auth/sign-in",
  Register = "/auth/register",
  ForgotPassword = "/password/forgot",
}

export enum PrivateRoutes {
  Home = "/",
  Carrier = "/cadastros/transportadoras",
  Fleet = "/cadastros/frota",
  Maintenance = "/cadastros/manutencao",
  Employees = "/cadastros/colaboradores",
  Services = "/cadastros/servicos",
  WorkOrders = "/ordens-servico",
  Settings = "/configuracoes",
  Account = "minha-conta",
  Appearance = "aparencia",
  Subscription = "assinatura",
  Support = "suporte",
}
