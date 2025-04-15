import React, { useState } from "react";
import TabItem from "./TabItem";

interface TabsProps {
    categories: string[];
    onCategorySelect?: (category: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ categories, onCategorySelect }) => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);

    const handleCategorySelect = (category: string) => {
        setActiveCategory(category);
        if (onCategorySelect) {
            onCategorySelect(category);
        }
    };

    return (
        <div className="container mx-auto px-4 grid w-full grid-cols-7 bg-transparent">
            {categories.map((category, index) => (
                <TabItem
                    key={index}
                    category={category}
                    isActive={activeCategory === category}
                    onClick={() => handleCategorySelect(category)}
                />
            ))}
        </div>
    );
};

export default Tabs;
