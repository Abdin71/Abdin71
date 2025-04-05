import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchComponent: React.FC = () => {
    const [query, setQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const submitSearch = () => {
        if (!query.trim()) return;
        setIsSearching(true);
        console.log("Searching for:", query);
        // Simulate API request
        setTimeout(() => setIsSearching(false), 1000);
    };

    return (
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-md">
            <Input
                type="text"
                placeholder="Search news..."
                value={query}
                onChange={handleSearchInput}
                className="text-black flex-1"
            />
            <Button variant="ghost" onClick={submitSearch} disabled={isSearching}>
                <Search size={20} className="text-black" />
            </Button>
        </div>
    );
};

export default SearchComponent;
