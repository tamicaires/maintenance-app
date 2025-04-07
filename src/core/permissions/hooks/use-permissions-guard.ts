"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
// import { usePermissions } from "./permissions-provider"
import { Action, Subject } from "../types"
import { usePermissions } from "../permissions-provider"

interface UsePermissionGuardOptions {
  action: Action
  subject: Subject
  redirectTo?: string
  data?: any
}

/**
 * Hook para proteger rotas com base em permissões
 */
export function usePermissionGuard({
  action,
  subject,
  redirectTo = "/forbidden",
  data,
}: UsePermissionGuardOptions): boolean {
  const { can, loading } = usePermissions()
  const navigate = useNavigate()

  const hasPermission = can(action, subject, data)

  useEffect(() => {
    if (!loading && !hasPermission) {
      navigate(redirectTo)
    }
  }, [hasPermission, loading, redirectTo, navigate])

  return hasPermission
}

interface UsePermissionsGuardOptions {
  abilities: Array<[Action, Subject]>
  requireAll?: boolean
  redirectTo?: string
  data?: any
}

/**
 * Hook para proteger rotas com base em múltiplas permissões
 */
export function usePermissionsGuard({
  abilities,
  requireAll = true,
  redirectTo = "/forbidden",
  data,
}: UsePermissionsGuardOptions): boolean {
  const { canAll, canAny, loading } = usePermissions()
  const navigate = useNavigate()

  const hasPermission = requireAll ? canAll(abilities, data) : canAny(abilities, data)

  useEffect(() => {
    if (!loading && !hasPermission) {
      navigate(redirectTo)
    }
  }, [hasPermission, loading, redirectTo, navigate])

  return hasPermission
}

interface UseAdminGuardOptions {
  redirectTo?: string
}

/**
 * Hook para proteger rotas apenas para administradores
 */
export function useAdminGuard({ redirectTo = "/forbidden" }: UseAdminGuardOptions = {}): boolean {
  const { isAdmin, loading } = usePermissions()
  const navigate = useNavigate()

  const isUserAdmin = isAdmin()

  useEffect(() => {
    if (!loading && !isUserAdmin) {
      navigate(redirectTo)
    }
  }, [isUserAdmin, loading, redirectTo, navigate])

  return isUserAdmin
}
