import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function ProtectedRoute() {
    const context = useOutletContext();
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) return null;
    return isAuthenticated ? <Outlet context={context}/> : <Navigate to="/login" replace />;
}

export function PublicRoute() {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) return null;
    return isAuthenticated ? <Navigate to="/knowledge" replace /> : <Outlet />;
}