import { Navigate, Outlet } from "react-router";

function AdminLayout() {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  return <Outlet />;
}

export default AdminLayout;
