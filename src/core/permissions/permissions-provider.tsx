"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { permissionsService } from "./permissions-service"
import type { Ability, Action, Subject, PermissionsContextType } from "./types"
import { useAuth } from "@/core/auth/auth-provider"

// Cria o contexto de permissões
const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined)

interface PermissionsProviderProps {
  children: React.ReactNode
}

/**
 * Provider para o contexto de permissões
 */
export function PermissionsProvider({ children }: PermissionsProviderProps) {
  const { isAuthenticated, user } = useAuth()
  const [ability, setAbility] = useState<Ability | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // Função para buscar permissões
  const fetchPermissions = async () => {
    if (!isAuthenticated) {
      setAbility(null)
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const fetchedAbility = await permissionsService.fetchPermissions()
      setAbility(fetchedAbility) // Agora pode ser null, o que é aceitável
    } catch (error) {
      console.error("Erro ao buscar permissões:", error)
      setAbility(null)
    } finally {
      setLoading(false)
    }
  }

  // Busca permissões quando o usuário é autenticado
  useEffect(() => {
    fetchPermissions()
  }, [isAuthenticated, user])

  // Atualiza o serviço quando o ability muda
  useEffect(() => {
    if (ability) {
      permissionsService.setAbility(ability)
    } else {
      permissionsService.clearPermissions()
    }
  }, [ability])

  // Funções de verificação de permissões
  const can = (action: Action, subject: Subject, data?: any): boolean => {
    return permissionsService.can(action, subject, data)
  }

  const canAll = (abilities: Array<[Action, Subject]>, data?: any): boolean => {
    return permissionsService.canAll(abilities, data)
  }

  const canAny = (abilities: Array<[Action, Subject]>, data?: any): boolean => {
    return permissionsService.canAny(abilities, data)
  }

  const isAdmin = (): boolean => {
    return permissionsService.isAdmin()
  }

  // Função para atualizar permissões
  const refreshPermissions = async (): Promise<void> => {
    await fetchPermissions()
  }

  const value: PermissionsContextType = {
    ability,
    loading,
    can,
    canAll,
    canAny,
    isAdmin,
    refreshPermissions,
  }

  return <PermissionsContext.Provider value={value}>{children}</PermissionsContext.Provider>
}

/**
 * Hook para usar o contexto de permissões
 */
export function usePermissions(): PermissionsContextType {
  const context = useContext(PermissionsContext)
  if (context === undefined) {
    throw new Error("usePermissions deve ser usado dentro de um PermissionsProvider")
  }
  return context
}
