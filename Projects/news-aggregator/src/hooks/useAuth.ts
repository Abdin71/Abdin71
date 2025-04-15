import { auth } from "@/lib/firebase"
import useAuthStore from "@/store/useAuthStore"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"

export const useAuth = () => {
    const { user, token, loading, setUser, setToken, setLoading } = useAuthStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setUser(null);
                setToken(null);
            } else {
                setUser(user);
                const token = await user.getIdToken();
                setToken(token);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { user, token, loading, setLoading };
};