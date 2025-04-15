import { CardFooter } from "@/components/ui/card";
import { FC } from "react";

interface CardFooterProps {
    sourceName: string;
    autherName: string;
}

const CardFooterComponent: FC<CardFooterProps> = ({ sourceName, autherName }) => {
    return (
        <CardFooter className=" border-t border-gray-100 p-3 pt-1 text-xs text-gray-500">
            <div className="flex gap-2">
                <p>{sourceName} • {autherName}</p>
            </div>
        </CardFooter>
    );
};

export default CardFooterComponent;
