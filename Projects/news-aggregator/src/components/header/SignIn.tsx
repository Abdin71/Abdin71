import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LogIn } from "lucide-react";
import { z } from "zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import SignUpComponent from "./SignUp";


const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignInComponent: React.FC = () => {
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            setIsSignInModalOpen(false);
        }
    }, [user]);

    const toggleSignInModal = () => {
        setIsSignInModalOpen((prev) => !prev);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignIn = async () => {
        const result = signInSchema.safeParse(formData);
        if (!result.success) {
            setError(result.error.errors[0].message);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            setError("");
        } catch (err) {
            setError("Invalid email or password.");
        }
    };

    const handleSignUp = () => {
        setIsSignUpModalOpen(true);
        setIsSignInModalOpen(false);
    };

    return (
        <div>
            <Dialog open={isSignInModalOpen} onOpenChange={setIsSignInModalOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        onClick={toggleSignInModal}
                        className="rounded-full hover:outline cursor-pointer text-sm"
                        type="button"
                    >
                        Sign in <LogIn size={24} className="text-black" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-white p-6 rounded-2xl shadow-md">
                    <DialogHeader>
                        <DialogTitle className="text-black">Sign In</DialogTitle>
                    </DialogHeader>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="text-black"
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="text-black"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex items-center justify-center ">
                        <Button variant="outline" onClick={handleSignIn} className="text-black cursor-pointer">
                            Sign In
                        </Button>
                    </div>
                    <div className="text-sm text-center border-t">
                        <div className="py-2">
                            <span className="text-gray-600">Don't have an account?{" "}</span>
                            <button
                                onClick={handleSignUp}
                                className="text-blue-600 hover:underline cursor-pointer"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            {isSignUpModalOpen && <SignUpComponent isModalOpen={isSignUpModalOpen} setIsModalOpen={setIsSignUpModalOpen} />}
        </div>
    );
};


export default SignInComponent;
