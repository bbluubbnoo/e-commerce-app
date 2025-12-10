import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FavoritesState = {
    ids: number[];
};

const initialState: FavoritesState = {
    ids: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavorite(state, action: PayloadAction<number>) {
            // Add or remove the product id from the favorites list.
            const id = action.payload;
            if (state.ids.includes(id)) {
                state.ids = state.ids.filter((favId) => favId !== id);
            } else {
                state.ids.push(id);
            }
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
