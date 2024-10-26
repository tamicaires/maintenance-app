import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "@/shared/enums/routes";
import MainLayout from "@/components/Layout/DefaultLayout";
import { SettingsLayout } from "@/app/Settings";
import { MyAccount } from "@/app/Settings/components/MyAccount";
import { Appearance } from "@/app/Settings/components/Appearance";
import { Subscription } from "@/app/Settings/components/Subscription";
import { Carrier } from "@/app/Carrier";
import { Login } from "@/app/Login";
import Order from "@/app/Order";
import WorkShopDashboard from "@/app/WorkShopDashboard";
import { Employee } from "@/app/Employee";
import { Service } from "@/app/Services";
import NotFound from "@/components/NotFound";
import { PartsManager } from "@/app/PartsManager";
import CompanySelection from "@/app/SelectCompany";
import { Trailer } from "@/app/Trailer";
import MaintenanceChecklist from "@/app/Checklist";
import { Vehicle } from "@/app/Vehicles";
import { Fleet } from "@/app/Fleet";
import { BoxManagement } from "@/app/Box";

export function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={PrivateRoutes.CompanySelection}
          element={<CompanySelection />}
        />
        <Route path={PrivateRoutes.Home} element={<MainLayout />}>
          <Route path={PrivateRoutes.Home} element={<div>Home</div>} />
          <Route
            path={PrivateRoutes.WorkShop}
            element={<WorkShopDashboard />}
          />
          <Route path={PrivateRoutes.WorkOrders} element={<Order />} />
          <Route path={PrivateRoutes.Carrier} element={<Carrier />} />
          <Route path={PrivateRoutes.Fleet} element={<Fleet />} />
          <Route path={PrivateRoutes.Employees} element={<Employee />} />
          <Route path={PrivateRoutes.Services} element={<Service />} />
          <Route path={PrivateRoutes.Trailer} element={<Trailer />} />
          <Route path={PrivateRoutes.Vehicle} element={<Vehicle />} />
          <Route path={PrivateRoutes.Box} element={<BoxManagement />} />
          <Route
            path={PrivateRoutes.PartsManagement}
            element={<PartsManager />}
          />
          <Route
            path={PrivateRoutes.MaintenanceChecklist}
            element={<MaintenanceChecklist />}
          />
          {/* <Route path={"pneu"} element={<GestaoReboque />} /> */}
          <Route path={PrivateRoutes.Settings} element={<SettingsLayout />}>
            <Route path={PrivateRoutes.Account} element={<MyAccount />} />
            <Route path={PrivateRoutes.Appearance} element={<Appearance />} />
            <Route
              path={PrivateRoutes.Subscription}
              element={<Subscription />}
            />
          </Route>
        </Route>
        <Route path={PublicRoutes.Login} element={<Login />} />
        <Route path={PublicRoutes.Register} element={<div>Register</div>} />
        <Route
          path={PublicRoutes.ForgotPassword}
          element={<div>Forgot Password</div>}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
