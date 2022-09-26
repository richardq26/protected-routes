import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({
  isAllowed,
  children,
  user,
  redirectTo = "/landing",
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }
  // para el caso analytics, devuelve el children y no el outlet dentro
  return children ? children : <Outlet />;
};
