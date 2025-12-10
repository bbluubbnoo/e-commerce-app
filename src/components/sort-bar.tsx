import React, { useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectSort } from "../selectors/ui-selectors";
import type { AppDispatch, RootState } from "../store";
import { setSort, SortOption } from "../slices/ui-slice";

const SortBar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const activeSort = useSelector((state: RootState) => selectSort(state));

    const handleChangeSort = useCallback(
        (option: SortOption) => {
            dispatch(setSort(option));
        },
        [dispatch]
    );

    const renderButton = (label: string, option: SortOption) => {
        const isActive = activeSort === option;
        return (
            <TouchableOpacity
                key={option}
                style={[styles.button, isActive && styles.buttonActive]}
                onPress={() => handleChangeSort(option)}
            >
                <Text style={[styles.buttonText, isActive && styles.buttonTextActive]}>
                    {label}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Sort</Text>
            <View style={styles.row}>
                {renderButton("Name A-Z", "nameAsc")}
                {renderButton("Price ↑", "priceAsc")}
                {renderButton("Price ↓", "priceDesc")}
            </View>
        </View>
    );
};

export default SortBar;

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 4,
    },
    row: {
        flexDirection: "row",
        gap: 8,
    },
    button: {
        flex: 1,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        backgroundColor: "#f9fafb",
        alignItems: "center",
    },
    buttonActive: {
        backgroundColor: "#2563eb",
        borderColor: "#2563eb",
    },
    buttonText: {
        fontSize: 13,
    },
    buttonTextActive: {
        color: "#ffffff",
        fontWeight: "600",
    },
});
