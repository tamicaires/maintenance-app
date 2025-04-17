import { useAuth } from "@/core/auth/auth-provider";
import { usePermissions } from "@/core/permissions/permissions-provider";
import type { Action } from "@/core/permissions/types";
import type { TSubject } from "@/shared/enums/subject";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: {
    action: Action;
    subject: TSubject;
    conditions?: Record<string, any>;
  };
  requiredPermissions?: Array<{
    action: Action;
    subject: TSubject;
    conditions?: Record<string, any>;
  }>;
  requireAll?: boolean;
}

export function ProtectedRoute({
  children,
  requiredPermission,
  requiredPermissions,
  requireAll = true,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { ability, can, loading: permissionsLoading } = usePermissions();
  const location = useLocation();
  const debugRef = useRef(0);
  // Add state to track permission check result
  const [permissionCheckResult, setPermissionCheckResult] = useState<
    boolean | null
  >(null);

  // Use useEffect to check permissions only when ability is available
  useEffect(() => {
    // Only check permissions when authentication and permissions are loaded
    if (!authLoading && !permissionsLoading && isAuthenticated && ability) {
      let result = true;

      if (requiredPermission) {
        console.log("Checking required permission:", requiredPermission);
        result = hasPermission(
          requiredPermission.action,
          requiredPermission.subject,
          requiredPermission.conditions
        );
      } else if (requiredPermissions && requiredPermissions.length > 0) {
        result = requireAll
          ? hasAllPermissions(requiredPermissions)
          : hasAnyPermission(requiredPermissions);
      }

      setPermissionCheckResult(result);
    }
  }, [
    authLoading,
    permissionsLoading,
    isAuthenticated,
    ability,
    requiredPermission,
    requiredPermissions,
  ]);

  // Verificar se o usuário tem uma permissão específica
  const hasPermission = (
    action: Action,
    subject: TSubject,
    conditions?: Record<string, any>
  ): boolean => {
    debugRef.current += 1;

    if (!ability) {
      return false;
    }

    const result = can(action, subject, conditions);
    return result;
  };

  // Verificar se o usuário tem todas as permissões necessárias
  const hasAllPermissions = (
    permissions: Array<{
      action: Action;
      subject: TSubject;
      conditions?: Record<string, any>;
    }>
  ): boolean => {
    return permissions.every((permission) =>
      hasPermission(
        permission.action,
        permission.subject,
        permission.conditions
      )
    );
  };

  // Verificar se o usuário tem pelo menos uma das permissões necessárias
  const hasAnyPermission = (
    permissions: Array<{
      action: Action;
      subject: TSubject;
      conditions?: Record<string, any>;
    }>
  ): boolean => {
    return permissions.some((permission) =>
      hasPermission(
        permission.action,
        permission.subject,
        permission.conditions
      )
    );
  };

  // Show loading state while authentication or permissions are loading
  // or while we're waiting for the permission check to complete
  if (
    authLoading ||
    permissionsLoading ||
    (isAuthenticated && permissionCheckResult === null)
  ) {
    return <div>Carregando...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to forbidden page if permission check failed
  if (permissionCheckResult === false) {
    return <Navigate to="/forbidden" replace />;
  }

  // If authenticated and has required permissions, render children
  return <>{children}</>;
}
