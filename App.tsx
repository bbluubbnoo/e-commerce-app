import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProductsScreen from "./src/screens/products-screen";

const App: React.FC = () => {
    return (
        <SafeAreaProvider>
            <ProductsScreen />
        </SafeAreaProvider>
    );
};

export default App;
