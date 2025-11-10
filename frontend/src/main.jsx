import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Leads from "./pages/Leads.jsx";
import Sales from "./pages/Sales.jsx";
import Agents from "./pages/Agents.jsx";
import Reports from "./pages/Reports.jsx";
import { LeadProvider } from "./contexts/LeadContext.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/leads", element: <Leads /> },
  { path: "/sales", element: <Sales /> },
  { path: "/agents", element: <Agents /> },
  { path: "/reports", element: <Reports /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LeadProvider>
      <RouterProvider router={router} />
    </LeadProvider>
  </StrictMode>
);
