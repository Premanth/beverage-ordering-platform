import { useState } from "react";
import Navbar from "./components/Navbar";
import FloatingCartButton from "./components/FloatingCartButton";
import CartDrawer from "./components/CartDrawer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import OrderSuccess from "./pages/OrderSuccess";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/tracking" element={<OrderTracking />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>

      <FloatingCartButton onClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
