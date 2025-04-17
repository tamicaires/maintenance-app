import apiClient from "@/core/api/api-client"
import type { AbilityType, Action, Subject, Conditions, AbilityResponseType } from "./types"

/**
 * Serviço para gerenciar permissões
 */
class PermissionsService {
  private ability: AbilityType | null = null

  /**
   * Busca as permissões do usuário logado
   */
  async fetchPermissions(): Promise<AbilityType> {
    try {
      const response = await apiClient.get<AbilityResponseType>("/auth/permissions")
      const fetchedAbility = response.data

      // Garantir que temos um objeto Ability válido
      if (!fetchedAbility || !Array.isArray(fetchedAbility.ability.rules)) {
        // Se não tiver um objeto válido, cria um objeto vazio
        this.ability = { rules: [] }
      } else {
        this.ability = fetchedAbility.ability
      }

      return this.ability
    } catch (error) {
      console.error("Erro ao buscar permissões:", error)
      // Em caso de erro, retorna um objeto Ability vazio
      this.ability = { rules: [] }
      return this.ability
    }
  }

  /**
   * Verifica se o usuário pode realizar uma ação em um sujeito
   */
  can(action: Action, subject: Subject, data?: any): boolean {
    if (!this.ability || !this.ability.rules) return false

    // Verifica se existe uma regra 'manage' para qualquer sujeito
    const hasManageAll = this.ability.rules.some((rule) => rule.action === "manage" && rule.subject === "all")
    if (hasManageAll) return true

    // Verifica se existe uma regra 'manage' para o sujeito específico
    const hasManageSubject = this.ability.rules.some((rule) => rule.action === "manage" && rule.subject === subject)
    if (hasManageSubject) return true

    // Verifica se existe uma regra específica para a ação e sujeito
    const hasSpecificPermission = this.ability.rules.some((rule) => {
      if (rule.action !== action && rule.action !== "manage") return false
      if (rule.subject !== subject) return false

      // Se não houver condições, a permissão é concedida
      if (!rule.conditions) return true

      // Se houver condições e dados, verifica se as condições são atendidas
      if (data) {
        return this.checkConditions(rule.conditions, data)
      }

      // Se houver condições mas não houver dados, assume que não tem permissão
      return false
    })

    return hasSpecificPermission
  }

  /**
   * Verifica se o usuário pode realizar todas as ações em todos os sujeitos
   */
  canAll(abilities: Array<[Action, Subject]>, data?: any): boolean {
    if (!this.ability) return false
    return abilities.every(([action, subject]) => this.can(action, subject, data))
  }

  /**
   * Verifica se o usuário pode realizar pelo menos uma das ações em pelo menos um dos sujeitos
   */
  canAny(abilities: Array<[Action, Subject]>, data?: any): boolean {
    if (!this.ability) return false
    return abilities.some(([action, subject]) => this.can(action, subject, data))
  }

  /**
   * Verifica se o usuário é administrador (tem permissão 'manage' para 'all')
   */
  isAdmin(): boolean {
    if (!this.ability) return false
    return this.ability.rules.some((rule) => rule.action === "manage" && rule.subject === "all")
  }

  /**
   * Verifica se as condições são atendidas pelos dados
   */
  private checkConditions(conditions: Conditions, data: any): boolean {
    try {
      return Object.entries(conditions).every(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          // Para condições aninhadas
          return this.checkConditions(value, data[key] || {})
        }
        return data[key] === value
      })
    } catch (error) {
      console.error("Erro ao verificar condições:", error)
      return false
    }
  }

  /**
   * Obtém a ability atual
   */
  getAbility(): AbilityType | null {
    return this.ability
  }

  /**
   * Define a ability
   */
  setAbility(ability: AbilityType): void {
    this.ability = ability
  }

  /**
   * Limpa as permissões
   */
  clearPermissions(): void {
    this.ability = null
  }
}

// Exporta uma instância singleton
export const permissionsService = new PermissionsService()
