import React from "react";
import Tabs from "../navigation/Tabs";

interface NavigationProps {
    categories: string[];
    onCategorySelect?: (category: string) => void;
}

const Nav: React.FC<NavigationProps> = ({ categories, onCategorySelect }) => {
    /*const handleTabClick = (category: string) => {
        console.log(`Switching to category: ${category}`);
        // Logic to switch category (e.g., update state or call an API)
    };
    */

    return (
        <nav className="border-b border-gray-200 py-2">
            <Tabs categories={categories} onCategorySelect={onCategorySelect} />
        </nav>
    );
};

export default Nav;
