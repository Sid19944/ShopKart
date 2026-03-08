import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Auth from "./pages/auth/Auth";
import Home from "./pages/Home";
import Account from "./pages/account/Account";
import ViewProduct from "./pages/products/ViewProduct";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/order/PlaceOrder";
import OrderProcessing from "./pages/order/OrderProcessing";
import OrderSuccess from "./pages/order/OrderSuccess";
import Orders from "./pages/order/Orders";
import ViewOrder from "./pages/order/ViewOrder";
import AllAddress from "./pages/address/AllAddress";
import BecomeSeller from "./pages/BecomeSeller";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/account" element={<Account />} />
      <Route path="/view/:prod_id" element={<ViewProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/place-order" element={<PlaceOrder />} />
      <Route path="/order-processing" element={<OrderProcessing />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:order_id" element={<ViewOrder />} />
      <Route path="/address" element={<AllAddress />} />
      <Route path="/become-seller" element={<BecomeSeller />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
