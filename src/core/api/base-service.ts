import apiClient, { type ApiRequestConfig, type ApiResponse, type ApiError } from "./api-client"


export class BaseService<T = any> {
  protected basePath: string

  constructor(basePath: string) {
    this.basePath = basePath
  }

  async getAll(config?: ApiRequestConfig): Promise<T[]> {
    try {
      const response: ApiResponse<T[]> = await apiClient.get(this.basePath, config)
      return response.data
    } catch (error) {
      throw this.handleError(error as ApiError)
    }
  }


  async getById(id: string | number, config?: ApiRequestConfig): Promise<T> {
    try {
      const response: ApiResponse<T> = await apiClient.get(`${this.basePath}/${id}`, config)
      return response.data
    } catch (error) {
      throw this.handleError(error as ApiError)
    }
  }


  async create(data: Partial<T>, config?: ApiRequestConfig): Promise<T> {
    try {
      const response: ApiResponse<T> = await apiClient.post(this.basePath, data, config)
      return response.data
    } catch (error) {
      throw this.handleError(error as ApiError)
    }
  }

  async update(id: string | number, data: Partial<T>, config?: ApiRequestConfig): Promise<T> {
    try {
      const response: ApiResponse<T> = await apiClient.put(`${this.basePath}/${id}`, data, config)
      return response.data
    } catch (error) {
      throw this.handleError(error as ApiError)
    }
  }

  async patch<R = T, D = Partial<T>>(id: string | number, data?: D, config?: ApiRequestConfig): Promise<R> {
    try {
      const response: ApiResponse<R> = await apiClient.patch(`${this.basePath}/${id}`, data, config)
      return response.data
    } catch (error) {
      throw this.handleError(error as ApiError)
    }
  }

  async delete(id: string | number, config?: ApiRequestConfig): Promise<void> {
    try {
      await apiClient.delete(`${this.basePath}/${id}`, config)
    } catch (error) {
      throw this.handleError(error as ApiError)
    }
  }


  async get<R = any>(path: string, config?: ApiRequestConfig): Promise<R> {
    try {
      const response: ApiResponse<R> = await apiClient.get(`${this.basePath}${path}`, config)
      return response.data
    } catch (error) {
      throw this.handleError(error as ApiError)
    }
  }

  async post<R = any, D = any>(path: string, data?: D, config?: ApiRequestConfig): Promise<R> {
    try {
      const response: ApiResponse<R> = await apiClient.post(`${this.basePath}${path}`, data, config)
      return response.data
    } catch (error) {
      throw this.handleError(error as ApiError)
    }
  }

  protected handleError(error: ApiError): Error {
    const message = error.response?.data?.message || error.message || "Ocorreu um erro inesperado"
    return new Error(message)
  }

}

