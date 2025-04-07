import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../auth/auth-provider";
import apiClient from "../api/api-client";

export type Resource = "users" | "products" | "orders" | "reports" | string;
export type Action =
  | "create"
  | "read"
  | "update"
  | "delete"
  | "manage"
  | string;

export type Permission = {
  resource: Resource;
  actions: Action[];
};

export type Role = {
  id: string;
  name: string;
  permissions: Permission[];
};

type PermissionsContextType = {
  userPermissions: Permission[];
  userRoles: Role[];
  can: (action: Action, resource: Resource) => boolean;
  hasRole: (roleName: string) => boolean;
  isLoading: boolean;
};

const PermissionsContext = createContext<PermissionsContextType | undefined>(
  undefined
);

export function PermissionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated } = useAuth();
  const [userPermissions, setUserPermissions] = useState<Permission[]>([]);
  const [userRoles, setUserRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPermissions = async () => {
      if (!isAuthenticated || !user) {
        setUserPermissions([]);
        setUserRoles([]);
        setIsLoading(false);
        return;
      }

      try {
        // Fetch user permissions from API
        const response = await apiClient.get("/auth/permissions");
        const { permissions, roles } = response.data;

        setUserPermissions(permissions);
        setUserRoles(roles);
      } catch (error) {
        console.error("Error fetching permissions:", error);
        // Set default permissions if API fails
        setUserPermissions([]);
        setUserRoles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPermissions();
  }, [isAuthenticated, user]);

  const can = (action: Action, resource: Resource): boolean => {
    if (!isAuthenticated) return false;

    // Check if user has wildcard permission
    const wildcardPermission = userPermissions.find(
      (p) => p.resource === "*" && p.actions.includes("*")
    );
    if (wildcardPermission) return true;

    // Check if user has permission for the specific resource
    const resourcePermission = userPermissions.find(
      (p) => p.resource === resource
    );
    if (!resourcePermission) return false;

    // Check if user has wildcard action for this resource
    if (resourcePermission.actions.includes("*")) return true;

    // Check if user has the specific action for this resource
    return (
      resourcePermission.actions.includes(action) ||
      resourcePermission.actions.includes("manage")
    );
  };

  const hasRole = (roleName: string): boolean => {
    return userRoles.some((role) => role.name === roleName);
  };

  return (
    <PermissionsContext.Provider
      value={{
        userPermissions,
        userRoles,
        can,
        hasRole,
        isLoading,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
}

export const usePermissions = () => {
  const context = useContext(PermissionsContext);
  if (context === undefined) {
    throw new Error(
      "usePermissions deve ser usado dentro de um PermissionsProvider"
    );
  }
  return context;
};
