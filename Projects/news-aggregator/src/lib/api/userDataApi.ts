import { Article } from "@/types/article";
import { db } from "../firebase";
import {
    doc,
    setDoc,
    deleteDoc,
    collection,
    getDocs,
    getDoc,
} from "firebase/firestore";

export const addBookmark = async (userId: string, articleId: string, data: any) => {
    const ref = doc(db, "users", userId, "bookmarks", articleId);
    await setDoc(ref, data);
};

export const removeBookmark = async (userId: string, articleId: string) => {
    const ref = doc(db, "users", userId, "bookmarks", articleId);
    await deleteDoc(ref);
};

export const fetchBookmarks = async (userId: string): Promise<Article[]> => {
    const ref = collection(db, "users", userId, "bookmarks");
    const snapshot = await getDocs(ref); // Limit the number of documents fetched to 20
    return snapshot.docs.map(doc => ({
        id: doc.data().id,
        title: doc.data().title,
        imageUrl: doc.data().urlToImage,
        summary: doc.data().description,
        timestamp: doc.data().publishedAt,
        content: doc.data().content,
        tags: doc.data().tags || ["general"],
        url: doc.data().url,
        source: {
            id: doc.data().source?.id || "",
            name: doc.data().source?.name,
            logoUrl: "",
        },
        author: {
            name: doc.data().author?.name || "Unknown",
            profileUrl: "",
        },
        isBookmarked: doc.data().isBookmarked,
    }));
};

export const createUserDoc = async (userId: string, userData: any) => {
    const ref = doc(db, "users", userId);
    await setDoc(ref, userData, { merge: true });
};

export const addTags = async (userId: string, tags: string[]) => {
    const ref = collection(db, "users", userId, "preferences");
    const docRef = doc(ref, "main");
    await setDoc(docRef, { tags }, { merge: true });
}
export const fetchTags = async (userId: string): Promise<string[]> => {
    const ref = collection(db, "users", userId, "preferences");
    const docRef = doc(ref, "main");
    const snapshot = await getDoc(docRef);
    return snapshot.data()?.tags || [];
};
