import { useEffect, useState } from "react";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/Auth.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slice/user.slice.js";
import toast from "react-hot-toast";
import { getAllUser } from "./store/slice/users.slice.js";
import { getSellers } from "./store/slice/seller.sclic.js";
import { ReactLenis, useLenis } from "lenis/react";
import { useRef } from "react";

function App() {
  // const lenisRef = useRef();
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getUser());
  }, [dispatch, isAuthenticated, error]);

  useEffect(() => {
    dispatch(getAllUser());
    // dispatch(getSellers())
  }, []);

  // const lenis = useLenis((lenis) => {
  //   // called every scroll
  //   console.log(lenis);
  // });

  return (
    <>
      <Routes>
        {/* <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Auth />} />
        {/* </ReactLenis> */}
      </Routes>
    </>
  );
}

export default App;
