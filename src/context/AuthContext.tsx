'use client'
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

import database from "@/db/db.json";

type UserCredential = {
    username: string;
    password: string;
} | null;

type AuthContextType = {
    user: UserCredential;
    login: (userData: UserCredential) => void;
    logout: () => void;
};

const AuthContext= createContext<AuthContextType | undefined>(undefined);

export const AuthProvider  = ({ children }: any) => {
    const [user, setUser] = useState<UserCredential>(null);

    const router = useRouter();

    const login = (userData: UserCredential) => {
        const user = database.find(u => u.username === userData?.username && u.password === userData.password);
        
        if (user) {
            setUser(userData);
            router.push(`/u/${user.username}/quizzes`);
        }
        alert('Usuario o contraseña incorrectos')

    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useUser debe usarse dentro de UserProvider");
    }
    return context;
};