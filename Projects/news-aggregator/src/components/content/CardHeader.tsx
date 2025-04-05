import { CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";

interface CardHeaderProps {
    sourceName: string;
    sourceLogo: string;
    author?: string | null;
}

const CardHeaderComponent: FC<CardHeaderProps> = ({ sourceName, sourceLogo, author }) => {
    return (
        <CardHeader className="bg-white text-black p-4 rounded-2xl flex items-center gap-3">
            <Avatar>
                <AvatarImage src={sourceLogo} alt={sourceName} />
                <AvatarFallback>{sourceName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <a href="#" className="text-lg font-semibold hover:underline">
                    {sourceName}
                </a>
                {author && <p className="text-sm text-gray-500">{author}</p>}
            </div>
        </CardHeader>
    );
};

export default CardHeaderComponent;
