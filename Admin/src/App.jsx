import { useState } from "react";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/Auth.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Auth/>}/>
      </Routes>
    </>
  );
}

export default App;
