import { RootState } from "../store";

// Get the full favorites slice.
export const selectFavoritesState = (state: RootState) => state.favorites;

// Get only the list of favorite product ids.
export const selectFavoriteIds = (state: RootState) => state.favorites.ids;
