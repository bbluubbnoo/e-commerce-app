import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import {
    selectCartTotalItems,
    selectCartTotalPrice,
} from "../selectors/cart-selectors";
import type { RootState } from "../store";

type Props = {
    onPress: () => void;
};

const CartSummaryBar: React.FC<Props> = ({ onPress }) => {
    const totalItems = useSelector((state: RootState) =>
        selectCartTotalItems(state)
    );
    const totalPrice = useSelector((state: RootState) =>
        selectCartTotalPrice(state)
    );

    if (totalItems === 0) {
        // When cart is empty we do not show the bar.
        return null;
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>
                Cart: {totalItems} item{totalItems === 1 ? "" : "s"}
            </Text>
            <Text style={styles.text}>€ {totalPrice.toFixed(2)}</Text>
            <Text style={styles.link}>View</Text>
        </TouchableOpacity>
    );
};

export default CartSummaryBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#111827",
        borderRadius: 999,
        paddingHorizontal: 14,
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
        gap: 12,
    },
    text: {
        color: "#ffffff",
        fontSize: 14,
    },
    link: {
        color: "#bfdbfe",
        fontSize: 14,
        fontWeight: "600",
    },
});
