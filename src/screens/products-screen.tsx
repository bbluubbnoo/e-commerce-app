import React from "react";
import { View, Text, StyleSheet } from "react-native";

// This screen will later show the product list from DummyJSON.
const ProductsScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>E-commerce App</Text>
            <Text style={styles.text}>Products screen placeholder</Text>
            <Text style={styles.subtitle}>
                Here we will show the product list from DummyJSON.
            </Text>
        </View>
    );
};

export default ProductsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 8,
    },
    text: {
        fontSize: 16,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        opacity: 0.7,
        textAlign: "center",
    },
});
