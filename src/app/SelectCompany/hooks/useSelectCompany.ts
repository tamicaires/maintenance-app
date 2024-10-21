import { useEffect, useState } from "react";
import { useCompany } from "./useCompany";
import { useNavigate } from "react-router-dom";
import { setCookie } from "@/services/cookie";
import { StorageEnum } from "@/shared/enums/storageEnum";
import { PrivateRoutes } from "@/shared/enums/routes";
import { ICompany } from "@/interfaces/company.interface";

export function useSelectCompany() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [defaultCompany, setDefaultCompany] = useState<string | null>(null);
  const { data, isLoading } = useCompany();
  const companyData = data?.data || [];
  const [filteredCompanies, setFilteredCompanies] = useState<ICompany[]>(companyData);
  const navigate = useNavigate();

  useEffect(() => {
    const results = companyData.filter((company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(results);
  }, [searchTerm, companyData]);

  const select = (companyId: string) => {
    setLoading(true);
    setCookie(StorageEnum.CompanyId, companyId, { path: '/' });
    navigate(PrivateRoutes.Home);
    setLoading(false);
  };

  const handleCompanySelect = (companyId: string, setAsDefault: boolean = false) => {
    select(companyId);
    if (setAsDefault) {
      setDefaultCompany(companyId);
      console.log(`Empresa definida como padrão: ${companyId}`);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    isLoading,
    select,
    loading,
    defaultCompany,
    filteredCompanies,
    handleCompanySelect,
  };
}
