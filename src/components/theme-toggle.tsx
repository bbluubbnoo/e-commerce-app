import React, { useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { selectTheme } from "../selectors/ui-selectors";
import { toggleTheme } from "../slices/ui-slice";

const ThemeToggle: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const theme = useSelector((state: RootState) => selectTheme(state));

    const handleToggle = useCallback(() => {
        dispatch(toggleTheme());
    }, [dispatch]);

    const isDark = theme === "dark";

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Theme</Text>
            <TouchableOpacity
                style={[styles.button, isDark && styles.buttonActive]}
                onPress={handleToggle}
            >
                <Text style={[styles.buttonText, isDark && styles.buttonTextActive]}>
                    {isDark ? "Dark" : "Light"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ThemeToggle;

const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-end",
        marginBottom: 8,
    },
    label: {
        fontSize: 12,
        opacity: 0.7,
        marginBottom: 2,
        textAlign: "right",
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        backgroundColor: "#f9fafb",
    },
    buttonActive: {
        backgroundColor: "#111827",
        borderColor: "#111827",
    },
    buttonText: {
        fontSize: 13,
    },
    buttonTextActive: {
        color: "#ffffff",
        fontWeight: "600",
    },
});
