export interface User {
  id: string
  email: string
  name: string
  isActive: boolean;
  createdAt: string
  updatedAt: string
}

export interface UserCreateInput {
  email: string
  name: string
  password: string
  role?: "admin" | "user" | "manager"
  isActive: boolean;
  avatar?: string
}

export interface UserUpdateInput {
  email?: string
  name?: string
  role?: "admin" | "user" | "manager"
  isActive: boolean;
  avatar?: string
  password?: string
}

