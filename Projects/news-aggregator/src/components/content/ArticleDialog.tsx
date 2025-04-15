import React, { useState } from 'react';
import { Article } from '@/types/article';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { Bookmark, MessageSquare, Share2, ThumbsUp, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import useAuthStore from '@/store/useAuthStore';
import { useFetchBookmarks } from '@/hooks/useBookmarks';
import { addBookmark, removeBookmark } from '@/lib/api/userDataApi';

interface ArticleDialogProps {
    open: boolean;
    handleClose: () => void;
    article: Article;
}

const ArticleDialog: React.FC<ArticleDialogProps> = ({ open, handleClose, article }) => {
    const { user } = useAuthStore();
    const bookmarks = useFetchBookmarks(user?.uid || "");
    const isBookmarked = bookmarks.data ? bookmarks.data.some(b => b.id === article.id) : false;
    const [error, setError] = useState("");

    const handleBookmark = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!user) {
            setError("Please sign in to bookmark article.");
            return;
        }

        if (isBookmarked) {
            try {
                await removeBookmark(user.uid, article.id);
            } catch (err) {
                setError("Failed to remove bookmark.");
            }
        } else {
            try {
                await addBookmark(user.uid, article.id, article);
            } catch (err) {
                setError("Failed to add bookmark.");
            }
        }
        setError("");
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="overflow-y-auto bg-white p-6 rounded-2xl shadow-md min-h-[95vh] min-w-[48vw]">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={article.source.logoUrl} alt={article.source.name} />
                                <AvatarFallback>{article.source.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <DialogTitle className="text-lg">{article.author.name}</DialogTitle>
                                <DialogDescription>{formatDistanceToNow(new Date(article.timestamp), { addSuffix: true })}</DialogDescription>
                            </div>
                        </div>
                        <div className="flex items-center justify-end">

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(article.url, "_blank")}
                                className='text-black cursor-pointer'
                            >
                                <span className="text-sm">Go to source</span>
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                </DialogHeader>

                <div className="my-4">
                    <img
                        src={article.imageUrl}
                        alt={article.title}
                        width={800}
                        height={400}
                        className="w-full h-64 object-cover rounded-lg"
                    />
                </div>

                <h2 className="text-2xl font-bold font-serif mb-4">{article.title}</h2>

                <div className="prose prose-sm max-w-none">{article.content}</div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 cursor-pointer">
                            <ThumbsUp className="h-4 w-4" />
                            <span>Like</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 cursor-pointer">
                            <MessageSquare className="h-4 w-4" />
                            <span>Comment</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 cursor-pointer">
                            <Share2 className="h-4 w-4" />
                            <span>Share</span>
                        </Button>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleBookmark(e)}
                    >
                        <Bookmark className="h-4 w-4" />
                        <span>{isBookmarked ? "Unbookmark" : "Bookmark"}</span>
                    </Button>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <DialogFooter className="text-xs text-gray-500 mt-4">
                    Source: {article.source.name} {article.author.name ? `• ${article.author.name}` : ""}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ArticleDialog;
