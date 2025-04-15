import React, { useEffect } from "react"
import Navigation from "@/components/layout/Nav"
import Footer from "@/components/layout/Footer"
import Card from "@/components/content/Card"
import Header from "@/components/layout/Header"
import { useFetchNews } from "@/hooks/useFetchNews"
import { useNewsStore } from "@/store/useNewsStore"
import "../index.css"

export const categories = ["Technology", "Sports", "Politics", "Business"];

const IndexPage: React.FC = () => {
    const {
        selectedCategory,
        setSelectedCategory,
        articles,
        setArticles,
    } = useNewsStore();

    const {
        data: articlesData,
        isLoading,
        isError,
    } = useFetchNews(selectedCategory);

    useEffect(() => {
        if (articlesData) {
            setArticles(articlesData);
        }
    }, [articlesData, setArticles]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setArticles(articlesData!);
    }

    return (
        <div className="flex flex-col min-h-screen ">
            <Header />
            <Navigation categories={categories} onCategorySelect={handleCategoryChange} />
            <main className="container mx-auto flex-1 px-4 py-6">
                {isLoading ? (
                    <div className="text-center text-gray-500">Loading...</div>
                ) : isError ? (
                    <div className="text-center text-red-500">Failed to load articles.</div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {articles.map((article, index) => (
                            <Card key={index} article={article} />
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    )
}

export default IndexPage
