import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    ActivityIndicator,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useGetProductByIdQuery } from "../api/products-api";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { addToCart } from "../slices/cart-slice";

type Props = {
    productId: number | null;
    visible: boolean;
    onClose: () => void;
};

const ProductDetailsModal: React.FC<Props> = ({ productId, visible, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { data, isLoading, isError, refetch } = useGetProductByIdQuery(
        productId ?? 0,
        {
            skip: !productId || !visible, // do not fetch when no id or not visible
        }
    );
    const handleAddToCart = () => {
        if (!data) return;

        dispatch(
            addToCart({
                id: data.id,
                title: data.title,
                price: data.price,
                thumbnail: data.thumbnail,
            })
        );
    };

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <View style={styles.container}>
                {isLoading && (
                    <View style={styles.center}>
                        <ActivityIndicator />
                        <Text style={styles.infoText}>Loading product details...</Text>
                    </View>
                )}

                {isError && (
                    <View style={styles.center}>
                        <Text style={styles.errorText}>Failed to load details.</Text>
                        <Text style={styles.linkText} onPress={() => refetch()}>
                            Tap to retry
                        </Text>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {!isLoading && !isError && data && (
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <Image source={{ uri: data.thumbnail }} style={styles.image} />

                        <Text style={styles.title}>{data.title}</Text>
                        <Text style={styles.brandCategory}>
                            {data.brand} • {data.category}
                        </Text>

                        <Text style={styles.price}>€ {data.price}</Text>
                        <Text style={styles.rating}>⭐ {data.rating.toFixed(1)}</Text>

                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>{data.description}</Text>

                        <Text style={styles.sectionTitle}>Stock</Text>
                        <Text style={styles.description}>{data.stock} items available</Text>

                        <View style={styles.buttonsRow}>
                            <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                                <Text style={styles.addButtonText}>Add to cart</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )}
            </View>
        </Modal>
    );
};

export default ProductDetailsModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9fafb",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
        gap: 8,
    },
    image: {
        width: "100%",
        height: 220,
        borderRadius: 12,
        backgroundColor: "#e5e7eb",
        marginBottom: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
    },
    brandCategory: {
        fontSize: 14,
        opacity: 0.7,
    },
    price: {
        marginTop: 8,
        fontSize: 20,
        fontWeight: "700",
        color: "#2563eb",
    },
    rating: {
        marginTop: 4,
        fontSize: 14,
    },
    sectionTitle: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: "600",
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        marginTop: 4,
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
    closeButton: {
        marginTop: 24,
        alignSelf: "center",
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 999,
        backgroundColor: "#111827",
    },
    closeButtonText: {
        color: "#ffffff",
        fontWeight: "600",
    },
    buttonsRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 8,
        marginTop: 20,
    },
    addButton: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 999,
        backgroundColor: "#2563eb",
    },
    addButtonText: {
        color: "#ffffff",
        fontWeight: "600",
    },
});
