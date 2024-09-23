import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const [isAuthenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setAuthenticated(false);
            return;
        }

        const verifyToken = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/auth/verify-token', {
                    headers: {
                        'x-access-token': token,
                    }
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
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;