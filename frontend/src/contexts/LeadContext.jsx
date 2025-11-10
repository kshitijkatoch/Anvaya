import { createContext, useEffect, useState } from "react";
import useFetch from "../useFetch";
import AddLeadModal from "../components/AddLeadModal";

const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
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
      setLeads([]);

      try {
        const url = filter
          ? `https://anvaya-brown.vercel.app/leads?status=${filter}`
          : `https://anvaya-brown.vercel.app/leads`;
        const res = await fetch(url);
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

  const {
    data: agents = [],
    loading: ll,
    error: el,
  } = useFetch("https://anvaya-brown.vercel.app/agents");

  return (
    <LeadContext.Provider
      value={{
        leads,
        setLeads,
        agents,
        loading,
        error,
        setFilter,
        openLeadModal,
        closeLeadModal,
      }}
    >
      {children}
      <AddLeadModal show={showLeadModal} onClose={closeLeadModal} />
    </LeadContext.Provider>
  );
};

export default LeadContext;
