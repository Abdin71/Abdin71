import { useState } from "react";
import { Card } from "@/components/ui/card";
import CardHeaderComponent from "./CardHeader";
import CardContentComponent from "./CardContent";
import CardFooterComponent from "./CardFooter";
import { Button } from "@/components/ui/button";
import { Article } from "@/types/article";

interface CardProps {
    article: Article;
}

const CardComponent: React.FC<CardProps> = ({ article }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleBookmark = () => {
        setIsBookmarked((prev) => !prev);
    };

    const handleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    const handleTagClick = (tag: string) => {
        console.log("Filtering news by:", tag);
    };

    return (
        <Card className="bg-white text-black p-4 rounded-2xl shadow-md">
            <CardHeaderComponent
                sourceName={article.source.name}
                sourceLogo={article.source.logoUrl}
                author={article.author.name}
            />
            <CardContentComponent
                imageUrl={article.imageUrl}
                title={article.title}
                timestamp={article.timestamp.toDateString()}
            />
            <CardFooterComponent
                tags={article.tags}
                handleTagClick={handleTagClick}
            />
            <div className="flex justify-between mt-4">
                <Button variant="ghost" onClick={handleBookmark} className="text-black">
                    {isBookmarked ? "Unbookmark" : "Bookmark"}
                </Button>
                <Button variant="ghost" onClick={handleExpand} className="text-black">
                    {isExpanded ? "Collapse" : "Read More"}
                </Button>
            </div>
        </Card>
    );
};

export default CardComponent;
