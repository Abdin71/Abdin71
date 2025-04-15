export interface Article {
    id: string;
    title: string;
    imageUrl: string;
    source: {
        id: string;
        name: string;
        logoUrl: string;
    };
    author: {
        name: string;
        profileUrl: string;
    };
    timestamp: Date;
    summary: string;
    tags: string[];
    content?: string;
    url: string;
    isBookmarked: boolean;

}