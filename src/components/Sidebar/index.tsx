import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  Truck,
  Briefcase,
  Users,
  FileText,
  ChevronRight,
  ChevronLeft,
  ChevronRight as ChevronRightExpand,
  MoreHorizontal,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Wrench, label: "Oficina", path: PrivateRoutes.WorkShop },
    {
      icon: ClipboardList,
      label: "Ordens de Serviço",
      path: PrivateRoutes.WorkOrders,
    },
    { icon: ServerCog, label: "Manutenções", path: "/" },
    { icon: CalendarCog, label: "Planejamento", path: "/" },
  ];

  const SidebarContent = ({ showLabels = false }) => (
    <>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to={"/"}
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Main Truck</span>
        </Link>

        {navigationItems.map((item) => (
          <Tooltip key={item.label}>
            <TooltipTrigger asChild>
              <Link
                to={item.path}
                className={`flex items-center justify-center rounded-lg transition-colors hover:text-foreground ${
                  showLabels ? "w-full px-3 py-2" : "h-9 w-9 md:h-8 md:w-8"
                } ${
                  isActive(item.path) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {showLabels && <span className="ml-3">{item.label}</span>}
                {!showLabels && <span className="sr-only">{item.label}</span>}
              </Link>
            </TooltipTrigger>
            {!showLabels && (
              <TooltipContent side="right">{item.label}</TooltipContent>
            )}
          </Tooltip>
        ))}

        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground ${
                    showLabels ? "w-full px-3 py-2" : "h-9 w-9 md:h-8 md:w-8"
                  }`}
                >
                  <FolderPlus className="h-5 w-5 shrink-0" />
                  {showLabels && <span className="ml-3">Cadastros</span>}
                  {!showLabels && <span className="sr-only">Cadastros</span>}
                </button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            {!showLabels && (
              <TooltipContent side="right">Cadastros</TooltipContent>
            )}
          </Tooltip>
          <DropdownMenuContent
            side={showLabels ? "bottom" : "right"}
            className="w-56"
          >
            <DropdownMenuLabel>Cadastros</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                to={PrivateRoutes.Carrier}
                className="flex gap-0.5 items-center"
              >
                <Truck className="mr-2 h-4 w-4" />
                <span>Transportadoras</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to={PrivateRoutes.Fleet}
                className="flex gap-0.5 items-center"
              >
                <Briefcase className="mr-2 h-4 w-4" />
                <span>Frotas</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              <span>Serviço</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to={PrivateRoutes.Employees}
                className="flex gap-0.5 items-center"
              >
                <Users className="mr-2 h-4 w-4" />
                <span>Colaboradores</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ChevronRight className="mr-2 h-4 w-4" />
              <span>Cargos</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={"/"}
              className={`flex items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground ${
                showLabels ? "w-full px-3 py-2" : "h-9 w-9 md:h-8 md:w-8"
              }`}
            >
              <FileAxis3D className="h-5 w-5 shrink-0" />
              {showLabels && <span className="ml-3">Relatórios</span>}
              {!showLabels && <span className="sr-only">Relatórios</span>}
            </Link>
          </TooltipTrigger>
          {!showLabels && (
            <TooltipContent side="right">Relatórios</TooltipContent>
          )}
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={PrivateRoutes.Account}
              className={`flex items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground ${
                showLabels ? "w-full px-3 py-2" : "h-9 w-9 md:h-8 md:w-8"
              }`}
            >
              <Settings className="h-5 w-5 shrink-0" />
              {showLabels && <span className="ml-3">Configurações</span>}
              {!showLabels && <span className="sr-only">Configurações</span>}
            </Link>
          </TooltipTrigger>
          {!showLabels && (
            <TooltipContent side="right">Configurações</TooltipContent>
          )}
        </Tooltip>
      </nav>
    </>
  );

  return (
    <>
      {/* Bottom navigation for small screens */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around bg-card border-t border-gray-200 sm:hidden">
        {navigationItems.slice(0, 4).map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex flex-col items-center justify-center p-2 ${
              isActive(item.path) ? "text-green-500" : "text-muted-foreground"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center justify-center p-2 text-muted-foreground">
              <MoreHorizontal className="h-5 w-5" />
              <span className="text-xs mt-1">More</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SidebarContent showLabels={true} />
          </SheetContent>
        </Sheet>
      </nav>

      {/* Toggleable sidebar for larger screens */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 hidden sm:flex flex-col border-r bg-card transition-all duration-300 ${
          isExpanded ? "w-64" : "w-14"
        }`}
      >
        <SidebarContent showLabels={isExpanded} />
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-6 flex h-6 w-6 items-center justify-center rounded-full border bg-background text-muted-foreground hover:text-foreground"
        >
          {isExpanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRightExpand className="h-4 w-4" />
          )}
        </button>
      </aside>
    </>
  );
}
