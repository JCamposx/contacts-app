import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { routes } from "../routes/routes";

export default function ProtectedRoute({ isAuthRoute = false, children }) {
  const authRoutes = [routes.auth.login, routes.auth.register];

  const { user } = useContext(AuthContext);

  const location = useLocation();

  if (!user) {
    if (!isAuthRoute) return <Navigate to={routes.auth.login} />;

    return children ? children : <Outlet />;
  }

  if (authRoutes.includes(location.pathname)) {
    return <Navigate to={routes.home} />;
  }

  return children ? children : <Outlet />;
}
