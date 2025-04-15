import SearchComponent from "../header/Search";
import SignInComponent from "../header/SignIn";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, Settings, UserCircle, Moon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import NewsletterComponent from "../header/Newsletter";
import useDarkMode from "@/hooks/useDarkMode";
import newsaggregator from "@/assets/newsaggregator.svg";

const Header: React.FC = () => {
    const { user } = useAuth();
    const [isDarkMode, toggleDarkMode] = useDarkMode();

    const handleSignOut = async () => {
        await signOut(auth);
    };

    return (
        <header className="border-b border-gray-200 py-5">
            <div className="container mx-auto flex items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center cursor-pointer">
                    <img
                        src={newsaggregator}
                        alt="NewsApp logo"
                        width={50}
                        height={30}
                        className="h-7"
                    />
                    <span className="text-xl font-bold text-black">NewsApp</span>
                </div>

                {/* Right section */}
                <div className="hidden md:flex items-center gap-4">
                    <NewsletterComponent />
                    <SearchComponent />
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <UserCircle className="h-7 w-7 text-black" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="text-black bg-white">
                                <DropdownMenuItem className="flex items-center gap-2">
                                    <Settings size={16} />
                                    My Preferences
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2" onClick={toggleDarkMode}>
                                    <Moon size={16} />
                                    Dark Mode: {isDarkMode ? "On" : "Off"}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="flex items-center gap-2 text-red-600"
                                    onClick={handleSignOut}
                                >
                                    <LogOut size={16} />
                                    Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <SignInComponent />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
