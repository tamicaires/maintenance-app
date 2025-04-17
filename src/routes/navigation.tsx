import { Route, Routes } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "@/shared/enums/routes";
import { SettingsLayout } from "@/app/Settings";
import { MyAccount } from "@/app/Settings/components/MyAccount";
import { Appearance } from "@/app/Settings/components/Appearance";
import { Subscription } from "@/app/Settings/components/Subscription";
import { Carrier } from "@/app/carriers/pages/index";
import { Login } from "@/app/Login";
import Order from "@/app/work-order/pages";
import WorkShopDashboard from "@/app/workshop-dashboard/pages";
import { Employee } from "@/app/employee/page";
import { Service } from "@/app/service/page";
import NotFound from "@/components/NotFound";
import { PartsManager } from "@/app/part-manager/pages";
import CompanySelection from "@/app/SelectCompany";
import { Trailer } from "@/app/trailers/pages";
import { Checklist } from "@/app/checklist/pages";
import { Vehicle } from "@/app/vehicle/page";
import { Fleet } from "@/app/fleet/pages";
import { BoxManagement } from "@/app/boxes";
import { RootLayout } from "@/components/Layout/root-layout";
import { MaintenanceReport } from "@/app/maintenance/page";
import { Suspense } from "react";
import { Spinner } from "@/components/Spinner";
import { ProtectedRoute } from "./protected-route";
import { ActionEnum } from "@/core/permissions/enum/ability";
import { SubjectEnum } from "@/shared/enums/subject";
import LoginPage from "@/app/auth/login/page";
import UnauthorizedPage from "@/app/errors/unauthorized-page";
import ForbiddenPage from "@/app/errors/forbidden-page";
import { useSelectCompany } from "@/app/SelectCompany/hooks/useSelectCompany";
// import LoginPage from "@/app/auth/login/page"

export function Navigation() {
  const { companySelected } = useSelectCompany();

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route
          path={PrivateRoutes.CompanySelection}
          element={<CompanySelection />}
        />
        <Route path={PrivateRoutes.Home} element={<RootLayout />}>
          <Route path={PrivateRoutes.Home} element={<WorkShopDashboard />} />
          <Route path={PrivateRoutes.WorkOrders} element={<Order />} />
          <Route path={PrivateRoutes.Carrier} element={<Carrier />} />
          <Route path={PrivateRoutes.Fleet} element={<Fleet />} />

          <Route
            path={PrivateRoutes.Employees}
            element={
              <ProtectedRoute
                requiredPermission={{
                  action: ActionEnum.Read,
                  subject: SubjectEnum.Employee,
                }}
              >
                <Employee />
              </ProtectedRoute>
            }
          />
          <Route path={PrivateRoutes.Services} element={<Service />} />
          <Route path={PrivateRoutes.Trailer} element={<Trailer />} />
          <Route path={PrivateRoutes.Vehicle} element={<Vehicle />} />
          {/* <Route path={PrivateRoutes.Box} element={<BoxManagement />} /> */}
          <Route
            path={PrivateRoutes.Box}
            element={
              <ProtectedRoute
                requiredPermission={{
                  action: ActionEnum.Create,
                  subject: SubjectEnum.Carrier,
                  conditions: { companyId: companySelected },
                }}
              >
                <BoxManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path={PrivateRoutes.Maintenance}
            element={<MaintenanceReport />}
          />
          <Route
            path={PrivateRoutes.PartsManagement}
            element={<PartsManager />}
          />
          <Route
            path={PrivateRoutes.MaintenanceChecklist}
            element={<Checklist />}
          />
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
        {/* Error pages */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />
      </Routes>
    </Suspense>
  );
}
