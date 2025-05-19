import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./authContext";

const ProtectedRoute = () => {
  const { userData, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!userData) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
