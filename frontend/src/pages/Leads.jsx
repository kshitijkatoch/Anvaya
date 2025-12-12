import { useContext, useState, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import LeadContext from "../contexts/LeadContext";

function Leads() {
  const { leads, agents, loading, error, openLeadModal } =
    useContext(LeadContext);

  // Dropdown filters
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");

  const [sortType, setSortType] = useState("");

  const filteredLeads = useMemo(() => {
    let filtered = [...leads];

    // ---- FILTER BY STATUS ----
    if (selectedStatus) {
      filtered = filtered.filter((l) => l.status === selectedStatus);
    }

    // ---- FILTER BY AGENT ----
    if (selectedAgent) {
      filtered = filtered.filter((l) => l.salesAgent?._id === selectedAgent);
    }

    // ---- SORTING ----
    if (sortType === "priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      filtered.sort(
        (a, b) =>
          (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4)
      );
    } else if (sortType === "time") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return filtered;
  }, [leads, selectedStatus, selectedAgent, sortType]);

  return (
    <>
      <main>
        <Header />
        <div className="row w-100">
          <Sidebar />
          <div className="col-9 col-md-10 ps-0">
            <div className="container mw-700 d-flex flex-column justify-content-center">
              <h2 className="p-4 text-center">Lead Overview</h2>
              <div className="my-2">
                {loading && <p>Loading...</p>}
                {error && <p>Error loading data.</p>}

                <ul className="list-group">
                  {filteredLeads.map((l) => (
                    <li
                      key={l._id}
                      className="list-group-item gap-2 py-3 d-flex justify-content-between flex-wrap"
                    >
                      <div>
                        <b>{l.name}</b> [{l.salesAgent?.name || "Unassigned"}]
                      </div>
                      <div className="d-flex gap-md-3 gap-2">
                        <button className="btn btn-secondary btn-sm opacity-75 mw-80">
                          {l.priority || "N/A"}
                        </button>
                        <button className="btn btn-success btn-sm opacity-75 mw-80">
                          {l.status || "N/A"}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <hr />
              <div className="mt-2 d-flex flex-column gap-3">
                {/* Filter */}
                <div className="d-flex flex-wrap align-items-center gap-md-3 gap-1">
                  <h5>Filters:</h5>
                  <div className="d-flex flex-wrap gap-3">
                    {/* STATUS DROPDOWN */}
                    <select
                      className="form-select w-auto"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="">All Status</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Closed">Closed</option>
                    </select>

                    {/* SALES AGENT DROPDOWN */}
                    <select
                      className="form-select w-auto"
                      value={selectedAgent}
                      onChange={(e) => setSelectedAgent(e.target.value)}
                    >
                      <option value="">All Agents</option>
                      {agents.map((a) => (
                        <option key={a._id} value={a._id}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Sort */}
                <div className="d-flex flex-wrap align-items-center gap-md-3 gap-1">
                  <h5>Sort by:</h5>
                  <div className="d-flex gap-3">
                    <button
                      className={`btn btn-outline-secondary ${
                        sortType === "priority" ? "active" : ""
                      }`}
                      onClick={() =>
                        setSortType(sortType === "priority" ? "" : "priority")
                      }
                    >
                      Priority
                    </button>
                    <button
                      className={`btn btn-outline-secondary ${
                        sortType === "time" ? "active" : ""
                      }`}
                      onClick={() =>
                        setSortType(sortType === "time" ? "" : "time")
                      }
                    >
                      Time to Close
                    </button>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-primary btn-lg col-md-4 my-4"
                    onClick={openLeadModal}
                  >
                    Add New Lead
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Leads;
