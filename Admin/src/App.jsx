import { useEffect, useState } from "react";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import Auth from "./pages/auth/Auth.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser, logout } from "./store/slice/user.slice.js";
// import toast from "react-hot-toast";
// import { getAllUser } from "./store/slice/users.slice.js";
// import { getSellers } from "./store/slice/seller.sclic.js";
// import { getAllOrderItems } from "./store/slice/ordersItems.slice.js";
// import { getAllProducts } from "./store/slice/products.slice.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Auth />} />
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
