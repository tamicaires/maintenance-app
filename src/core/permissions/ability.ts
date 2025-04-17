import type { Action, Subject, PermissionRule, Conditions } from "./types"

/**
 * Classe Ability para gerenciar permissões
 * Implementa verificação de permissões baseada em regras
 */
export class Ability {
  private rules: PermissionRule[]

  constructor(rules: PermissionRule[] = []) {
    this.rules = rules
  }

  /**
   * Verifica se o usuário pode realizar uma ação em um sujeito
   */
  can(action: Action, subject: Subject, data?: any): boolean {
    // Verifica se existe uma regra 'manage' para qualquer sujeito
    const hasManageAll = this.rules.some((rule) => rule.action === "manage" && rule.subject === "all")
    if (hasManageAll) return true

    // Verifica se existe uma regra 'manage' para o sujeito específico
    const hasManageSubject = this.rules.some((rule) => rule.action === "manage" && rule.subject === subject)
    if (hasManageSubject) return true

    // Verifica se existe uma regra específica para a ação e sujeito
    const hasSpecificPermission = this.rules.some((rule) => {
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
    return abilities.every(([action, subject]) => this.can(action, subject, data))
  }

  /**
   * Verifica se o usuário pode realizar pelo menos uma das ações em pelo menos um dos sujeitos
   */
  canAny(abilities: Array<[Action, Subject]>, data?: any): boolean {
    return abilities.some(([action, subject]) => this.can(action, subject, data))
  }

  /**
   * Verifica se o usuário é administrador (tem permissão 'manage' para 'all')
   */
  isAdmin(): boolean {
    return this.rules.some((rule) => rule.action === "manage" && rule.subject === "all")
  }

  /**
   * Verifica se as condições são atendidas pelos dados
   */
  private checkConditions(conditions: Conditions, data: any): boolean {
    // Implementação simplificada - na prática, você precisaria de uma lógica mais robusta
    // para verificar condições complexas
    return Object.entries(conditions).every(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        // Para condições aninhadas
        return this.checkConditions(value, data[key] || {})
      }
      return data[key] === value
    })
  }

  /**
   * Atualiza as regras de permissão
   */
  update(rules: PermissionRule[]): void {
    this.rules = rules
  }

  /**
   * Obtém as regras atuais
   */
  getRules(): PermissionRule[] {
    return this.rules
  }
}
