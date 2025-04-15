import { auth } from "../firebase"
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User } from "firebase/auth"
import { createUserDoc } from "./userDataApi"

export const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = () => {
    return signOut(auth);
};

export const signUp = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user doc in Firestore
    await createUserDoc(user.uid, {
        email: user.email,
        createdAt: new Date(),
    });

    return user;
};

export const forgotPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
};

export const getCurrentUser = (): User | null => auth.currentUser;
