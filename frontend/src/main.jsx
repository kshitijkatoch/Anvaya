import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Leads from "./pages/Leads.jsx";
import Status from "./pages/Status.jsx";
import Agents from "./pages/Agents.jsx";
import Reports from "./pages/Reports.jsx";
import LeadDetails from "./pages/LeadDetails.jsx";
import AgentDetails from "./pages/AgentDetails.jsx";
import Settings from "./pages/Settings.jsx";
import { LeadProvider } from "./contexts/LeadContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/leads", element: <Leads /> },
  { path: "/leads/:id", element: <LeadDetails /> },
  { path: "/status", element: <Status /> },
  { path: "/agents", element: <Agents /> },
  { path: "/agent/:id", element: <AgentDetails /> },
  { path: "/reports", element: <Reports /> },
  { path: "/settings", element: <Settings /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LeadProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" theme="colored" />
    </LeadProvider>
  </StrictMode>
);
