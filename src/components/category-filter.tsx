import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useGetCategoriesQuery } from "../api/products-api";
import { setCategory } from "../slices/ui-slice";
import { selectCategory } from "../selectors/ui-selectors";
import type { AppDispatch } from "../store";

const CategoryFilter: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const activeCategory = useSelector(selectCategory);

    const { data, isLoading, isError } = useGetCategoriesQuery();

    // While categories are loading, keep the UI minimal.
    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Categories</Text>
                <Text style={styles.helperText}>Loading categories...</Text>
            </View>
        );
    }

    if (isError || !data) {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Categories</Text>
                <Text style={styles.helperText}>Could not load categories.</Text>
            </View>
        );
    }

    const handleSelectAll = () => {
        // Null means: no category filter, show all products.
        dispatch(setCategory(null));
    };

    const handleSelectCategory = (category: string) => {
        dispatch(setCategory(category));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Categories</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipsRow}
            >
                <TouchableOpacity
                    style={[
                        styles.chip,
                        activeCategory === null && styles.chipActive,
                    ]}
                    onPress={handleSelectAll}
                >
                    <Text
                        style={[
                            styles.chipText,
                            activeCategory === null && styles.chipTextActive,
                        ]}
                    >
                        All
                    </Text>
                </TouchableOpacity>

                {data.map((category) => {
                    const isActive = activeCategory === category;
                    return (
                        <TouchableOpacity
                            key={category}
                            style={[styles.chip, isActive && styles.chipActive]}
                            onPress={() => handleSelectCategory(category)}
                        >
                            <Text
                                style={[styles.chipText, isActive && styles.chipTextActive]}
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default CategoryFilter;

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        marginBottom: 4,
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 4,
    },
    helperText: {
        fontSize: 12,
        opacity: 0.7,
    },
    chipsRow: {
        columnGap: 8,
        alignItems: "center",
    },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        backgroundColor: "#f9fafb",
    },
    chipActive: {
        backgroundColor: "#2563eb",
        borderColor: "#2563eb",
    },
    chipText: {
        fontSize: 13,
    },
    chipTextActive: {
        color: "#ffffff",
        fontWeight: "600",
    },
});
