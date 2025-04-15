import { useQuery } from "@tanstack/react-query"
import { Article } from "@/types/article"
import { fetchBookmarks } from "@/lib/api/userDataApi"

export const useFetchBookmarks = (userId: string) => {
    return useQuery<Article[]>({
        queryKey: ["bookmarks", userId],
        queryFn: () => fetchBookmarks(userId),
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}
