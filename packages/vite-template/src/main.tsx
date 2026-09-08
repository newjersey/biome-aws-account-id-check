import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@/i18n/config";
import "@/index.css";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";
import { routesConfig } from "@/routes/routesConfig";

const router = createBrowserRouter(routesConfig);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
);
