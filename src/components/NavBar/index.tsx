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
import { ICompany } from "@/interfaces/company.interface";
import { Webhook } from "lucide-react";

export function NavBar() {
  const currentCompany = {
    companyName: "Vale das Carretas",
    cnpj: "12.345.678/0001-90",
  };
  const linkedCompanies = [
    { companyName: "Julio Simões JSL", cnpj: "98.765.432/0001-10" },
    { companyName: "TSM Manutenuções", cnpj: "11.223.344/0001-55" },
  ];

  const handleCompanyChange = (newCompany: ICompany) => {
    console.log("Switching to:", newCompany);
  };
  return (
    <nav
      className={`fixed top-0 right-0 bg-card border-b h-16 z-40 w-full sm:pl-16`}
    >
      <div className="h-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          <div className="hidden sm:flex sm:items-center">
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
            <CompanyProfile
              currentCompany={currentCompany}
              linkedCompanies={linkedCompanies}
              onCompanyChange={handleCompanyChange}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
