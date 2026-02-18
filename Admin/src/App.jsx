import { useEffect, useState } from "react";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/Auth.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slice/user.slice.js";
import { getAllUser } from "./store/slice/users.slice.js";

function App() {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch, isAuthenticated]);


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
