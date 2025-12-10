import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
    selectCartItems,
    selectCartTotalPrice,
} from "../selectors/cart-selectors";
import type { RootState, AppDispatch } from "../store";
import {
    clearCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} from "../slices/cart-slice";
import { selectTheme } from "../selectors/ui-selectors";

type Props = {
    visible: boolean;
    onClose: () => void;
};

const CartModal: React.FC<Props> = ({ visible, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();

    const theme = useSelector((state: RootState) => selectTheme(state));
    const isDark = theme === "dark";

    const items = useSelector((state: RootState) => selectCartItems(state));
    const totalPrice = useSelector((state: RootState) =>
        selectCartTotalPrice(state)
    );

    const handleClear = () => {
        dispatch(clearCart());
    };

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const handleIncrease = (id: number) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecrease = (id: number) => {
        dispatch(decreaseQuantity(id));
    };

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <View style={[styles.container, isDark && styles.containerDark]}>
                <Text style={[styles.title, isDark && styles.titleDark]}>Your Cart</Text>

                {items.length === 0 ? (
                    <View style={styles.center}>
                        <Text
                            style={[styles.infoText, isDark && styles.textSecondaryDark]}
                        >
                            Your cart is empty.
                        </Text>

                        <TouchableOpacity
                            style={styles.buttonPrimary}
                            onPress={onClose}
                        >
                            <Text style={styles.buttonPrimaryText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <FlatList
                            data={items}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={styles.listContent}
                            renderItem={({ item }) => (
                                <View style={styles.itemRow}>
                                    <View style={styles.itemInfo}>
                                        <Text
                                            style={[
                                                styles.itemTitle,
                                                isDark && styles.textPrimaryDark,
                                            ]}
                                            numberOfLines={1}
                                        >
                                            {item.title}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.itemSubtitle,
                                                isDark && styles.textSecondaryDark,
                                            ]}
                                        >
                                            € {item.price}
                                        </Text>

                                        <View style={styles.quantityRow}>
                                            <TouchableOpacity
                                                style={styles.quantityButton}
                                                onPress={() => handleDecrease(item.id)}
                                            >
                                                <Text style={styles.quantityButtonText}>-</Text>
                                            </TouchableOpacity>

                                            <Text style={styles.quantityText}>
                                                {item.quantity}
                                            </Text>

                                            <TouchableOpacity
                                                style={styles.quantityButton}
                                                onPress={() => handleIncrease(item.id)}
                                            >
                                                <Text style={styles.quantityButtonText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={styles.itemRight}>
                                        <Text
                                            style={[
                                                styles.itemTotal,
                                                isDark && styles.textPrimaryDark,
                                            ]}
                                        >
                                            € {(item.price * item.quantity).toFixed(2)}
                                        </Text>

                                        <TouchableOpacity
                                            onPress={() => handleRemove(item.id)}
                                            style={styles.removeButton}
                                        >
                                            <Text style={styles.removeText}>Remove</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />

                        <View style={styles.footer}>
                            <Text
                                style={[
                                    styles.totalText,
                                    isDark && styles.textPrimaryDark,
                                ]}
                            >
                                Total: € {totalPrice.toFixed(2)}
                            </Text>
                            <View style={styles.footerButtons}>
                                <TouchableOpacity
                                    style={styles.buttonSecondary}
                                    onPress={handleClear}
                                >
                                    <Text style={styles.buttonSecondaryText}>Clear cart</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonPrimary}
                                    onPress={onClose}
                                >
                                    <Text style={styles.buttonPrimaryText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )}
            </View>
        </Modal>
    );
};

export default CartModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f9fafb",
    },
    containerDark: {
        backgroundColor: "#020617",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    listContent: {
        paddingVertical: 12,
        gap: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 12,
    },
    titleDark: {
        color: "#f9fafb",
    },
    infoText: {
        fontSize: 14,
        opacity: 0.7,
    },
    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingVertical: 8,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#e5e7eb",
    },
    itemInfo: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: "600",
    },
    itemSubtitle: {
        fontSize: 12,
        opacity: 0.7,
    },
    itemTotal: {
        fontSize: 14,
        fontWeight: "600",
    },
    removeButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    removeText: {
        fontSize: 12,
        color: "#dc2626",
    },
    footer: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: "#e5e7eb",
        paddingTop: 12,
        marginTop: 8,
        gap: 8,
    },
    totalText: {
        fontSize: 16,
        fontWeight: "700",
    },
    footerButtons: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 8,
    },
    buttonSecondary: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#9ca3af",
    },
    buttonSecondaryText: {
        fontSize: 14,
    },
    buttonPrimary: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: "#111827",
    },
    buttonPrimaryText: {
        fontSize: 14,
        color: "#ffffff",
        fontWeight: "600",
    },
    quantityRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginTop: 4,
    },
    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#9ca3af",
        alignItems: "center",
        justifyContent: "center",
    },
    quantityButtonText: {
        fontSize: 16,
        fontWeight: "600",
    },
    quantityText: {
        minWidth: 24,
        textAlign: "center",
        fontSize: 14,
        fontWeight: "600",
    },
    itemRight: {
        alignItems: "flex-end",
        gap: 4,
    },
    textPrimaryDark: {
        color: "#f9fafb",
    },
    textSecondaryDark: {
        color: "#e5e7eb",
    },
});
