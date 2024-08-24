import Sidebar from "@/components/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen w-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
