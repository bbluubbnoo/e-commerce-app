import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../slices/ui-slice";
import cartReducer from "../slices/cart-slice";
import favoritesReducer from "../slices/favorites-slice";

// This is the central Redux store for the whole app.
export const store = configureStore({
    reducer: {
        ui: uiReducer,
        cart: cartReducer,
        favorites: favoritesReducer,
    },
});

// These types are useful in components with useSelector/useDispatch.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
