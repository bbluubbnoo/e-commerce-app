import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    quantity: number;
};

export type CartState = {
    items: CartItem[];
};

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(
            state,
            action: PayloadAction<{ id: number; title: string; price: number; thumbnail: string }>
        ) {
            // If item already exists, increase quantity; otherwise add new item.
            const existing = state.items.find((item) => item.id === action.payload.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart(state, action: PayloadAction<number>) {
            // Remove item completely from the cart by id.
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        increaseQuantity(state, action: PayloadAction<number>) {
            // Increase quantity by 1 for a specific product.
            const item = state.items.find((i) => i.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity(state, action: PayloadAction<number>) {
            // Decrease quantity by 1. If it becomes 0, remove the product.
            const item = state.items.find((i) => i.id === action.payload);
            if (!item) return;

            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.items = state.items.filter((i) => i.id !== action.payload);
            }
        },
        clearCart(state) {
            // Remove all items from the cart.
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
