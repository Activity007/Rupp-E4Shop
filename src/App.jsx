import { useState } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import ProductModal from "./components/ProductModal.jsx";
import useProduct from "./hooks/useProduct.js";

import HomePage from "./pages/Home.jsx";
import PhoneProducts from "./pages/PhoneProducts.jsx";
import ComputerProducts from "./pages/ComputerProducts.jsx";
import WatchProducts from "./pages/WatchProducts.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  const { loading, products } = useProduct();

  const [cartItems, setCartItems] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  function handleAddToCart(product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  }

  function handleRemoveFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }

  function handleIncreaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function handleDecreaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  const pageProps = {
    loading,
    products,
    onAddToCart: handleAddToCart,
    onQuickView: setQuickViewProduct,
  };

  return (
    <HashRouter>
      <Layout
        cartItems={cartItems}
        onDecreaseQuantity={handleDecreaseQuantity}
        onIncreaseQuantity={handleIncreaseQuantity}
        onRemoveFromCart={handleRemoveFromCart}
      >
        <Routes>
          <Route path="/" element={<HomePage {...pageProps} />} />
          <Route path="/phone" element={<PhoneProducts {...pageProps} />} />
          <Route
            path="/computer"
            element={<ComputerProducts {...pageProps} />}
          />
          <Route path="/watch" element={<WatchProducts {...pageProps} />} />
          <Route path="/about" element={<AboutUs {...pageProps} />} />
          <Route path="/contact" element={<Contact {...pageProps} />} />

          <Route
            path="/product/:productId"
            element={<SingleProduct {...pageProps} />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>

      {quickViewProduct && (
        <ProductModal
          product={quickViewProduct}
          onAddToCart={handleAddToCart}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </HashRouter>
  );
}