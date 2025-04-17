import type { ReactNode } from "react";
import { AuthProvider } from "@/core/auth/auth-provider";
import { PermissionsProvider } from "@/core/permissions/permissions-provider";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "@/components/error-boundary";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <PermissionsProvider>{children}</PermissionsProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
