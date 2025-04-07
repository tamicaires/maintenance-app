/**
 * Tipos para o sistema de permissões
 */

// Ações possíveis
export type Action = "manage" | "create" | "read" | "update" | "delete" | "view report" | string // Para permitir ações personalizadas

// Sujeitos/recursos possíveis
export type Subject = "Company" | "User" | "Carrier" | "Fleet" | string // Para permitir sujeitos personalizados

// Condições para as permissões
export interface Conditions {
  [key: string]: any
}

// Regra de permissão
export interface PermissionRule {
  action: Action
  subject: Subject
  conditions?: Conditions
}

// Ability (conjunto de regras de permissão)
export interface Ability {
  rules: PermissionRule[]
}

// Tipo para o contexto de permissões
export interface PermissionsContextType {
  ability: Ability | null
  loading: boolean
  can: (action: Action, subject: Subject, data?: any) => boolean
  canAll: (abilities: Array<[Action, Subject]>, data?: any) => boolean
  canAny: (abilities: Array<[Action, Subject]>, data?: any) => boolean
  isAdmin: () => boolean
  refreshPermissions: () => Promise<void>
}

