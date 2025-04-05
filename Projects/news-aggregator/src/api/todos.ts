import axios from "axios";

interface Article {
    id: string;
    title: string;
}

export const fetchArticles = async (): Promise<Article[]> => {
    const response = { data: [{ "id": "1", "title": "title" }] };
    return response.data;
};
