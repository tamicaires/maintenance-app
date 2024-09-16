import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Wrench,
  ClipboardList,
  CalendarCog,
  FolderPlus,
  FileAxis3D,
  Package2,
  ChevronRight,
  LogOut,
  User,
  Bell,
  Webhook,
  Settings,
  LucideIcon,
} from "lucide-react";
import { PrivateRoutes } from "@/shared/enums/routes";
import { getUserLocalStorage } from "@/utils/auth";

interface SidebarProps {
  onCollapse: (isCollapsed: boolean) => void;
}

interface SubMenuItem {
  label: string;
  path: string;
}

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path?: string;
  hasSubmenu?: boolean;
  children?: SubMenuItem[];
}

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  path?: string;
  isActive: boolean;
  isCollapsed: boolean;
  hasSubmenu: boolean;
  onClick: () => void;
  onIconClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  label,
  path,
  isActive,
  isCollapsed,
  hasSubmenu,
  onClick,
  onIconClick,
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start",
          isActive && "bg-accent",
          isCollapsed ? "px-2" : "px-4"
        )}
        onClick={(e) => {
          if (isCollapsed) {
            e.preventDefault();
            onIconClick();
          } else {
            onClick();
          }
        }}
        asChild
      >
        <Link to={path || "#"}>
          <Icon
            className={cn(
              "h-5 w-5",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          />
          {!isCollapsed && (
            <>
              <span
                className={cn(
                  "ml-2 flex-1 text-left",
                  isActive && "text-primary"
                )}
              >
                {label}
              </span>
              {hasSubmenu && <ChevronRight className="h-4 w-4" />}
            </>
          )}
        </Link>
      </Button>
    </TooltipTrigger>
    {isCollapsed && <TooltipContent side="right">{label}</TooltipContent>}
  </Tooltip>
);

const Sidebar = ({ onCollapse }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSection, setOpenSection] = useState<string>("");
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const user = getUserLocalStorage();

  if (!user) return null;

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? "" : section);
  };

  useEffect(() => {
    onCollapse(isCollapsed);
  }, [isCollapsed, onCollapse]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsCollapsed(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const mainMenuItems: MenuItem[] = [
    { icon: Wrench, label: "Oficina", path: PrivateRoutes.WorkShop },
    {
      icon: ClipboardList,
      label: "Ordens de Serviço",
      path: PrivateRoutes.WorkOrders,
    },
    {
      icon: CalendarCog,
      label: "Planejamento",
      path: PrivateRoutes.MaintenancePlanner,
    },
    {
      icon: Package2,
      label: "Gestão de Peças",
      path: PrivateRoutes.PartsManagement,
    },
    {
      icon: FolderPlus,
      label: "Cadastros",
      hasSubmenu: true,
      children: [
        { label: "Transportadoras", path: PrivateRoutes.Carrier },
        { label: "Frotas", path: PrivateRoutes.Fleet },
        { label: "Serviços", path: PrivateRoutes.Services },
        { label: "Colaboradores", path: PrivateRoutes.Employees },
      ],
    },
    {
      icon: FileAxis3D,
      label: "Relatórios",
      hasSubmenu: true,
      children: [
        { label: "Manutenções", path: PrivateRoutes.MaintenanceReports },
        { label: "Transportadoras", path: PrivateRoutes.CarrierReports },
        { label: "Frotas", path: PrivateRoutes.FleetReports },
        { label: "Serviços", path: PrivateRoutes.ServicesReports },
        { label: "Colaboradores", path: PrivateRoutes.EmployeesReports },
      ],
    },
  ];

  const handleItemClick = (item: MenuItem) => {
    if (isCollapsed) {
      setIsCollapsed(false);
    }
    if (item.hasSubmenu) {
      toggleSection(item.label);
    }
  };

  const isItemActive = (item: MenuItem) => {
    if (item.path) {
      return location.pathname === item.path;
    }
    if (item.children) {
      return item.children.some((child) => location.pathname === child.path);
    }
    return false;
  };

  return (
    <div
      ref={sidebarRef}
      className={cn(
        "flex flex-col h-screen bg-card border-r transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center justify-center h-[60px] border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <div className="flex gap-3 items-center">
            <Webhook className="ml-[-7px] h-6 w-6 text-primary" />
            {!isCollapsed && <span className="text-2xl">zetta truck</span>}
          </div>
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-1">
          {mainMenuItems.map((item) => (
            <React.Fragment key={item.label}>
              <MenuItem
                icon={item.icon}
                label={item.label}
                path={item.path}
                isActive={isItemActive(item)}
                isCollapsed={isCollapsed}
                hasSubmenu={item.hasSubmenu || false}
                onClick={() => handleItemClick(item)}
                onIconClick={() => handleItemClick(item)}
              />
              {!isCollapsed && item.hasSubmenu && (
                <Collapsible open={openSection === item.label}>
                  <CollapsibleContent className="pl-6 space-y-1">
                    {item.children?.map((subItem) => (
                      <Button
                        key={subItem.label}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-sm",
                          location.pathname === subItem.path
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                        asChild
                      >
                        <Link to={subItem.path}>{subItem.label}</Link>
                      </Button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}
            </React.Fragment>
          ))}
        </nav>
      </ScrollArea>

      <div className="p-2 border-t">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="w-full justify-start p-2">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder-avatar.jpg"
                    alt="Sophia Munn"
                  />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">Sophia Munn</p>
                    <p className="text-xs text-muted-foreground">
                      sophia@untitledui.com
                    </p>
                  </div>
                )}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2">
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-sm">
                <User className="mr-2 h-4 w-4" />
                Ver Perfil
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <Bell className="mr-2 h-4 w-4" />
                Atualizações
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-red-500"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Sidebar;
