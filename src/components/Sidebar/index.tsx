import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  Home,
  MoreHorizontal,
  ChevronLeft,
  Truck,
  Briefcase,
  FileText,
  Users,
} from "lucide-react";
import { PrivateRoutes } from "@/shared/enums/routes";
import { getUserLocalStorage } from "@/utils/auth";
import { MyAccountAvatar } from "../MyAccount";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path?: string;
  hasSubmenu?: boolean;
  children?: { icon: LucideIcon; label: string; path: string }[];
}

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [openSection, setOpenSection] = useState<string>("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<MenuItem | null>(null);
  const location = useLocation();
  const user = getUserLocalStorage();
  const sheetRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsCollapsed(false);
    };

    const handleMouseLeave = () => {
      setIsCollapsed(true);
    };

    if (sidebarRef.current) {
      sidebarRef.current.addEventListener("mouseenter", handleMouseEnter);
      sidebarRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (sidebarRef.current) {
        sidebarRef.current.removeEventListener("mouseenter", handleMouseEnter);
        sidebarRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const mainMenuItems: MenuItem[] = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Wrench, label: "Oficina", path: PrivateRoutes.WorkShop },
    { icon: ClipboardList, label: "Ordens", path: PrivateRoutes.WorkOrders },
    {
      icon: CalendarCog,
      label: "Planejamento",
      path: PrivateRoutes.MaintenancePlanner,
    },
    { icon: Package2, label: "Peças", path: PrivateRoutes.PartsManagement },
    {
      icon: FolderPlus,
      label: "Cadastros",
      hasSubmenu: true,
      children: [
        { icon: Truck, label: "Transportadoras", path: PrivateRoutes.Carrier },
        { icon: Briefcase, label: "Frotas", path: PrivateRoutes.Fleet },
        { icon: FileText, label: "Serviços", path: PrivateRoutes.Services },
        { icon: Users, label: "Colaboradores", path: PrivateRoutes.Employees },
      ],
    },
    {
      icon: FileAxis3D,
      label: "Relatórios",
      hasSubmenu: true,
      children: [
        {
          icon: Wrench,
          label: "Manutenções",
          path: PrivateRoutes.MaintenanceReports,
        },
        {
          icon: Truck,
          label: "Transportadoras",
          path: PrivateRoutes.CarrierReports,
        },
        { icon: Briefcase, label: "Frotas", path: PrivateRoutes.FleetReports },
        {
          icon: FileText,
          label: "Serviços",
          path: PrivateRoutes.ServicesReports,
        },
        {
          icon: Users,
          label: "Colaboradores",
          path: PrivateRoutes.EmployeesReports,
        },
      ],
    },
  ];

  const bottomNavItems = mainMenuItems.slice(0, 4);
  const moreMenuItems = mainMenuItems.slice(4);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? "" : section);
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

  const handleItemClick = (item: MenuItem) => {
    if (item.hasSubmenu) {
      toggleSection(item.label);
    }
  };

  const renderMenuItem = (item: MenuItem, isMobile = false) => (
    <Tooltip key={item.label}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start",
            isItemActive(item) && "bg-accent",
            isCollapsed && !isMobile ? "px-2" : "px-4"
          )}
          onClick={() => {
            handleItemClick(item);
            if (isMobile) {
              setIsSheetOpen(false);
            }
          }}
          asChild
        >
          <Link to={item.path || "#"}>
            <item.icon
              className={cn(
                "h-5 w-5",
                isItemActive(item) ? "text-primary" : "text-muted-foreground"
              )}
            />
            {(!isCollapsed || isMobile) && (
              <>
                <span
                  className={cn(
                    "ml-2 flex-1 text-left",
                    isItemActive(item) && "text-primary"
                  )}
                >
                  {item.label}
                </span>
                {item.hasSubmenu && <ChevronRight className="h-4 w-4" />}
              </>
            )}
          </Link>
        </Button>
      </TooltipTrigger>
      {isCollapsed && !isMobile && (
        <TooltipContent side="right">{item.label}</TooltipContent>
      )}
    </Tooltip>
  );

  const renderSubmenuItems = (item: MenuItem, isMobile = false) =>
    (!isCollapsed || isMobile) &&
    item.hasSubmenu && (
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
              onClick={() => {
                if (isMobile) {
                  setIsSheetOpen(false);
                }
              }}
              asChild
            >
              <Link to={subItem.path}>
                <subItem.icon className="h-4 w-4 mr-2" />
                {subItem.label}
              </Link>
            </Button>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );

  const renderSidebar = () => (
    <div
      ref={sidebarRef}
      className={cn(
        "hidden sm:flex flex-col h-screen bg-card border-r transition-all duration-300 ease-in-out fixed top-0 left-0 z-50",
        isCollapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center justify-center h-[60px] border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Webhook className="h-6 w-6 text-primary" />
          {!isCollapsed && (
            <div className="flex items-center">
              <Webhook className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl">zetta truck</span>
            </div>
          )}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-1">
          {mainMenuItems.map((item) => (
            <React.Fragment key={item.label}>
              {renderMenuItem(item)}
              {renderSubmenuItems(item)}
            </React.Fragment>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-2 border-t">
        <MyAccountAvatar isCollapsed={isCollapsed} />
      </div>
    </div>
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startY = touch.clientY;
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const currentY = touch.clientY;
      if (currentY - startY > 50) {
        setIsSheetOpen(false);
        document.removeEventListener("touchmove", handleTouchMove);
      }
    };
    document.addEventListener("touchmove", handleTouchMove);
  };

  const renderMoreOptionsContent = () => {
    if (activeSubmenu) {
      return (
        <>
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => setActiveSubmenu(null)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <div
            className={cn(
              "grid gap-4",
              activeSubmenu.children && activeSubmenu.children.length <= 3
                ? "grid-cols-3"
                : "grid-cols-2"
            )}
          >
            {activeSubmenu.children?.map((subItem) => (
              <Card
                key={subItem.label}
                className="hover:bg-accent transition-colors"
              >
                <CardContent className="p-4">
                  <Link
                    to={subItem.path}
                    className="flex flex-col items-center text-center"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <subItem.icon className="h-8 w-8 mb-2 text-primary" />
                    <span className="text-sm font-medium">{subItem.label}</span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      );
    }

    return (
      <div
        className={cn(
          "grid gap-4",
          moreMenuItems.length <= 3 ? "grid-cols-3" : "grid-cols-2"
        )}
      >
        {moreMenuItems.map((item) => (
          <Card key={item.label} className="hover:bg-accent transition-colors">
            <CardContent className="p-4">
              {item.hasSubmenu ? (
                <button
                  className="flex flex-col items-center text-center w-full"
                  onClick={() => setActiveSubmenu(item)}
                >
                  <item.icon className="h-8 w-8 mb-2 text-primary" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ) : (
                <Link
                  to={item.path || "#"}
                  className="flex flex-col items-center text-center"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <item.icon className="h-8 w-8 mb-2 text-primary" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderBottomNav = () => (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground z-50 rounded-t-xl">
      <div className="flex justify-around items-center h-16">
        {bottomNavItems.map((item) => (
          <Link
            key={item.label}
            to={item.path || "#"}
            className={cn(
              "flex flex-col items-center justify-center w-1/5 h-full text-zinc-200 ",
              isItemActive(item) && "bg-zinc-50 text-primary rounded-md"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center justify-center w-1/5 h-full text-zinc-100 ">
              <MoreHorizontal className="h-6 w-6" />
              <span className="text-xs mt-1">Mais</span>
            </button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="h-auto max-h-[80vh] rounded-t-[20px] overflow-hidden"
            ref={sheetRef}
            onTouchStart={handleTouchStart}
          >
            <div className="absolute left-1/2 top-2 w-12 h-1.5 bg-muted-foreground/20 rounded-full -translate-x-1/2" />

            <ScrollArea className="mt-4 h-full max-h-[calc(80vh-4rem)]">
              {renderMoreOptionsContent()}
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );

  return (
    <>
      {renderSidebar()}
      {renderBottomNav()}
    </>
  );
};

export default Sidebar;
