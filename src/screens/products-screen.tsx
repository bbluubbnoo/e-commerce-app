import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useGetProductsQuery } from "../api/products-api";
import { useDispatch ,useSelector } from "react-redux";
import { selectCategory } from "../selectors/ui-selectors";
import type { RootState, AppDispatch } from "../store";
import CategoryFilter from "../components/category-filter";
import ProductCard from "../components/product-card";
import SearchBar from "../components/search-bar";
import { selectSearch } from "../selectors/ui-selectors";
import ProductDetailsModal from "../components/product-details-modal";
import { selectFavoriteIds } from "../selectors/favorites-selectors";
import { toggleFavorite } from "../slices/favorites-slice";


const ProductsScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    const activeCategory = useSelector((state: RootState) => selectCategory(state));
    const search = useSelector((state: RootState) => selectSearch(state));

    const favoriteIds = useSelector(selectFavoriteIds);

    const { data, isLoading, isError, refetch, isFetching } = useGetProductsQuery({
        search,
        category: activeCategory,
        limit: 20,
        skip: 0,
    });

    const handleOpenDetails = useCallback((id: number) => {
        setSelectedProductId(id);
    }, []);

    const handleCloseDetails = useCallback(() => {
        setSelectedProductId(null);
    }, []);

    const handleToggleFavorite = useCallback(
        (id: number) => {
            dispatch(toggleFavorite(id));
        },
        [dispatch]
    );

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator />
                <Text style={styles.infoText}>Loading products...</Text>
            </View>
        );
    }

    if (isError || !data) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Failed to load products.</Text>
                <Text style={styles.linkText} onPress={() => refetch()}>
                    Tap to retry
                </Text>
            </View>
        );
    }

    if (data.products.length === 0) {
        return (
            <View style={styles.center}>
                <Text style={styles.infoText}>No products found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>E-commerce App</Text>
            <Text style={styles.subtitle}>
                Products loaded from the DummyJSON Products API.
            </Text>

            {/* Nieuwe zoekbalk */}
            <SearchBar />

            {/* Nieuwe filterbalk voor categorieën */}
            <CategoryFilter />

            <FlashList
                data={data.products}
                keyExtractor={(item) => item.id.toString()}
                estimatedItemSize={80}
                refreshing={isFetching}
                onRefresh={refetch}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        onPress={() => handleOpenDetails(item.id)}
                        isFavorite={favoriteIds.includes(item.id)}
                        onToggleFavorite={() => handleToggleFavorite(item.id)}
                    />
                )}
            />
            <ProductDetailsModal
                productId={selectedProductId}
                visible={selectedProductId !== null}
                onClose={handleCloseDetails}
            />
        </View>
    );
};


export default ProductsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 12,
        backgroundColor: "#f8f9fa",
        gap: 8,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
    },
    subtitle: {
        fontSize: 14,
        opacity: 0.7,
        marginBottom: 8,
    },
    itemCard: {
        paddingVertical: 8,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#e5e7eb",
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "500",
    },
    itemCategory: {
        fontSize: 12,
        opacity: 0.7,
        marginTop: 2,
    },
    itemPrice: {
        marginTop: 4,
        fontWeight: "600",
    },
    infoText: {
        marginTop: 8,
        opacity: 0.7,
    },
    errorText: {
        color: "red",
        marginBottom: 4,
    },
    linkText: {
        color: "#2563eb",
        textDecorationLine: "underline",
        marginTop: 4,
    },
});
