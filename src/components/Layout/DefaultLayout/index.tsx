import { useAuth } from "@/app/Login/hooks/signIn";
import { NavBar } from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import { useToast } from "@/components/Toast/toast";
import { getCookie } from "@/services/cookie";
import { PrivateRoutes, PublicRoutes } from "@/shared/enums/routes";
import { StorageEnum } from "@/shared/enums/storageEnum";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { ToastComponent } = useToast()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PublicRoutes.Login);
    } else {
      const companyId = getCookie(StorageEnum.CompanyId);
      if (!companyId) {
        navigate(PrivateRoutes.CompanySelection);
      }
    }
  }, [isAuthenticated, navigate]);

  return (
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
  );
};

export default MainLayout;
