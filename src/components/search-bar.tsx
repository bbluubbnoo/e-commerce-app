import React, { useState, useEffect, useCallback } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../slices/ui-slice";
import { selectSearch } from "../selectors/ui-selectors";
import type { AppDispatch } from "../store";

const SearchBar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Get the current search value from Redux.
    const globalSearch = useSelector(selectSearch);

    // Local state for the input value.
    const [value, setValue] = useState(globalSearch);

    // Update local state when the global search changes (if ever).
    useEffect(() => {
        setValue(globalSearch);
    }, [globalSearch]);

    // Debounce: wait a short time after the user stops typing.
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(setSearch(value));
        }, 400); // 400ms debounce

        // Cleanup: cancel timeout if value changes before the delay is over.
        return () => clearTimeout(timeoutId);
    }, [value, dispatch]);

    const handleChangeText = useCallback((text: string) => {
        setValue(text);
    }, []);

    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={handleChangeText}
                placeholder="Search products..."
                style={styles.input}
                returnKeyType="search"
            />
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        marginBottom: 4,
    },
    input: {
        backgroundColor: "#ffffff",
        borderRadius: 999,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        fontSize: 14,
    },
});
