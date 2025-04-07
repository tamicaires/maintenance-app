import apiClient from "@/core/api/api-client"
import type { ITokenPayload, IUser } from "@/shared/types/auth"
import { jwtDecode } from "jwt-decode"

const TOKEN_KEY = "auth_token"

class JwtService {
  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEY)
    }
    return null
  }

  setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token)
    }
  }

  removeToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY)
    }
  }

  async login(email: string, password: string): Promise<IUser> {
    try {
      const response = await apiClient.post<IUser>("/auth/login", { email, password })
      const userData = response.data

      if (userData.access_token) {
        this.setToken(userData.access_token)
      }

      return userData
    } catch (error) {
      throw new Error("Credenciais inválidas. Tente novamente")
    }
  }

  async validateToken(token: string): Promise<IUser | null> {
    try {
      // Corrigindo o problema de tipo com headers
      const response = await apiClient.get<IUser>("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        } as any, // Usando type assertion para contornar o erro de tipo
      })
      return response.data
    } catch (error) {
      this.removeToken()
      return null
    }
  }

  decodeToken(token: string): IUser | null {
    try {
      const decoded = jwtDecode<ITokenPayload>(token)

      const user = {
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        access_token: token,
      }

      return user as IUser
    } catch (e) {
      console.error("Failed to decode token", e)
      return null
    }
  }
}

export const jwtService = new JwtService()

