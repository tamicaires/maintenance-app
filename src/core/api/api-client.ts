import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios"
import { jwtService } from "@/core/auth/jwt-service"

export interface ApiRequestConfig extends AxiosRequestConfig {
  skipAuthRefresh?: boolean
  skipErrorHandling?: boolean
  _retry?: boolean
}

export interface ApiResponse<T = any> extends AxiosResponse<T> { }

export interface ApiError<T = any> extends AxiosError<T> {
  response?: AxiosResponse<T & { message?: string }>
}

class ApiClient {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/",
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 30000,
      withCredentials: true,
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      async (config) => {
        const token = jwtService.getToken()
        if (token) {
          config.headers = config.headers || {}
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as ApiRequestConfig

        // Skip auth refresh if specified
        if (originalRequest?.skipAuthRefresh) {
          return Promise.reject(error)
        }

        // Handle 401 Unauthorized - Token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            // Try to validate token or refresh it
            const token = jwtService.getToken()
            if (token) {
              const user = await jwtService.validateToken(token)
              if (user) {
                // Token is still valid, retry request
                return this.instance(originalRequest)
              }
            }

            // Token is invalid, clear it
            jwtService.removeToken()

            // Redirect to login page if in browser
            if (typeof window !== "undefined") {
              window.location.href = "/login"
            }

            return Promise.reject(error)
          } catch (refreshError) {
            jwtService.removeToken()
            return Promise.reject(refreshError)
          }
        }

        // Skip error handling if specified
        if (originalRequest?.skipErrorHandling) {
          return Promise.reject(error)
        }

        // Handle specific error status codes
        if (error.response) {
          switch (error.response.status) {
            case 403:
              console.error("Acesso Negado:", error.response.data)
              break
            case 404:
              console.error("Recurso não encontrado:", error.response.data)
              break
            case 500:
              console.error("Server error:", error.response.data)
              break
            default:
              console.error(`Error ${error.response.status}:`, error.response.data)
          }
        } else if (error.request) {
          console.error("No response received:", error.request)
        } else {
          console.error("Request error:", error.message)
        }

        return Promise.reject(error)
      },
    )
  }

  public get<T = any>(url: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.instance.get(url, config)
  }

  public post<T = any>(url: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.instance.post(url, data, config)
  }

  public put<T = any>(url: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.instance.put(url, data, config)
  }

  public patch<T = any>(url: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.instance.patch(url, data, config)
  }

  public delete<T = any>(url: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.instance.delete(url, config)
  }
}

const apiClient = new ApiClient()
export default apiClient

