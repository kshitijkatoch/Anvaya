import { useContext, useState, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import LeadContext from "../contexts/LeadContext";

function Sales() {
  const { leads, loading, error, agents } = useContext(LeadContext);

  // Filters
  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [sortType, setSortType] = useState("");

  // Group leads by status
  const statusGroups = useMemo(() => {
    const grouped = {
      New: [],
      Contacted: [],
      Qualified: [],
      Closed: [],
    };

    leads.forEach((lead) => {
      if (grouped[lead.status]) {
        grouped[lead.status].push(lead);
      }
    });

    return grouped;
  }, [leads]);

  // Filtering + Sorting Logic
  const filterAndSort = (list) => {
    let filtered = [...list];

    if (selectedAgent) {
      filtered = filtered.filter((l) => l.salesAgent?._id === selectedAgent);
    }

    if (selectedPriority) {
      filtered = filtered.filter((l) => l.priority === selectedPriority);
    }

    if (sortType === "time") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return filtered;
  };

  const statuses = ["New", "Contacted", "Qualified", "Closed"];

  return (
    <main>
      <Header />
      <div className="row w-100">
        <Sidebar />
        <div className="col-9 col-md-10 ps-0">
          <div className="container mw-700 d-flex flex-column justify-content-center">
            <h2 className="p-3 text-center">Lead List by Status</h2>

            {loading && <p>Loading...</p>}
            {error && <p>Error loading leads.</p>}

            {/* Filters */}
            <div className="row my-3">
              <div className="col-md-4 my-2">
                <select
                  className="form-select"
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                >
                  <option value="">Filter by Sales Agent</option>
                  {agents.map((a) => (
                    <option key={a._id} value={a._id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 my-2">
                <select
                  className="form-select"
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                >
                  <option value="">Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="col-md-4 my-2">
                <select
                  className="form-select"
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                >
                  <option value="">Sort by</option>
                  <option value="time">Time to Close</option>
                </select>
              </div>
            </div>

            {/* Status Sections */}
            {statuses.map((status) => {
              const list = filterAndSort(statusGroups[status]);

              return (
                <div key={status} className="my-3">
                  <h4>
                    {status} ({list.length})
                  </h4>
                  <ul className="list-group mt-4">
                    {list.map((l) => (
                      <li key={l._id} className="list-group-item">
                        <b>{l.name}</b> —
                        <span className="text-muted">
                          [{l.salesAgent?.name || "Unassigned"}]
                        </span>
                      </li>
                    ))}

                    {list.length === 0 && (
                      <p className="text-muted px-2">No leads</p>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Sales;
