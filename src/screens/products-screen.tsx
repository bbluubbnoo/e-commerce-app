import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useGetProductsQuery } from "../api/products-api";
import { useSelector } from "react-redux";
import { selectCategory } from "../selectors/ui-selectors";
import type { RootState } from "../store";
import CategoryFilter from "../components/category-filter";
import ProductCard from "../components/product-card";

const ProductsScreen: React.FC = () => {
    const activeCategory = useSelector((state: RootState) => selectCategory(state));

    const { data, isLoading, isError, refetch, isFetching } = useGetProductsQuery({
        search: undefined,
        category: activeCategory,
        limit: 20,
        skip: 0,
    });

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

            {/* Nieuwe filterbalk voor categorieën */}
            <CategoryFilter />

            <FlashList
                data={data.products}
                keyExtractor={(item) => item.id.toString()}
                estimatedItemSize={80}
                refreshing={isFetching}
                onRefresh={refetch}
                renderItem={({ item }) => (
                    <ProductCard product={item}/>
                )}
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
