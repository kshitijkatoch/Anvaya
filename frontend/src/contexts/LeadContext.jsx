import { createContext, useEffect, useState } from "react";
import useFetch from "../useFetch";
import AddLeadModal from "../components/AddLeadModal";
import AddAgentModal from "../components/AddAgentModal";

const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

  // Add Lead Modal
  const [showLeadModal, setShowLeadModal] = useState(false);
  const openLeadModal = () => setShowLeadModal(true);
  const closeLeadModal = () => setShowLeadModal(false);

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      setError(null);
      // setLeads([]);

      try {
        const url = filter
          ? `https://anvaya-brown.vercel.app/leads?status=${filter}`
          : `https://anvaya-brown.vercel.app/leads`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setLeads(data);
      } catch (err) {
        setError("Failed to fetch leads");
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, [filter]);

  // Fetch Agents
  const {
    data: agentsData = [],
    loading: agentsLoading,
    error: agentsError,
  } = useFetch("https://anvaya-brown.vercel.app/agents");

  const [agents, setAgents] = useState([]);

  useEffect(() => {
    if (agentsData) setAgents(agentsData);
  }, [agentsData]);

  // Agents Modal
  const [showAgentModal, setShowAgentModal] = useState(false);
  const openAgentModal = () => setShowAgentModal(true);
  const closeAgentModal = () => setShowAgentModal(false);

  return (
    <LeadContext.Provider
      value={{
        // Leads
        leads,
        setLeads,
        loading,
        error,
        setFilter,

        // Agents
        agents,
        setAgents,
        agentsLoading,
        agentsError,

        // Modals
        openLeadModal,
        closeLeadModal,
        openAgentModal,
        closeAgentModal,
      }}
    >
      {children}

      {/* Modals */}
      <AddLeadModal show={showLeadModal} onClose={closeLeadModal} />
      <AddAgentModal show={showAgentModal} onClose={closeAgentModal} />
    </LeadContext.Provider>
  );
};

export default LeadContext;
