import { IUser } from "@/interfaces/auth";
import { handleRequest, IApiResponse } from "./api";

interface IRequestRegister {
  name: string;
  email: string;
  role: string;
  password: string;
}

const signIn = async (
  email: string,
  password: string
): Promise<IApiResponse<IUser>> => {
  return await handleRequest({
    method: "POST",
    url: "/login",
    data: { email, password },
  });
};

const register = async (request: IRequestRegister) => {
  return await handleRequest({
    method: "POST",
    url: "/register",
    data: request,
  });
};

export const AuthService = {
  signIn,
  register,
};
