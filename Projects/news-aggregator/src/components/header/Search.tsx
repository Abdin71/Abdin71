import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AlignVerticalDistributeEnd, Search } from "lucide-react";
import { formatDistanceToNow, set } from "date-fns";
import { Article } from "@/types/article";
import { useNewsStore } from "@/store/useNewsStore";


const SearchComponent: React.FC = () => {
    const [query, setQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const { articles, setArticles } = useNewsStore();
    const [filteredArticles, setfilteredArticles] = useState<Article[]>([]);

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsFocused(true);
        setIsSearching(true);
        setQuery(event.target.value);
        setfilteredArticles(
            articles.filter((article) =>
                article.title.toLowerCase().includes(query.toLowerCase()) ||
                article.source.name.toLowerCase().includes(query.toLowerCase())

            )
        );

    };

    const handleClickArticle = (id: string) => {
        setArticles(
            articles.filter((article) =>
                article.id === id

            )
        );
        setIsFocused(false);
        setIsSearching(false);
    };

    const handleClickOutside = () => {
        setIsFocused(false);
        setIsSearching(false);
        setQuery("");
    }

    return (
        <div className="flex items-center ">
            <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                    type="search"
                    placeholder="Search news"
                    className="h-9 w-64 rounded-full pl-9 text-sm"
                    value={query}
                    onChange={handleSearchInput}
                    onBlur={handleClickOutside}
                />
                {isFocused && filteredArticles.length > 0 && (
                    <div className="absolute z-10 mt-2 max-h-[300px] max-w-80 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
                        <ul className="py-2">
                            {filteredArticles?.map((article, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleClickArticle(article.id)}
                                    className="px-4 py-2 hover:bg-gray-100 hover:underline hover:cursor-pointer"
                                >
                                    <div className="font-semibold text-sm text-black">{article.title}</div>
                                    <div className="text-xs text-gray-500">
                                        {formatDistanceToNow(new Date(article.timestamp), { addSuffix: true })} ·{" "}
                                        {article.source.name}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>


            {isFocused && query && filteredArticles.length === 0 && (
                <div className="absolute mt-4 top-11 z-10 w-80 rounded-md border bg-white shadow-lg px-4 py-2 text-sm text-gray-500">
                    No results found.
                </div>
            )}

        </div>


    );
};

export default SearchComponent;
