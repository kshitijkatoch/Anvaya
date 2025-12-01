import { useContext, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import LeadContext from "../contexts/LeadContext";
import { useParams } from "react-router-dom";

function AgentDetails() {
  const { leads, loading, error } = useContext(LeadContext);

  const { id: agentID } = useParams();
  const agent = useMemo(
    () => leads.find((l) => l.salesAgent?._id === agentID)?.salesAgent,
    [leads, agentID]
  );

  const [filterType, setFilterType] = useState("");
  const [sortType, setSortType] = useState("");

  if (!agent) {
    return (
      <main>
        <Header />
        <div className="row w-100">
          <Sidebar />
          <div className="col-9 col-md-10 text-center mt-5">
            <h3>No Leads found.</h3>
          </div>
        </div>
      </main>
    );
  }

  const agentLeads = leads.filter((l) => l.salesAgent?._id === agentID);

  // Filter and sort
  const filteredLeads = useMemo(() => {
    let filtered = [...agentLeads];

    // Filtering
    if (filterType) {
      filtered = filtered.filter((l) => l.status === filterType);
    }

    // Sorting
    if (sortType === "priority") {
      const order = { High: 1, Medium: 2, Low: 3 };
      filtered.sort(
        (a, b) => (order[a.priority] || 4) - (order[b.priority] || 4)
      );
    } else if (sortType === "time") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return filtered;
  }, [agentLeads, filterType, sortType]);

  return (
    <main>
      <Header />

      <div className="row w-100">
        <Sidebar />

        <div className="col-9 col-md-10 ps-0">
          <div className="container mw-700 d-flex flex-column justify-content-center">
            <h2 className="p-3 text-center">Lead List by {agent?.name}</h2>

            {/* Lead List */}
            <div className="my-2">
              {loading && <p>Loading...</p>}
              {error && <p>Error loading data.</p>}

              <ul className="list-group">
                {filteredLeads.map((l) => (
                  <li key={l._id} className="list-group-item py-3">
                    <b>{l.name}</b> –{" "}
                    <button className="btn btn-success btn-sm opacity-75">
                      {l.status || "N/A"}
                    </button>{" "}
                    – [{l.priority || "No Priority"}]
                  </li>
                ))}
              </ul>
            </div>

            <hr />

            {/* Filters*/}
            <div className="mt-2 d-flex flex-column gap-3">
              {/* Filter */}
              <div className="d-flex flex-wrap align-items-center gap-md-3 gap-1">
                <h5>Filters:</h5>
                <div className="d-flex gap-2 flex-wrap">
                  {["New", "Contacted", "Qualified", "Closed"].map((status) => (
                    <button
                      key={status}
                      className={`btn btn-outline-secondary ${
                        filterType === status ? "active" : ""
                      }`}
                      onClick={() =>
                        setFilterType(filterType === status ? "" : status)
                      }
                    >
                      {status}
                    </button>
                  ))}
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AgentDetails;
