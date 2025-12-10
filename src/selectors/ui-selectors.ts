import { RootState } from "../store";

// Simple selectors for UI state.
// We can reuse these in multiple components.

export const selectCategory = (state: RootState) => state.ui.category;
export const selectSearch = (state: RootState) => state.ui.search;
export const selectSort = (state: RootState) => state.ui.sort;
export const selectTheme = (state: RootState) => state.ui.theme;
