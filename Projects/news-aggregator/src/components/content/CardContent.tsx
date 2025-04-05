import { CardContent } from "@/components/ui/card";
import { FC } from "react";

interface CardContentProps {
    imageUrl: string;
    title: string;
    timestamp: string;
}

const CardContentComponent: FC<CardContentProps> = ({ imageUrl, title, timestamp }) => {
    return (
        <CardContent className="bg-white text-black p-4 rounded-2xl">
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-48 object-cover rounded-xl"
            />
            <h2 className="mt-4 text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-gray-500">{timestamp}</p>
        </CardContent>
    );
};

export default CardContentComponent;
