import axios from "axios";
import { ITokenPayload, IUser } from "@/shared/types/auth";
import { jwtDecode } from "jwt-decode";

export const Api = () => {
  return axios.create({
    baseURL: "http://localhost:3000/",
  });
};

export const decodeToken = (token: string): IUser | null => {
  try {

    const decoded = jwtDecode<ITokenPayload>(token);

    const user = {
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      token,
    };

    return user as IUser;
  } catch (e) {
    console.error("Failed to decode token", e);
    return null;
  }
};

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("user");
  if (!json) return null;
  return JSON.parse(json) ?? null;
}

export function getTokenLocalStorage() {
  const user = getUserLocalStorage();
  return user ? user.token : null;
}
