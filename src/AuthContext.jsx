import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUserData = localStorage.getItem('userData');
        if (token && storedUserData) {
            setIsAuthenticated(true);
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const login = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(user));
        setIsAuthenticated(true);
        setUserData(user);
    };
 
    const logout = () => {
        setIsAuthenticated(false);
        setUserData(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userData }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };