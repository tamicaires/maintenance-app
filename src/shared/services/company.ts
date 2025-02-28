import { ICompany } from "@/shared/types/company.interface";
import { handleRequest, IApiResponse } from "@/shared/services/api";

const getAll = async (): Promise<IApiResponse<ICompany[]>> => {
  const response = await handleRequest<ICompany[]>({
    method: "GET",
    url: "/companies",
  });
  console.log("response companies", response);
  return response;
};

export const CompanyService = {
  getAll,
};
