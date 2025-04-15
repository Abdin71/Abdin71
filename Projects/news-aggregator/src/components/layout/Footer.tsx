import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="text-black py-8 px-4 text-sm text-center border-gray-200 border-t">
            {/* Links Section */}
            <div className="flex gap-6 justify-center text-gray-600 hover:text-gray-900">
                <a href="#about" className="hover:text-gray-900">About</a>
                <a href="#privacy" className="hover:text-gray-900">Privacy Policy</a>
                <a href="#terms" className="hover:text-gray-900">Terms of Service</a>
            </div>

            {/* Social Media Section */}
            <div className="flex gap-6 justify-center mt-4">
                <a href="#" aria-label="Facebook">
                    <FaFacebook className="text-gray-600 hover:text-gray-900" size={20} />
                </a>
                <a href="#" aria-label="Twitter">
                    <FaTwitter className="text-gray-600 hover:text-gray-900" size={20} />
                </a>
                <a href="#" aria-label="Instagram">
                    <FaInstagram className="text-gray-600 hover:text-gray-900" size={20} />
                </a>
            </div>

            {/* Copyright Section */}
            <div className="mt-4 text-gray-500 text-xs opacity-70">
                &copy; {new Date().getFullYear()} NewsApp. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
