import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const getAuthStatus = () => !!localStorage.getItem('isAuth');

const useAuthStatus = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(getAuthStatus);

    useEffect(() => {
        const syncAuth = () => setIsAuthenticated(getAuthStatus());

        window.addEventListener('auth-change', syncAuth);
        return () => window.removeEventListener('auth-change', syncAuth);
    }, []);

    return isAuthenticated;
};

const ProtectedRoute = () => {
    const isAuthenticated = useAuthStatus();
    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;