import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const ProtectedRoute = ({ children }: {
    children: React.ReactNode;
}) => {
    const { profile } = useAuth();

    if (!profile && window.location.pathname !== "/dashboard/login") {
        return <Navigate to="/dashboard/login" />;
    }

    return children;
};

export default ProtectedRoute;