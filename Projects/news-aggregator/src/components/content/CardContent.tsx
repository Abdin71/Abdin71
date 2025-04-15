import { CardContent } from "@/components/ui/card"
import { FC } from "react"
import { formatDistanceToNow } from "date-fns"

interface CardContentProps {
    imageUrl: string
    title: string
    timestamp: Date
    tags: string[]
    sourceUrl: string
}

const CardContentComponent: FC<CardContentProps> = ({
    imageUrl,
    title,
    timestamp,
    tags,
}) => {
    return (
        <CardContent className=" text-black p-3">
            <a href="#" className="block relative">
                <img
                    src={imageUrl}
                    alt={title}
                    className="mb-3 h-40 w-full object-cover rounded"
                    width={400}
                    height={200}
                />
                <div className="absolute bottom-3 left-3 rounded bg-red-600 px-1.5 py-0.5 text-xs text-white hover:underline">
                    {tags.join(", ")}
                </div>
            </a>

            <h3 className="font-serif text-lg font-bold leading-tight hover:underline">{title}</h3>
            <div className="mt-2 flex items-center text-xs text-gray-500">
                <span>{formatDistanceToNow(new Date(timestamp), { addSuffix: true })}</span>
            </div>
        </CardContent>
    )
}

export default CardContentComponent
