import { useAuth } from "@/app/Login/hooks/signIn";
import { NavBar } from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import { PublicRoutes } from "@/shared/enums/routes";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PublicRoutes.Login);
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
      </div>
    </div>
  );
};

export default MainLayout;
