import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ThemeToggle from "../Toggle";
import { Notification } from "../Notification";
import { CompanyProfile } from "../CompanyProfile";
import { ICompany } from "@/shared/types/company.interface";
import { Webhook } from "lucide-react";
import { MyAccountAvatar } from "../MyAccount";
import { useCompany } from "@/app/SelectCompany/hooks/useCompany";
import { setCookie } from "@/services/cookie";
import { StorageEnum } from "@/shared/enums/storageEnum";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  isCompanySelection?: boolean;
}

export function NavBar({ isCompanySelection = false }: NavBarProps) {
  const navigate = useNavigate();
  const { data } = useCompany();
  const companyData = data?.data || [];

  const handleCompanyChange = (newCompany: ICompany) => {
    setCookie(StorageEnum.CompanyId, newCompany.id, { path: "/" });
    navigate(0);
  };
  return (
    <nav
      className={`fixed top-0 right-0 bg-card border-b h-16 z-40 w-full sm:pl-16`}
    >
      <div className="h-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          <div className="hidden sm:flex sm:items-center">
            {isCompanySelection ? (
              ""
            ) : (
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Cadastros</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Transportadoras</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>
          <div className="sm:hidden flex items-center">
            <Webhook className="h-5 w-5 text-primary" />
            <span className="font-semibold ml-2 text-xl">zetta truck</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
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
