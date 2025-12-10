import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./src/store";
import ProductsScreen from "./src/screens/products-screen";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <ProductsScreen />
            </SafeAreaProvider>
        </Provider>
    );
};

export default App;
