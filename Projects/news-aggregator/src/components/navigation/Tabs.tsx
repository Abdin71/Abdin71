import React, { useState } from "react";
import TabItem from "./TabItem";

interface TabsProps {
    categories: string[];
}

const Tabs: React.FC<TabsProps> = ({ categories }) => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);

    return (
        <div className="flex gap-4 border-b pb-2">
            {categories.map((category) => (
                <TabItem
                    key={category}
                    category={category}
                    isActive={activeCategory === category}
                    onClick={() => setActiveCategory(category)}
                />
            ))}
        </div>
    );
};

export default Tabs;
