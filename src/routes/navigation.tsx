import { Carrier } from "@/app/Carrier";
import MainLayout from "@/components/Layout/DefaultLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Carrier />} />
          {/* <Route path="/orders" element={<Orders />} /> */}
        </Route>
        <Route path="/" element={<Carrier />} />
      </Routes>
    </BrowserRouter>
  );
}
