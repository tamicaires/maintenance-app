import type React from "react";
import { usePermissions } from "./permissions-provider";
import { Action, Subject } from "./types";
import { getCookie } from "@/shared/services/cookie";
import { StorageEnum } from "@/shared/enums/storageEnum";

interface CanProps {
  action: Action;
  subject: Subject;
  data?: any;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Componente para renderização condicional baseada em permissões
 */
export function Can({
  action,
  subject,
  data,
  children,
  fallback = null,
}: CanProps) {
  const { can } = usePermissions();
  const companyId = getCookie(StorageEnum.CompanyId);

  return can(action, subject, { companyId }) ? (
    <>{children}</>
  ) : (
    <>{fallback}</>
  );
}

interface CanAllProps {
  abilities: Array<[Action, Subject]>;
  data?: any;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Componente para renderização condicional baseada em múltiplas permissões (todas)
 */
export function CanAll({
  abilities,
  data,
  children,
  fallback = null,
}: CanAllProps) {
  const { canAll } = usePermissions();

  return canAll(abilities, data) ? <>{children}</> : <>{fallback}</>;
}

interface CanAnyProps {
  abilities: Array<[Action, Subject]>;
  data?: any;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Componente para renderização condicional baseada em múltiplas permissões (qualquer uma)
 */
export function CanAny({
  abilities,
  data,
  children,
  fallback = null,
}: CanAnyProps) {
  const { canAny } = usePermissions();

  return canAny(abilities, data) ? <>{children}</> : <>{fallback}</>;
}

interface IsAdminProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Componente para renderização condicional baseada em permissão de administrador
 */
export function IsAdmin({ children, fallback = null }: IsAdminProps) {
  const { isAdmin } = usePermissions();

  return isAdmin() ? <>{children}</> : <>{fallback}</>;
}
