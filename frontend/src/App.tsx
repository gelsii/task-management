import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import SignInPage from "./auth/Sign-in-page";
import SignUpPage from "./auth/Sign-up-page";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import CreateTask from "./pages/CreateTask";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route
            path="/"
            element={<Navigate to="/auth/signin" replace={true} />}
          />
          <Route element={<AuthLayout />}>
            <Route path="/auth/signin" element={<SignInPage />} />
            <Route path="/auth/signup" element={<SignUpPage />} />
          </Route>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/create-task" element={<CreateTask />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
