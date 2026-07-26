import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchUser = async () => {
        console.log("Calling /auth/me...");

        try {
            const data = await authService.getCurrentUser();

            console.log("Response:", data);

            setUser(data.user);
        } catch (error) {
            console.log("Error:", error.response?.status);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    fetchUser();
}, []); 
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}