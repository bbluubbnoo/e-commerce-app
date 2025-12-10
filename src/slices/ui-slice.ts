import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SortOption = "priceAsc" | "priceDesc" | "nameAsc";

export type UiState = {
    theme: "light" | "dark";
    search: string;
    category: string | null; // real DummyJSON category name
    sort: SortOption;
};

const initialState: UiState = {
    theme: "light",
    search: "",
    category: null,
    sort: "nameAsc",
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleTheme(state) {
            // Switch between light and dark mode
            state.theme = state.theme === "light" ? "dark" : "light";
        },
        setSearch(state, action: PayloadAction<string>) {
            // Update the search text used for filtering products
            state.search = action.payload;
        },
        setCategory(state, action: PayloadAction<string | null>) {
            // Set the active category or clear it with null
            state.category = action.payload;
        },
        setSort(state, action: PayloadAction<SortOption>) {
            // Change the current sort option
            state.sort = action.payload;
        },
    },
});

export const { toggleTheme, setSearch, setCategory, setSort } = uiSlice.actions;

export default uiSlice.reducer;
