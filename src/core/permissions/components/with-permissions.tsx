"use client"

import React, { type ComponentType } from "react"
import { useNavigate } from "react-router-dom"
import { Action, Subject } from "../types"
import { usePermissions } from "../permissions-provider"

interface WithPermissionOptions {
  action: Action
  subject: Subject
  redirectTo?: string
}

/**
 * HOC para proteger componentes com base em permissões
 */
export function withPermission<P extends object>(
  Component: ComponentType<P>,
  { action, subject, redirectTo = "/forbidden" }: WithPermissionOptions,
) {
  return function PermissionGuard(props: P) {
    const { can } = usePermissions()
    const navigate = useNavigate()

    React.useEffect(() => {
      if (!can(action, subject)) {
        navigate(redirectTo)
      }
    }, [navigate])

    if (!can(action, subject)) {
      return null
    }

    return <Component {...props} />
  }
}

interface WithPermissionsOptions {
  abilities: Array<[Action, Subject]>
  requireAll?: boolean
  redirectTo?: string
}

/**
 * HOC para proteger componentes com base em múltiplas permissões
 */
export function withPermissions<P extends object>(
  Component: ComponentType<P>,
  { abilities, requireAll = true, redirectTo = "/forbidden" }: WithPermissionsOptions,
) {
  return function PermissionsGuard(props: P) {
    const { canAll, canAny } = usePermissions()
    const navigate = useNavigate()

    const hasPermission = requireAll ? canAll(abilities) : canAny(abilities)

    React.useEffect(() => {
      if (!hasPermission) {
        navigate(redirectTo)
      }
    }, [navigate, hasPermission])

    if (!hasPermission) {
      return null
    }

    return <Component {...props} />
  }
}

/**
 * HOC para proteger componentes apenas para administradores
 */
export function withAdminPermission<P extends object>(
  Component: ComponentType<P>,
  { redirectTo = "/forbidden" }: { redirectTo?: string } = {},
) {
  return function AdminGuard(props: P) {
    const { isAdmin } = usePermissions()
    const navigate = useNavigate()

    React.useEffect(() => {
      if (!isAdmin()) {
        navigate(redirectTo)
      }
    }, [navigate])

    if (!isAdmin()) {
      return null
    }

    return <Component {...props} />
  }
}
