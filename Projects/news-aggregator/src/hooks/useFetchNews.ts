import { useQuery } from "@tanstack/react-query"
import { fetchTopHeadlines } from "@/lib/api/newsApi"
import { Article } from "@/types/article"

export const useFetchNews = (category?: string) => {
    return useQuery<Article[]>({
        queryKey: ["news", category],
        queryFn: () => fetchTopHeadlines(category),
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}
