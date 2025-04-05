import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchComponent from "../header/Search";
import SignInComponent from "../header/SignIn";

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    return (
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
            {/* Logo */}
            <div className="text-xl font-bold text-black">NewsApp</div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
                <SearchComponent />
                <SignInComponent />
            </div>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" className="md:hidden" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? <X size={24} className="text-black" /> : <Menu size={24} className="text-black" />}
            </Button>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white p-4 shadow-md flex flex-col items-center gap-4 md:hidden">
                    <SearchComponent />
                    <SignInComponent />
                </div>
            )}
        </header>
    );
};

export default Header;
