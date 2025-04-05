export interface Article {
    id: string;
    title: string;
    imageUrl: string;
    source: {
        name: string;
        logoUrl: string;
    };
    author: {
        "id": "author_007",
        "name": "Jane Doe",
        "profileUrl": "https://example.com/authors/jane-doe"
    };
    timestamp: Date;
    summary: string;
    tags: string[];
    content?: string; // Optional if you want full article content
    url: string;
    isBookmarked: boolean;

}