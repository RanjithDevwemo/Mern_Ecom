import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        // Check if there's an auth token in local storage
        const token = localStorage.getItem('auth-token');
        if (token) {
            setAuth(true);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('auth-token', token);
        setAuth(true);
    };

    const logout = () => {
        localStorage.removeItem('auth-token');
        setAuth(false);
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
