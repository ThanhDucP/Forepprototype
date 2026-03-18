import { Outlet } from "react-router";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "sonner";

export default function Root() {
  return (
    <AuthProvider>
      <Outlet />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}
