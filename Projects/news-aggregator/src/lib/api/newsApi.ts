import axios from "axios"
import { Article } from "@/types/article"

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export const fetchTopHeadlines = async (category?: string): Promise<Article[]> => {
    const params: Record<string, string> = {
        apiKey: NEWS_API_KEY!,
        country: "us",
        pageSize: "20",
    }

    if (category) params.category = category;

    const response = await axios.get(`${BASE_URL}/top-headlines`, { params });

    return response.data.articles.map((article: any, index: number) => ({
        id: `${category}-${index}`,
        title: article.title,
        imageUrl: article.urlToImage,
        summary: article.description,
        timestamp: article.publishedAt,
        content: article.content,
        tags: [category || "general"],
        url: article.url,
        source: {
            id: article.source.id || "",
            name: article.source.name,
            logoUrl: "",
        },
        author: {
            name: article.author || "Unknown",
            profileUrl: "",
        },
        isBookmarked: false,
    }));
}
