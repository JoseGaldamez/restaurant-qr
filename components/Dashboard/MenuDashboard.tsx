'use client'
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { logout } from "@/server/auth";
import { showToast } from "nextjs-toast-notify";
import { useRouter } from "next/navigation";
import { UserLogged } from "@/models/userLogged.model";

export const MenuDashboard = ({ user }: { user?: UserLogged }) => {

    const router = useRouter();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Cierra el menú si se hace clic fuera
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {

        const result = await logout();
        if (result.success) {
            router.push("/");
        } else {
            showToast.error(result.message, {
                duration: 4000,
                progress: true,
                position: "bottom-right",
                transition: "bottomToTopBounce",
                icon: '',
                sound: false,
            });
        }
    }

    return (
        <nav className="w-full bg-white shadow px-6 py-4 flex items-center justify-between">
            {/* Logo o nombre */}
            <div className="max-w-7xl mx-auto flex items-center justify-between w-full">

                <div className="flex items-center gap-3">
                    <span className="font-bold text-xl text-gray-800">
                        <Link href="/dashboard">
                            Restaurant<span className="text-red-500">QR</span>
                        </Link>
                    </span>
                    <ul className="hidden md:flex gap-6 ml-8">

                        <li>
                            <Link
                                href="/dashboard/menu"
                                className="text-gray-700 hover:text-red-500 font-medium"
                            >
                                Menú
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/qr"
                                className="text-gray-700 hover:text-red-500 font-medium"
                            >
                                QR
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/settings"
                                className="text-gray-700 hover:text-red-500 font-medium"
                            >
                                Personalización
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* Avatar y menú desplegable */}
                <div className="relative" ref={menuRef}>
                    <button
                        className="flex items-center gap-2 focus:outline-none"
                        onClick={() => setOpen((v) => !v)}
                    >
                        <img
                            src={user?.picture || "/images/profile_placeholder.png"}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full border-2 border-red-400 object-cover"
                        />
                        <span className="text-gray-800 font-semibold">
                            {user?.name || "Usuario"}
                        </span>
                        <svg
                            className="w-4 h-4 text-gray-400 ml-1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {open && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg pt-2 z-50 overflow-hidden">
                            <Link
                                href="/dashboard/profile"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Perfil
                            </Link>
                            <hr />
                            <button onClick={handleLogout}
                                className="w-full text-left px-4 py-2 bg-gray-100 text-red-400 hover:bg-red-500 hover:text-white focus:outline-none"
                            // onClick={handleLogout}
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
