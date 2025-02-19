import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit"

export interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
}

export interface CartItem {
    id: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
}

interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: create => ({
        addToCart: create.reducer((state, action: PayloadAction<CartItem>) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        }),
        removeFromCart: create.reducer((state, action: PayloadAction<string>) => {
            const productId = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== productId);
        }),
        updateQuantity: create.reducer(
            (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
                const { productId, quantity } = action.payload;
                const existingItem = state.cartItems.find(item => item.id === productId);
                if (existingItem) {
                    existingItem.quantity = quantity;
                }
            }),
        clearCart: create.reducer(state => {
            state.cartItems = [];
        }),
    })
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
