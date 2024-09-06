export enum PublicRoutes {
  Login = "/login",
  Register = "/auth/cadastrar",
  ForgotPassword = "/password/forgot",
}

export enum PrivateRoutes {
  Home = "/",
  Carrier = "/cadastros/transportadoras",
  Fleet = "/cadastros/frota",
  Maintenance = "/cadastros/manutencao",
  Employees = "/cadastros/colaboradores",
  Services = "/cadastros/servicos",
  WorkShop = "/oficina",
  WorkOrders = "/ordem-de-servico",
  Settings = "/configuracoes",
  Account = "/configuracoes/minha-conta",
  Appearance = "/configuracoes/aparencia",
  Subscription = "/configuracoes/assinatura",
  Support = "/configuracoes/suporte",
}
