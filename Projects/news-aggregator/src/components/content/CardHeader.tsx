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
        <CardHeader className=" text-black rounded-2xl p-3 pb-0">
            <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                    <AvatarImage src={sourceLogo} alt={sourceName} />
                    <AvatarFallback>{sourceName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <p className="text-xs font-semibold hover:underline">
                        {sourceName}
                    </p>
                    {author && <p className="text-sm text-gray-500">{author}</p>}
                </div>
            </div>
        </CardHeader>
    );
};

export default CardHeaderComponent;
