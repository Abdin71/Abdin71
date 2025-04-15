import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import { z } from "zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

const signUpSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

interface SignUpComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpComponent: React.FC<SignUpComponentProps> = ({ isModalOpen, setIsModalOpen }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const { user } = useAuth();

    // Close modal when user successfully signs up
    useEffect(() => {
        if (user) {
            setIsModalOpen(false);
        }
    }, [user]);

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignUp = async () => {
        const result = signUpSchema.safeParse(formData);
        if (!result.success) {
            setError(result.error.errors[0].message);
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            setError("");
        } catch (err: any) {
            setError("Failed to sign up. Email may already be in use.");
        }
    };

    return (
        <div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>

                <DialogContent className="bg-white p-6 rounded-2xl shadow-md">
                    <DialogHeader>
                        <DialogTitle className="text-black">Create Account</DialogTitle>
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
                        <Button variant="outline" onClick={handleSignUp} className="text-black">
                            Sign Up
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SignUpComponent;
