import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Base selector: full cart state.
export const selectCartState = (state: RootState) => state.cart;

// All cart items.
export const selectCartItems = (state: RootState) => state.cart.items;

// Memoized selector: total number of items in cart.
export const selectCartTotalItems = createSelector(
    selectCartItems,
    (items) => {
        return items.reduce((sum, item) => sum + item.quantity, 0);
    }
);

// Memoized selector: total price of all items.
export const selectCartTotalPrice = createSelector(
    selectCartItems,
    (items) => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
);
