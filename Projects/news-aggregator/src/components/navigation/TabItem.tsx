import React from "react";
import { Button } from "@/components/ui/button";

interface TabItemProps {
    category: string;
    isActive: boolean;
    onClick: () => void;
}

const TabItem: React.FC<TabItemProps> = ({ category, isActive, onClick }) => {
    return (
        <Button
            variant={isActive ? "default" : "ghost"}
            className={`text-black ${isActive ? "border-b-2 border-red-500" : ""}`}
            onClick={onClick}
        >
            {category}
        </Button>
    );
};

export default TabItem;
