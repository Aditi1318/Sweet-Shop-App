// import React, {createContext, useContext, useState, useEffect} from "react";
// import {authAPI} from "../lib/api";
// import {useToast} from "@/hooks/use-toast";

// const AuthContext = createContext();

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// export const AuthProvider = ({children}) => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const {toast} = useToast();

//     useEffect(() => {
//         // Check for existing auth data on mount
//         const storedToken = localStorage.getItem("token");
//         const storedUser = localStorage.getItem("user");

//         if (storedToken && storedUser) {
//             setToken(storedToken);
//             setUser(JSON.parse(storedUser));
//         }
//         setLoading(false);
//     }, []);

//     const login = async (credentials) => {
//         try {
//             setLoading(true);
//             const response = await authAPI.login(credentials);
//             const {token: newToken, user: userData} = response.data;

//             localStorage.setItem("token", newToken);
//             localStorage.setItem("user", JSON.stringify(userData));

//             setToken(newToken);
//             setUser(userData);

//             toast({
//                 title: "Welcome back!",
//                 description: `Hello ${userData.username || userData.email}!`,
//             });

//             return {success: true};
//         } catch (error) {
//             const message = error.response?.data?.message || "Login failed";
//             toast({
//                 title: "Login Failed",
//                 description: message,
//                 variant: "destructive",
//             });
//             return {success: false, error: message};
//         } finally {
//             setLoading(false);
//         }
//     };

//     const register = async (userData) => {
//         try {
//             setLoading(true);
//             const response = await authAPI.register(userData);

//             toast({
//                 title: "Registration successful!",
//                 description: "Please log in with your credentials.",
//             });

//             return {success: true};
//         } catch (error) {
//             const message = error.response?.data?.message || "Registration failed";
//             toast({
//                 title: "Registration Failed",
//                 description: message,
//                 variant: "destructive",
//             });
//             return {success: false, error: message};
//         } finally {
//             setLoading(false);
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         setToken(null);
//         setUser(null);
//         toast({
//             title: "Logged out",
//             description: "See you soon!",
//         });
//     };

//     const isAdmin = () => {
//         return user?.role === "ADMIN";
//     };

//     const value = {
//         user,
//         token,
//         loading,
//         login,
//         register,
//         logout,
//         isAdmin,
//         isAuthenticated: !!token,
//     };

//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
import React, {createContext, useContext, useState, useEffect} from "react";
import {authAPI} from "../lib/api"; // This now points to your real API calls
import {useToast} from "@/hooks/use-toast";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true); // Manages initial auth check loading
    const {toast} = useToast();

    useEffect(() => {
        // This effect runs once on app startup to check for an existing session
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const response = await authAPI.login(credentials);
            const {token: newToken, user: userData} = response.data;

            // Store session data in localStorage
            localStorage.setItem("token", newToken);
            localStorage.setItem("user", JSON.stringify(userData));

            // Update state
            setToken(newToken);
            setUser(userData);

            toast({
                title: "Welcome back!",
                description: `Hello ${userData.username}!`,
            });
            return {success: true};
        } catch (error) {
            const message = error.response?.data?.message || "Invalid username or password.";
            toast({
                title: "Login Failed",
                description: message,
                variant: "destructive",
            });
            console.error("Login Error:", error.response);
            return {success: false, error: message};
        }
    };

    const register = async (userData) => {
        try {
            await authAPI.register(userData);

            toast({
                title: "Registration successful!",
                description: "You can now log in with your new account.",
            });
            return {success: true};
        } catch (error) {
            const message = error.response?.data || "Registration failed. Please try again.";
            toast({
                title: "Registration Failed",
                description: message,
                variant: "destructive",
            });
            console.error("Registration Error:", error.response);
            return {success: false, error: message};
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        toast({
            title: "Logged out",
            description: "See you again soon!",
        });
    };

    const isAdmin = () => {
        return user?.role === "ADMIN";
    };

    const value = {
        user,
        token,
        loading,
        isAuthenticated: !!token, // Simplified boolean check
        isAdmin,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
