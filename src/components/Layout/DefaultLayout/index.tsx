import { useAuth } from "@/app/Login/hooks/signIn";
import Navbar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import { PublicRoutes } from "@/shared/enums/routes";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  console.log("isAutenticated", isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PublicRoutes.Login);
    }
  });

  return (
    <div className="flex bg-background">
      <div>
        <Sidebar />
        <Navbar />
      </div>
      <div className="w-full sm:pl-12">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
