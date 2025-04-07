import { IUser } from "@/shared/types/auth"
import { jwtService } from "./jwt-service"
import apiClient from "@/core/api/api-client"

class AuthService {

  async login(email: string, password: string): Promise<IUser> {
    return await jwtService.login(email, password)
  }

  async register(email: string, password: string, name: string): Promise<IUser> {
    try {
      const response = await apiClient.post<IUser>("/auth/register", { email, password, name })
      const userData = response.data

      if (userData.access_token) {
        jwtService.setToken(userData.access_token)
      }

      return userData
    } catch (error) {
      throw new Error("Registration failed")
    }
  }

  logout(): void {
    jwtService.removeToken()
  }

  async getCurrentUser(): Promise<IUser | null> {
    const token = jwtService.getToken()
    if (!token) return null

    return jwtService.validateToken(token)
  }

  isAuthenticated(): boolean {
    return !!jwtService.getToken()
  }

  async resetPassword(email: string): Promise<void> {
    await apiClient.post("/auth/reset-password", { email })
  }
}

const authService = new AuthService()
export default authService

