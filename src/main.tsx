import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/global.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

