import { ICompany } from "@/interfaces/company.interface";
import { handleRequest, IApiResponse } from "@/services/api";

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
