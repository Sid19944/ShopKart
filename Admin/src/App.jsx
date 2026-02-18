import { useEffect, useState } from "react";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/Auth.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slice/user.slice.js";

function App() {
  const dispatch = useDispatch()
  const userSlice = useSelector((state)=>state.user)
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch, userSlice.isAuthenticated]);

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
