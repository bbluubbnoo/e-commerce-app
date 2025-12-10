import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import type { Product } from "../api/products-api";

type Props = {
    product: Product;
    onPress?: () => void;
};

const ProductCard: React.FC<Props> = ({ product, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: product.thumbnail }} style={styles.image} />

            <View style={styles.info}>
                <Text numberOfLines={1} style={styles.title}>
                    {product.title}
                </Text>
                <Text style={styles.category}>{product.category}</Text>
                <Text style={styles.price}>€ {product.price}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 12,
        flexDirection: "row",
        gap: 10,
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: "#f2f2f2",
    },
    info: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
    },
    category: {
        fontSize: 12,
        opacity: 0.6,
        marginTop: 2,
    },
    price: {
        marginTop: 6,
        fontWeight: "700",
        fontSize: 15,
        color: "#2563eb",
    },
});
