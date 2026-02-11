"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppContext } from "./Context";
import {
    Menu,
    Home,
    Megaphone,
    Heart,
    MailCheck,
    MessageCircle,
    LogOut,
    ChevronLeft,
    ChevronRight,
    User,
    createLucideIcon
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

const Sidebar = () => {
    // 🔹 STATE MANAGEMENT
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const sidebarRef = useRef(null);
    const pathname = usePathname();
    const { adminSidebarOpen, setAdminSidebarOpen } = useAppContext();

    // 🔹 CHECK IF CURRENT PAGE IS ADMIN PAGE
    const isAdminPage = pathname?.startsWith("/admin");

    // 🔹 NAVIGATION ITEMS (UPDATED TO MATCH REQUIREMENTS)
    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: <Home size={20} /> },
        { name: "Campaigns", href: "/admin/campaigning/campaigns", icon: <Megaphone size={20} /> },
        { name: "Campaigns-create", href: "/admin/campaigning/create", icon: <createLucideIcon size={20} /> },
        { name: "Subscribers", href: "/admin/campaigning/subscribers", icon: <MailCheck size={20} /> },
        { name: "Contact Queries", href: "/admin/campaigning/query", icon: <MessageCircle size={20} /> },
     
    ];

    // 🔹 CLOSE MOBILE SIDEBAR WHEN CLICKING OUTSIDE
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsMobileOpen(false);
                setAdminSidebarOpen?.(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobileOpen, setAdminSidebarOpen]);

    // 🔹 FETCH USER DATA
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch("/api/me", {
                    credentials: "include",
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.loggedIn) {
                        setUserData(data.user || { name: "Admin User" });
                    }
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };
        if (isAdminPage) fetchUserData();
    }, [isAdminPage]);

    // 🔹 TOGGLE FUNCTIONS
    const toggleSidebar = () => {
        if (window.innerWidth < 1024) {
            setIsMobileOpen(!isMobileOpen);
            setAdminSidebarOpen?.(!isMobileOpen);
        } else {
            setIsExpanded(!isExpanded);
        }
    };

    const closeMobile = () => {
        setIsMobileOpen(false);
        setAdminSidebarOpen?.(false);
    };

    // 🔹 HELPER FUNCTIONS
    const isActive = (href) => pathname === href;

    // 🔹 DON'T RENDER ON NON-ADMIN PAGES
    if (!isAdminPage) return null;

    // Determine sidebar state
    const isDesktopCollapsed = !isExpanded && !isMobileOpen;
    const isSidebarVisible = isExpanded || isMobileOpen;
    const sidebarWidth = isDesktopCollapsed ? "w-[80px]" : "w-[260px]";

    return (
        <>
            {/* MOBILE MENU BUTTON - HAMBURGER ICON ON TOP */}
            <button
                onClick={toggleSidebar}
                className="fixed top-5 left-5 lg:hidden z-50 p-2.5 bg-white/80 backdrop-blur-md border border-gray-200/80 text-gray-700 rounded-2xl shadow-lg hover:bg-white transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Toggle menu"
                aria-expanded={isMobileOpen}
            >
                <Menu size={22} />
            </button>

            {/* MOBILE OVERLAY */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                    onClick={closeMobile}
                    aria-hidden="true"
                />
            )}

            {/* SIDEBAR - APPLE STYLE GLASSMORPHISM */}
            <aside
                ref={sidebarRef}
                className={`
                    fixed top-0 left-0 h-screen z-50
                    flex flex-col
                    bg-white/80 backdrop-blur-xl backdrop-saturate-150
                    border-r border-gray-200/50
                    shadow-[0_8px_32px_rgba(0,0,0,0.06)]
                    rounded-2xl lg:rounded-none lg:rounded-r-2xl
                    transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                    ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                    ${sidebarWidth}
                `}
                aria-label="Admin navigation"
            >
                {/* HEADER WITH LOGO & TOGGLE */}
                <div className={`
                    flex items-center h-20 px-5 border-b border-gray-200/50
                    ${isDesktopCollapsed ? "justify-center" : "justify-between"}
                `}>
                    {/* LOGO - ONLY SHOW WHEN EXPANDED */}
                    {!isDesktopCollapsed && (
                        <div className="flex items-center gap-2.5 animate-in fade-in duration-300">
                            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-200/50">
                                <span className="font-semibold text-white text-lg">A</span>
                            </div>
                            <div>
                                <h1 className="font-semibold text-gray-800 text-base tracking-tight">AdminPro</h1>
                                <p className="text-[11px] text-gray-500">Dashboard</p>
                            </div>
                        </div>
                    )}

                    {/* TOGGLE BUTTON - ONLY ON DESKTOP */}
                    <button
                        onClick={toggleSidebar}
                        className={`
                            hidden lg:flex items-center justify-center
                            w-8 h-8 rounded-xl
                            text-gray-500 hover:text-blue-600
                            bg-gray-50/80 hover:bg-blue-50
                            border border-gray-200/50 hover:border-blue-200
                            transition-all duration-200 hover:scale-110
                        `}
                        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
                    >
                        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                    </button>
                </div>

                {/* USER PROFILE SECTION - APPLE STYLE */}
                <div className={`
                    px-4 py-5 border-b border-gray-200/50
                    ${isDesktopCollapsed ? "flex justify-center" : ""}
                `}>
                    <div className={`
                        flex items-center gap-3
                        ${isDesktopCollapsed ? "flex-col" : ""}
                    `}>
                        {/* AVATAR WITH STATUS */}
                        <div className="relative">
                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm ring-2 ring-white/50">
                                {userData?.avatar ? (
                                    <img src={userData.avatar} alt="Admin" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <User size={20} className="text-white" />
                                )}
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                        </div>

                        {/* USER INFO - FADE ANIMATION */}
                        {!isDesktopCollapsed && (
                            <div className="flex-1 min-w-0 animate-in fade-in slide-in-from-left-2 duration-300">
                                <h3 className="font-medium text-gray-800 text-sm truncate">
                                    {userData?.name || "Alex Morgan"}
                                </h3>
                                <p className="text-xs text-gray-500 truncate">Administrator</p>
                            </div>
                        )}

                        {/* TOOLTIP WHEN COLLAPSED */}
                        {isDesktopCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                                {userData?.name || "Alex Morgan"}
                            </div>
                        )}
                    </div>
                </div>

                {/* NAVIGATION - PREMIUM HOVER EFFECTS */}
                <nav className="flex-1 overflow-y-auto py-6 px-3" aria-label="Main navigation">
                    <div className="space-y-1.5">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                                        group relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                                        transition-all duration-200 ease-out
                                        ${active
                                            ? "bg-blue-500/10 text-blue-600 shadow-sm shadow-blue-200/50"
                                            : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
                                        }
                                        ${isDesktopCollapsed ? "justify-center" : ""}
                                    `}
                                    aria-current={active ? "page" : undefined}
                                >
                                    {/* LEFT BORDER INDICATOR FOR ACTIVE LINK */}
                                    {active && (
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full" />
                                    )}

                                    {/* ICON WITH SCALE ANIMATION ON HOVER */}
                                    <span className={`
                                        flex-shrink-0 transition-transform duration-200 group-hover:scale-110
                                        ${active ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"}
                                    `}>
                                        {item.icon}
                                    </span>

                                    {/* TEXT WITH FADE ANIMATION */}
                                    {!isDesktopCollapsed && (
                                        <span className="font-medium text-sm transition-all duration-200 animate-in fade-in">
                                            {item.name}
                                        </span>
                                    )}

                                    {/* TOOLTIP ON COLLAPSED STATE */}
                                    {isDesktopCollapsed && (
                                        <span className="absolute left-full ml-2 px-2.5 py-1.5 bg-gray-800/90 backdrop-blur-sm text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-lg">
                                            {item.name}
                                        </span>
                                    )}

                                    {/* ACTIVE GLOW EFFECT */}
                                    {active && (
                                        <span className="absolute inset-0 rounded-xl bg-blue-400/5 animate-pulse" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* LOGOUT BUTTON AT BOTTOM - PREMIUM STYLING */}
                <div className="p-4 border-t border-gray-200/50">
                    <button
                        onClick={() => {/* logout handler */ }}
                        className={`
                            group relative flex items-center gap-3 w-full
                            ${isDesktopCollapsed ? "justify-center" : "justify-start"}
                            px-3 py-2.5 rounded-xl
                            bg-red-50/80 hover:bg-red-100
                            text-red-600 hover:text-red-700
                            transition-all duration-200
                            border border-red-100/50 hover:border-red-200
                        `}
                        aria-label="Logout"
                    >
                        <LogOut size={18} className="transition-transform duration-200 group-hover:scale-110" />
                        {!isDesktopCollapsed && (
                            <span className="font-medium text-sm transition-all animate-in fade-in">Logout</span>
                        )}
                        {isDesktopCollapsed && (
                            <span className="absolute left-full ml-2 px-2.5 py-1.5 bg-gray-800/90 backdrop-blur-sm text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-lg">
                                Logout
                            </span>
                        )}
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT PADDING */}
            <div className={`
                transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                ${isExpanded && !isMobileOpen ? "lg:pl-[260px]" : "lg:pl-[80px]"}
            `} />
        </>
    );
};

export default Sidebar;