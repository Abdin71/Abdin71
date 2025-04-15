import { create } from "zustand";
import { Article } from "@/types/article";

interface BookmarkStore {
    bookmarks: Article[];
    setBookmarks: (bookmarks: Article[]) => void;
}

const useBookmarkStore = create<BookmarkStore>((set) => ({
    bookmarks: [],
    setBookmarks: (bookmarks) => set({ bookmarks }),
}));

export default useBookmarkStore;
