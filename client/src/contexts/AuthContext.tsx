import type { CurrentUser } from "../types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../utils/api";

type AuthContextValue = {
    currentUser: CurrentUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string, user: CurrentUser) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
    currentUser: null,
    isAuthenticated: false,
    isLoading: false,
    login: () => {},
    logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    function login(token: string, user: CurrentUser) {
        localStorage.setItem('auth-token', token);
        setCurrentUser(user);
        setIsAuthenticated(true);
    }
    function logout() {
        localStorage.removeItem('auth-token');
        setCurrentUser(null);
        setIsAuthenticated(false);
    }

    useEffect(() => {
        getCurrentUser()
         .then((res) => {
            setCurrentUser(res.data);
            setIsAuthenticated(true);
        })
        .catch(() => {
        localStorage.removeItem('auth-token');
        })
        .finally(() => {
        setIsLoading(false);
        });
    }, []);


    return (
        <AuthContext.Provider value={{ currentUser, isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}