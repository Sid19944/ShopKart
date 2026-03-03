import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Auth from "./pages/auth/Auth";
import Home from "./pages/Home";
import Account from "./pages/account/Account";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/account" element={<Account />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
