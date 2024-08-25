import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PrivateRoutes } from "@/shared/enums/routes";
import {
  Home,
  Settings,
  Package2,
  Wrench,
  ClipboardList,
  ServerCog,
  CalendarCog,
  FolderPlus,
  FileAxis3D,
} from "lucide-react";
import { Link } from "react-router-dom";

// const sidebarItems = [
//   { icon: Home, label: "Dashboard" },
//   { icon: BarChart2, label: "Analytics" },
//   {
//     icon: FileText,
//     label: "Cadastro",
//     subItems: [
//       { icon: Truck, label: "Transportadoras" },
//       { icon: Briefcase, label: "Frotas" },
//       { icon: UsersIcon, label: "Colaboradores" },
//       { icon: FileText, label: "Serviços" },
//     ],
//   },
//   { icon: HelpCircle, label: "Help & Support" },
// ];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex h-screen">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to={"/"}
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Main Truck</span>
        </Link>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={"/"}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={"/"}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Wrench className="h-5 w-5" />
              <span className="sr-only">Oficina</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Oficina</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={"/"}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <ClipboardList className="h-5 w-5" />
              <span className="sr-only">Ordens de Serviço</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Ordens de Serviço</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={"/"}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <ServerCog className="h-5 w-5" />
              <span className="sr-only">Manutenções</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Manutenções</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={"/"}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <CalendarCog className="h-5 w-5" />
              <span className="sr-only">Planejamento</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Planejamento</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={"/"}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <FolderPlus className="h-5 w-5" />
              <span className="sr-only">Cadastros</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Cadastros</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={"/"}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <FileAxis3D className="h-5 w-5" />
              <span className="sr-only">Relatórios</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Relatórios</TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={PrivateRoutes.Settings}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Configurações</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Configurações</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
