import { BaseService } from "@/core/api/base-service"
import { User, UserCreateInput, UserUpdateInput } from "@/shared/types/user"

class UserService extends BaseService<User> {
  constructor() {
    super("/users")
  }

  /**
   * Get users with pagination
   */
  async getPaginated(
    page = 1,
    limit = 10,
  ): Promise<{
    data: User[]
    total: number
    page: number
    limit: number
    totalPages: number
  }> {
    return this.get<{
      data: User[]
      total: number
      page: number
      limit: number
      totalPages: number
    }>(`?page=${page}&limit=${limit}`)
  }

  /**
   * Create a new user
   */
  async createUser(data: UserCreateInput): Promise<User> {
    return this.create(data)
  }

  /**
   * Update a user
   */
  async updateUser(id: string, data: UserUpdateInput): Promise<User> {
    return this.update(id, data)
  }

  /**
   * Get user by email
   */
  async getByEmail(email: string): Promise<User | null> {
    try {
      const users = await this.get<User[]>(`?email=${encodeURIComponent(email)}`)
      return users.length > 0 ? users[0] : null
    } catch (error) {
      return null
    }
  }

  /**
   * Change user status
   */
  async changeStatus(id: string, isActive: boolean): Promise<User> {
    return this.patch(id, { isActive })
  }
}

// Export a singleton instance
export const userService = new UserService()

