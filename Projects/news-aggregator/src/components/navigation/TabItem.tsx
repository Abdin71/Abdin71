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
            variant={"ghost"}
            className={`text-black hover:underline cursor-pointer ${isActive ? "font-bold" : "text-black"}`}
            onClick={onClick}
        >
            {category}
        </Button>
    );
};

export default TabItem;
