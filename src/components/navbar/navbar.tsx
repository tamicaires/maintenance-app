import { Button } from "@/components/ui/button";
import ThemeToggle from "../Toggle";
import { Notification } from "../Notification";
import { CompanyProfile } from "../company-profile";
import { ICompany } from "@/shared/types/company.interface";
import { Webhook } from "lucide-react";
import { MyAccountAvatar } from "../MyAccount";
import { useCompany } from "@/app/SelectCompany/hooks/useCompany";
import { setCookie } from "@/shared/services/cookie";
import { StorageEnum } from "@/shared/enums/storageEnum";
import { useLocation, useNavigate } from "react-router-dom";
import { BreadCrumb } from "../breadcrumb/breadcrumb";
import { MdOutlineSettings } from "react-icons/md";
import { useAuth } from "@/app/Login/hooks/signIn";

interface NavBarProps {
  isCompanySelection?: boolean;
}

export function NavBar({ isCompanySelection = false }: NavBarProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data } = useCompany();
  const companyData = data || [];

  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleCompanyChange = (newCompany: ICompany) => {
    setCookie(StorageEnum.CompanyId, newCompany.id, { path: "/" });
    navigate(0);
  };

  return (
    <nav
      className={`fixed top-0 right-0 bg-card border-b/50 h-16 z-40 w-full shadow-sm`}
    >
      <div className="h-full px-4 sm:px-6 lg:pr-8 lg:pl-20">
        <div className="flex justify-between items-center h-full">
          <div className="hidden sm:flex sm:items-center">
            {isCompanySelection ? (
              ""
            ) : isHome ? (
              <div className="ml-4 text-lg">
                Olá, <strong>{user?.name}!</strong>
              </div>
            ) : (
              <BreadCrumb />
            )}
          </div>
          <div className="sm:hidden flex items-center">
            <Webhook className="h-5 w-5 text-primary" />
            <span className="font-semibold ml-2 text-xl">zetta truck</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <MdOutlineSettings className="h-5 w-5 text-muted-foreground cursor-pointer" />
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative">
              <Notification />
              <span className="sr-only">Notificações</span>
              <div className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            {isCompanySelection ? (
              <MyAccountAvatar />
            ) : (
              <CompanyProfile
                linkedCompanies={companyData}
                onCompanyChange={handleCompanyChange}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
