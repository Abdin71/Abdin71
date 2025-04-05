import React, { useState, useEffect } from "react";
import Navigation from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Card from "@/components/content/Card";
import Header from "@/components/layout/Header";
import { Article } from "@/types/article";

const categories = ["Technology", "Sports", "Politics", "Business"];

const IndexPage: React.FC = () => {
    const [selectedCategory,] = useState<string>(categories[0]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchArticles = async (category: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/articles?category=${category}`);
            const data = await response.json();
            setArticles(data.articles);
        } catch (error) {
            console.error("Error fetching articles:", error);
        } finally {
            setIsLoading(false);
        }
    };
    /*
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        fetchArticles(category);
    };
    */

    useEffect(() => {
        fetchArticles(selectedCategory);
    }, [selectedCategory]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <Navigation
                categories={categories}
            />
            <main className="flex flex-col items-center px-4 py-6">
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article) => (
                            <Card key={article.id} article={article} />
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default IndexPage;
