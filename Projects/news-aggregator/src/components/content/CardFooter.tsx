import { CardFooter } from "@/components/ui/card";
import { FC } from "react";
import { Button } from "@/components/ui/button";

interface CardFooterProps {
    tags: string[];
    handleTagClick: (tag: string) => void;
}

const CardFooterComponent: FC<CardFooterProps> = ({ tags, handleTagClick }) => {
    return (
        <CardFooter className="bg-white text-black p-4 rounded-2xl flex justify-between items-center">
            <div className="flex gap-2">
                {tags.map((tag) => (
                    <Button
                        key={tag}
                        variant="ghost"
                        className="text-red-500 text-sm"
                        onClick={() => handleTagClick(tag)}
                    >
                        {tag}
                    </Button>
                ))}
            </div>
        </CardFooter>
    );
};

export default CardFooterComponent;
