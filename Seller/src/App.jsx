import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
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
