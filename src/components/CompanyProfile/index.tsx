import React from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ICompany } from "@/interfaces/company.interface";
import { getCookie } from "@/services/cookie";
import { StorageEnum } from "@/shared/enums/storageEnum";

interface CompanyProfileProps {
  linkedCompanies: ICompany[];
  onCompanyChange: (company: ICompany) => void;
}

export function CompanyProfile({
  linkedCompanies,
  onCompanyChange,
}: CompanyProfileProps) {
  const currentCompanyId = getCookie(StorageEnum.CompanyId);
  const currentCompany = linkedCompanies.find(
    (company) => company.id === currentCompanyId
  );

  return (
    <div className="relative">
      <div className="flex items-center space-x-3 bg-primary/5 text-primary px-2 py-1 rounded-md">
        <Avatar className="h-10 w-10 bg-primary/20">
          <AvatarFallback className="text-primary font-semibold">
            {currentCompany?.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="hidden sm:flex sm:flex-col sm:flex-grow">
          <h3 className="font-semibold text-sm">{currentCompany?.name}</h3>
          <p className="text-xs text-primary/70">{currentCompany?.cnpj}</p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-primary hover:bg-primary/20"
            >
              <span className="sr-only">Abrir menu de empresas</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="bg-primary/5 p-4 rounded-t-lg">
              <h4 className="font-semibold text-sm mb-1">
                Empresas Vinculadas
              </h4>
              <p className="text-xs text-muted-foreground">
                Selecione para mudar de empresa
              </p>
            </div>
            <ScrollArea className="h-64">
              <div className="p-4">
                {linkedCompanies.map((company, index) => (
                  <React.Fragment key={company.cnpj}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm mb-1 hover:bg-primary/10"
                      onClick={() => onCompanyChange(company)}
                    >
                      <div className="flex items-center w-full">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarFallback className="bg-primary/20 text-primary text-xs">
                            {company.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-grow text-left">
                          <div className="font-medium">{company.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {company.cnpj}
                          </div>
                        </div>
                        {company.cnpj === currentCompany?.cnpj && (
                          <CheckCircle2 className="h-4 w-4 text-primary ml-2" />
                        )}
                      </div>
                    </Button>
                    {index < linkedCompanies.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
