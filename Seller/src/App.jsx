import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "./store/slice/user.slice";
import toast from "react-hot-toast";

function App() {
  const { isAuthenticated, loading, error, message, user } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUser());
    // if(Object.keys(user).length && user.role != "seller"){
    //   toast.error("You are not verified Seller",{position : "top-center"})
    //   navigate("/login")

    //   dispatch(logout())
    // }
  }, [isAuthenticated]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
