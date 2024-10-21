import { IMembership } from "@/interfaces/membership";
import { handleRequest, IApiResponse } from "./api";

const setCurrentMembership = async (companyId: string): Promise<IApiResponse<IMembership>> => {
  const response = await handleRequest<IMembership>({
    method: "POST",
    url: `/memberships/${companyId}/set-current`,
  });

  return response;
}

const getCurrentMembership = async (): Promise<IApiResponse<IMembership>> => {
  const response = await handleRequest<IMembership>({
    method: "GET",
    url: "/memberships/current",
  });

  return response;
};

export const MembershipService = {
  setCurrentMembership,
  getCurrentMembership,
};
