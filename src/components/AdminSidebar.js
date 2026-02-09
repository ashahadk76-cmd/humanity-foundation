"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAppContext } from "./Context";
import {
    SidebarClose,
    Home,
    PlusSquare,
    List,
    LogOut,
    Users,
    BarChart3,
    User,
    Menu
} from "lucide-react";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const router = useRouter();
    const pathname = usePathname();
    const { adminSidebarOpen, setAdminSidebarOpen } = useAppContext();
    const [activeRoute, setActiveRoute] = useState("");

    useEffect(() => {
        checkLoginStatus();
    }, []);

    useEffect(() => {
        if (pathname) {
            setActiveRoute(pathname);
        }
    }, [pathname]);

    const checkLoginStatus = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/me", {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            setLoggedIn(data.loggedIn);
            setUserData(data.user || null);

            if (!data.loggedIn && pathname?.startsWith("/admin")) {
                router.push("/admin-login");
            }
        } catch (error) {
            console.error("Error checking login status:", error);
            setLoggedIn(false);
            if (pathname?.startsWith("/admin")) {
                router.push("/admin-login");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/admin-logout", {
            method: "POST",
            credentials: "include",
        });
        setLoggedIn(false);
        setUserData(null);
        router.push("/admin-login");
    };

    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: <Home size={20} /> },
        { name: "Create Campaign", href: "/admin/campaigning/create", icon: <PlusSquare size={20} /> },
        { name: "Campaigns", href: "/admin/campaigning/campaigns", icon: <List size={20} /> },
        { name: "Users", href: "/admin/campaigning/users", icon: <Users size={20} /> },
        { name: "Analytics", href: "/admin/analytics", icon: <BarChart3 size={20} /> },
    ];

    if (loading) {
        return (
            <div className="fixed top-0 left-0 w-20 h-screen bg-white/95 backdrop-blur-sm z-40 lg:flex hidden items-center justify-center border-r border-gray-200">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!loggedIn) return null;

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setAdminSidebarOpen(!adminSidebarOpen)}
                className="fixed top-4 left-4 lg:hidden z-50 p-2 bg-white border border-gray-300 text-gray-700 rounded-lg shadow-sm"
            >
                <Menu size={24} />
            </button>

            {/* Mobile Overlay */}
            {adminSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setAdminSidebarOpen(false)}
                />
            )}

            {/* Sidebar Container - WHITE TRANSPARENT */}
            <aside
                className={`fixed top-0 left-0 h-screen bg-white/95 backdrop-blur-sm flex flex-col border-r border-gray-200 transition-all duration-300 z-50 ${adminSidebarOpen
                    ? "w-64 translate-x-0"
                    : "w-20 -translate-x-full lg:translate-x-0"
                    }`}
            >
                {/* Header */}
                <div className="p-5 border-b border-gray-200 ">
                    <div className="flex items-center justify-between">
                        <div className={`flex items-center gap-3 ${!adminSidebarOpen && "lg:justify-center"}`}>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-sm">
                                <span className="font-bold text-white text-lg">A</span>
                            </div>
                            {adminSidebarOpen && (
                                <div>
                                    <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
                                    <p className="text-xs text-gray-500">Control Center</p>
                                </div>
                            )}
                        </div>

                        {/* Close Button */}
                        {adminSidebarOpen && (
                            <button
                                onClick={() => setAdminSidebarOpen(false)}
                                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                            >
                                <SidebarClose size={20} />
                            </button>
                        )}
                    </div>
                </div>

                {/* User Profile */}
                <div className="p-4 border-b border-gray-200">
                    <div className={`flex items-center gap-3 ${!adminSidebarOpen && "lg:justify-center"}`}>
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                <User size={18} className="text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        {adminSidebarOpen && (
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-800 truncate">{userData?.name || "Admin"}</h3>
                                <p className="text-xs text-gray-500 truncate">Administrator</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-4">
                    <div className="px-3 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => {
                                    setActiveRoute(item.href);
                                    if (window.innerWidth < 1024) {
                                        setAdminSidebarOpen(false);
                                    }
                                }}
                                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${activeRoute === item.href
                                    ? "bg-blue-50 text-blue-600 border-l-3 border-blue-600"
                                    : "text-gray-600 hover:bg-gray-100"
                                    } ${!adminSidebarOpen && "lg:justify-center lg:px-3"}`}
                            >
                                <div className="flex-shrink-0">
                                    {item.icon}
                                </div>
                                {adminSidebarOpen && (
                                    <span className="font-medium">{item.name}</span>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Footer - Logout */}
                <div className="p-4 border-t border-gray-200">
                    {adminSidebarOpen ? (
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-3 w-full bg-red-50 hover:bg-red-100 text-red-600 px-4 py-3 rounded-lg font-medium transition-colors"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="hidden lg:flex items-center justify-center w-full p-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                            aria-label="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    )}
                </div>
            </aside>

            {/* Main Content Padding */}
            <div className={`transition-all duration-300 ${adminSidebarOpen ? "lg:ml-64" : "lg:ml-20"
                }`}></div>
        </>
    );
};

export default Sidebar;