import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { categories } from "@/pages";
import { addTags } from "@/lib/api/userDataApi";
import { set } from "date-fns";

const NewsletterComponent = () => {
    const { user } = useAuth();
    const tags = categories;
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [error, setError] = useState<string>("");

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handleSave = async () => {
        if (!user) {
            setError("Please sign in to save your preferences.");
            return;
        }
        if (selectedTags.length !== 0) {
            try {
                await addTags(user.uid, selectedTags);
                setError("");
            } catch (error) {
                console.error("Error saving tags: ", error);
                setError("Failed to save preferences.");
            }
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    type="button"
                    className="text-sm rounded-full cursor-pointer"
                >
                    Newsletter
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white p-6 rounded-2xl shadow-md">
                <DialogHeader>
                    <DialogTitle>Select Your Tags</DialogTitle>
                </DialogHeader>
                <div className="flex flex-wrap gap-2 border-t py-4">
                    {tags.map((tag: string) => (
                        <Button
                            key={tag}
                            variant={selectedTags.includes(tag) ? "outline" : "default"}
                            onClick={() => toggleTag(tag)}
                            className={`text-black cursor-pointer ${selectedTags.includes(tag) ? "bg-gray-200" : ""}`}
                        >
                            {tag}
                        </Button>
                    ))}
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex justify-end mt-4">
                    <Button
                        onClick={handleSave}
                        className="text-black cursor-pointer"
                        variant={"outline"}
                    >Save Preferences
                    </Button>
                </div>
            </DialogContent>
        </Dialog >
    );
}

export default NewsletterComponent;
