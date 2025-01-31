"use client";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteCardMutation } from "@/lib/features/api/card/cardApiSlice";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";

const RemoveCard = ({
    children,
    cardId,
    onDeleteClose,
}: Readonly<{
    children: React.ReactNode;
    cardId: string;
    onDeleteClose: () => void;
}>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteCard, { isLoading: isDeleting }] = useDeleteCardMutation();
    const { toast } = useToast();

    const handleDelete = async (id: string) => {
        try {
            await deleteCard(id).unwrap();
            toast({
                title: "Success",
                description: "Card deleted successfully!",
                variant: "info",
            });
            //handle Close card
            setIsOpen(!isOpen);
            onDeleteClose();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete the card. Please try again.",
                variant: "destructive",
            });
            console.error(error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="bg-[#1F2124] px-0 text-white border flex flex-col gap-6 border-white/30 rounded-md h-auto w-80">
                <div className="flex justify-between -mt-3 px-4 border-b pb-4 border-[#414245]">
                    <span className="font-semibold text-sm">{removeCard}</span>
                </div>

                <div className="flex flex-col justify-between px-4 gap-2">
                    <span className="font-semibold text-sm">{confirmationText}</span>
                </div>

                <div className="flex px-4 gap-2">
                    <button
                        onClick={() => handleDelete(cardId)}
                        disabled={isDeleting}
                        className={`text-sm font-semibold text-white ${isDeleting ? "bg-gray-400 cursor-not-allowed" : "bg-[#F90D06]"
                            } px-8 py-1 rounded-md`}
                    >
                        {isDeleting ? "Deleting..." : "Confirm"}
                    </button>

                    <DialogClose asChild>
                        <button className="text-sm font-semibold text-white bg-gray-500 px-8 py-1 rounded-md">
                            Cancel
                        </button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// Constants
const removeCard = "Delete card";
const confirmationText = "Are you sure you want to delete?";

export default RemoveCard;
