import React from "react";
import Tabs from "../navigation/Tabs";

interface NavigationProps {
    categories: string[];
}

const Nav: React.FC<NavigationProps> = ({ categories }) => {
    /*const handleTabClick = (category: string) => {
        console.log(`Switching to category: ${category}`);
        // Logic to switch category (e.g., update state or call an API)
    };
    */

    return (
        <nav className="p-4 bg-white shadow-md">
            <Tabs categories={categories} />
        </nav>
    );
};

export default Nav;
