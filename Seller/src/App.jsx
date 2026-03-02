import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import {  getUser, logout } from "./store/slice/user.slice";
import toast from "react-hot-toast";
import PageNotFound from "./pages/PageNotFound";

function App() {
  // const { isAuthenticated, user } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(getUser());
  //   if (Object.keys(user).length && user.role != "seller") {
  //     toast.error("You are not verified Seller", { position: "top-center" });
  //     navigate("/login");

  //     dispatch(logout());
  //     return;
  //   }
  //   isAuthenticated && navigate("/");
  // }, [isAuthenticated]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Auth />} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </>
  );
}

export default App;
