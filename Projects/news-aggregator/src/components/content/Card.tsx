import { useState } from "react";
import { Card } from "@/components/ui/card";
import CardHeaderComponent from "./CardHeader";
import CardContentComponent from "./CardContent";
import CardFooterComponent from "./CardFooter";
import { Article } from "@/types/article";
import ArticleDialog from './ArticleDialog';

interface CardProps {
    article: Article;
}

const CardComponent: React.FC<CardProps> = ({ article }) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card
            className="text-black overflow-hidden border border-gray-100 relative cursor-pointer"
            onClick={() => setOpen(!open)}
        >
            <CardHeaderComponent
                sourceName={article.source.name}
                sourceLogo={article.source.logoUrl}
                author={article.author.name}
            />
            <CardContentComponent
                imageUrl={article.imageUrl}
                title={article.title}
                timestamp={article.timestamp}
                tags={article.tags}
                sourceUrl={article.url}
            />
            <CardFooterComponent
                sourceName={article.source.name}
                autherName={article.author.name}
            />

            {/* Article Dialog */}
            <ArticleDialog open={open} handleClose={handleClose} article={article} />
        </Card>
    );
};

export default CardComponent;
