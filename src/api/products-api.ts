import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// This type describes one product returned by DummyJSON.
export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
};

// This is the paged response shape from /products.
export type ProductsResponse = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://dummyjson.com",
    }),
    endpoints: (builder) => ({
        // For now we will just load a basic product list.
        // Later we can reuse this for search and category filters.
        getProducts: builder.query<
            ProductsResponse,
            { search?: string; category?: string | null; limit?: number; skip?: number }
        >({
            query: ({ search, category, limit = 20, skip = 0 }) => {
                // Search has priority
                if (search && search.trim().length > 0) {
                    return `/products/search?q=${encodeURIComponent(
                        search.trim()
                    )}&limit=${limit}&skip=${skip}`;
                }

                // Filter by real DummyJSON category
                if (category && category.trim().length > 0) {
                    return `/products/category/${encodeURIComponent(
                        category
                    )}?limit=${limit}&skip=${skip}`;
                }

                // Default: plain product list
                return `/products?limit=${limit}&skip=${skip}`;
            },
        }),
    }),
});

export const { useGetProductsQuery } = productsApi;
