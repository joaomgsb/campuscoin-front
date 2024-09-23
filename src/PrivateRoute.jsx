import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingPage from './pages/Loading';

const PrivateRoute = () => {
    const [isAuthenticated, setAuthenticated] = useState(null);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setAuthenticated(false);
            return;
        }

        const verifyToken = async () => {
            try {
                // Trocar de localhost para IP Publico
                const response = await fetch(`${baseUrl}/api/auth/verify-token`, {  // IP Publico ou Localhost
                    headers: {
                        'x-access-token': token,
                    },
                });

                if (response.ok) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }
            } catch (error) {
                setAuthenticated(false);
            }
        };

        verifyToken();
    }, []);

    if (isAuthenticated === null) {
        return <LoadingPage />
    }

    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;