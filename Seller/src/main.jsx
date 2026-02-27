import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <div className={`bg-black min-h-screen min-w-screen text-white overflow-hidden`}>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </div>
  </Provider>,
);
