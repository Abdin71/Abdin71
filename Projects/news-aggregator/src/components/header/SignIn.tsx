import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LogIn } from "lucide-react";
import { z } from "zod";

const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignInComponent: React.FC = () => {
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const toggleSignInModal = () => {
        setIsSignInModalOpen((prev) => !prev);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignIn = () => {
        const result = signInSchema.safeParse(formData);
        if (!result.success) {
            setError(result.error.errors[0].message);
            return;
        }
        setError("");
        console.log("Signing in with:", formData);
        toggleSignInModal();
    };

    return (
        <div>
            <Dialog open={isSignInModalOpen} onOpenChange={setIsSignInModalOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost" onClick={toggleSignInModal}>
                        <LogIn size={20} className="text-black" /> Sign In
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
                    <Button variant="ghost" onClick={handleSignIn} className="text-black">
                        Sign In
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SignInComponent;
