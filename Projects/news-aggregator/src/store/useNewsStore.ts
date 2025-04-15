import { create } from "zustand"
import { Article } from "@/types/article"

interface NewsState {
    articles: Article[];
    setArticles: (articles: Article[]) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

export const useNewsStore = create<NewsState>((set) => ({
    articles: [],
    setArticles: (articles) => set({ articles }),
    selectedCategory: "Technology",
    setSelectedCategory: (category) => set({ selectedCategory: category }),
}))
