import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Auth from "./pages/auth/Auth";
import Home from "./pages/Home";
import Account from "./pages/account/Account";
import ViewProduct from "./pages/products/ViewProduct";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/order/PlaceOrder";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/account" element={<Account />} />
      <Route path="/view/:prod_id" element={<ViewProduct />} />
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/place-order" element={<PlaceOrder/>}/>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
