import { NavBar } from "@/components/navbar/navbar";
import Sidebar from "@/components/Sidebar";
import { useToast } from "@/components/Toast/toast";
import { Outlet } from "react-router-dom";
import { AuthGuard } from "../auth-guard";
import { CompanyGuard } from "../company-guard";

export function RootLayout() {
  const { ToastComponent } = useToast();
  return (
    <AuthGuard>
      <CompanyGuard>
        <div className="flex h-screen bg-background">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <NavBar />
            <main className="flex-1 overflow-y-auto py-4 sm:pl-16">
              <Outlet />
            </main>
            <ToastComponent />
          </div>
        </div>
      </CompanyGuard>
    </AuthGuard>
  );
}
