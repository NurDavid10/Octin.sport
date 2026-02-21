import { createRoot } from "react-dom/client";
import "@/i18n";
import App from "./App.tsx";
import "./index.css";

const lang = localStorage.getItem("i18nextLng") || "ar";
document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
document.documentElement.lang = lang;

createRoot(document.getElementById("root")!).render(<App />);
