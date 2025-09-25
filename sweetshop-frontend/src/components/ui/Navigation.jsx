import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Button} from "./Button";
import {useAuth} from "@/contexts/AuthContext";
import {Candy, LogOut, Settings, Store} from "lucide-react";

const Navigation = () => {
    const {user, logout, isAuthenticated, isAdmin} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-card border-b border-border shadow-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                        <Candy className="h-6 w-6" />
                        Sweet Shop
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard">
                                    <Button
                                        variant={isActive("/dashboard") ? "default" : "ghost"}
                                        size="sm"
                                        className="flex items-center gap-2"
                                    >
                                        <Store className="h-4 w-4" />
                                        Dashboard
                                    </Button>
                                </Link>

                                {isAdmin() && (
                                    <Link to="/admin">
                                        <Button
                                            variant={isActive("/admin") ? "admin" : "ghost"}
                                            size="sm"
                                            className="flex items-center gap-2"
                                        >
                                            <Settings className="h-4 w-4" />
                                            Admin
                                        </Button>
                                    </Link>
                                )}

                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    Welcome,{" "}
                                    <span className="font-medium text-foreground">{user?.username || user?.email}</span>
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="flex items-center gap-2"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant={isActive("/login") ? "default" : "ghost"} size="sm">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant={isActive("/register") ? "secondary" : "outline"} size="sm">
                                        Register
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
