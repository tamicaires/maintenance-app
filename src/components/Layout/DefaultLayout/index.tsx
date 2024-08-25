import Sidebar from "@/components/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="w-full sm:pl-12">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
