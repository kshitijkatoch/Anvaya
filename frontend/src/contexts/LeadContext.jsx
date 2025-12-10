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

  const newLeads = leads.reduce((s, l) => (l.status === "New" ? s + 1 : s), 0);
  const contactedLeads = leads.reduce(
    (s, l) => (l.status === "Contacted" ? s + 1 : s),
    0
  );
  const qualifiedLeads = leads.reduce(
    (s, l) => (l.status === "Qualified" ? s + 1 : s),
    0
  );
  const closedLeads = leads.reduce(
    (s, l) => (l.status === "Closed" ? s + 1 : s),
    0
  );

  // Update Lead
  const updateLead = async (id, updatedData) => {
    try {
      const res = await fetch(`https://anvaya-brown.vercel.app/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Update React state properly
      setLeads((prev) => prev.map((l) => (l._id === id ? data.lead : l)));
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

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

  // Pipeline
  const {
    data: pipelineData,
    loading: pipelineLoading,
    error: pipelineError,
  } = useFetch("https://anvaya-brown.vercel.app/report/pipeline");

  // Delete lead and agent
  const deleteLead = async (id) => {
    const res = await fetch(`https://anvaya-brown.vercel.app/leads/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("Failed to delete lead");
      return;
    }

    setLeads((prev) => prev.filter((l) => l._id !== id));
  };

  const deleteAgent = async (id) => {
    const res = await fetch(`https://anvaya-brown.vercel.app/agents/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("Failed to delete agent");
      return;
    }

    setAgents((prev) => prev.filter((a) => a._id !== id));
  };

  return (
    <LeadContext.Provider
      value={{
        // Leads
        leads,
        setLeads,
        loading,
        error,
        setFilter,
        newLeads,
        contactedLeads,
        qualifiedLeads,
        closedLeads,
        updateLead,

        // Agents
        agents,
        setAgents,
        agentsLoading,
        agentsError,

        // Pipeline
        totalPipelineLeads: pipelineData?.totalPipelineLeads || 0,

        // Delete
        deleteLead,
        deleteAgent,

        // Modals
        openLeadModal,
        closeLeadModal,
        openAgentModal,
        closeAgentModal,
        showLeadModal,
        showAgentModal,
      }}
    >
      {children}

      {/* Modals */}
      {showLeadModal && (
        <AddLeadModal show={showLeadModal} onClose={closeLeadModal} />
      )}

      {showAgentModal && (
        <AddAgentModal show={showAgentModal} onClose={closeAgentModal} />
      )}
    </LeadContext.Provider>
  );
};

export default LeadContext;
