import { Route, Routes } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "@/shared/enums/routes";
import { SettingsLayout } from "@/features/Settings";
import { MyAccount } from "@/features/Settings/components/MyAccount";
import { Appearance } from "@/features/Settings/components/Appearance";
import { Subscription } from "@/features/Settings/components/Subscription";
import { Carrier } from "@/features/carriers/pages/index";
import Order from "@/features/work-order/pages";
import WorkShopDashboard from "@/features/workshop-dashboard/pages";
// import { Employee } from "@/features/employee/page";
import { Service } from "@/features/service/page";
import NotFound from "@/components/NotFound";
import { PartsManager } from "@/features/part-manager/pages";
import CompanySelection from "@/features/SelectCompany";
import { Trailer } from "@/features/trailers/pages";
import { Checklist } from "@/features/checklist/pages";
import { Vehicle } from "@/features/vehicle/page";
import { Fleet } from "@/features/fleet/pages";
import { RootLayout } from "@/components/Layout/root-layout";
import { MaintenanceReport } from "@/features/maintenance/page";
import { Suspense } from "react";
import { Spinner } from "@/components/Spinner";
import { ProtectedRoute } from "./protected-route";
import { ActionEnum } from "@/core/permissions/enum/ability";
import { SubjectEnum } from "@/shared/enums/subject";
import LoginPage from "@/features/auth/login/page";
import UnauthorizedPage from "@/features/errors/unauthorized-page";
import ForbiddenPage from "@/features/errors/forbidden-page";
import { useSelectCompany } from "@/features/SelectCompany/hooks/useSelectCompany";
import { BoxPage } from "@/features/boxes/pages";
import { Employee } from "@/features/employee/page";

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
                <BoxPage />
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
        <Route path={PublicRoutes.Login} element={<LoginPage />} />
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
