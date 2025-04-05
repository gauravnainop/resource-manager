"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const NavBarComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => setIsOpen(!isOpen);
    const isActive = (href) => pathname === href || (href !== "/" && pathname.startsWith(href));

    return (
        <nav className="bg-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
            {/* Logo */}
            <div className="text-2xl font-bold text-blue-600">
                <Link 
                    href="/" 
                    onClick={() => setIsOpen(false)}
                    className={`hover:text-blue-700 transition-colors ${
                        isActive("/") ? "border-b-2 border-blue-600" : ""
                    }`}
                >
                    Poly Resource
                </Link>
            </div>

            {/* Hamburger Menu */}
            <div className="md:hidden z-50">
                <button 
                    onClick={toggleMenu} 
                    className="text-gray-700 hover:text-blue-600 focus:outline-none transition-transform"
                    aria-label="Toggle navigation menu"
                >
                    {isOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Navigation Links */}
            <div className={`absolute md:relative top-full left-0 right-0
                md:flex md:items-center md:space-x-6 bg-white md:bg-transparent
                shadow-md md:shadow-none transition-all duration-300 ease-in-out
                overflow-hidden ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 md:max-h-full md:opacity-100"}
                w-full md:w-auto`}>

                <div className="flex flex-col mx-4 md:flex-row items-center px-4 md:px-0 py-2 md:py-0 gap-4 md:gap-6">
                    {[
                        { href: "/questions", label: "Prev Year Questions" }
                    ].map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={toggleMenu}
                            className={`whitespace-nowrap transition-colors
                                ${isActive(link.href) 
                                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                                    : "text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-200"}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default NavBarComponent;