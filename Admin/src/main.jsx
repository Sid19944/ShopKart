import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <div className="min-h-screen min-w-screen bg-black text-white">
      <App />
    </div>
);
