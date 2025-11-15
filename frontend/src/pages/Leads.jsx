import { useContext, useState, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import LeadContext from "../contexts/LeadContext";

function Leads() {
  const { leads, loading, error, setFilter, openLeadModal } =
    useContext(LeadContext);

  const [filterType, setFilterType] = useState(""); // "status" | "agent"
  const [sortType, setSortType] = useState(""); // "priority" | "time"

  // Filters
  const filteredLeads = useMemo(() => {
    let filtered = [...leads];

    if (filterType === "status") {
      // Example: Show only "New" status leads
      filtered = filtered.filter((l) => l.status === "New");
    } else if (filterType === "agent") {
      // Example: Show only assigned leads
      filtered = filtered.filter((l) => l.salesAgent);
    }

    // === SORTING ===
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
  }, [leads, filterType, sortType]);
  return (
    <>
      <main>
        <Header />
        <div className="row w-100">
          <Sidebar />
          <div className="col-md-9 col-9 ps-0">
            <div className="container d-flex flex-column justify-content-center">
              <h2 className="p-4 text-center">Lead Overview</h2>
              <div className="my-2">
                {loading && <p>Loading...</p>}
                {error && <p>Error loading data.</p>}

                <ul className="list-group col-md-5">
                  {filteredLeads.map((l) => (
                    <li key={l._id} className="list-group-item py-3">
                      <b>{l.name}</b> –{" "}
                      <button className="btn btn-success btn-sm opacity-75">
                        {l.status || "N/A"}
                      </button>{" "}
                      – [{l.salesAgent?.name || "Unassigned"}]
                    </li>
                  ))}
                </ul>
              </div>
              <hr />
              <div className="mt-2 d-flex flex-column gap-3">
                {/* Filter */}
                <div className="d-flex flex-wrap align-items-center gap-md-3 gap-1">
                  <h5>Filters:</h5>
                  {/* <div className="d-flex gap-3">
                    <button className="btn btn-outline-secondary">
                      Status
                    </button>
                    <button className="btn btn-outline-secondary">
                      Sales Agent
                    </button>
                  </div> */}
                  <div className="d-flex gap-3">
                    <button
                      className={`btn btn-outline-secondary ${
                        filterType === "status" ? "active" : ""
                      }`}
                      onClick={() =>
                        setFilterType(filterType === "status" ? "" : "status")
                      }
                    >
                      Status
                    </button>
                    <button
                      className={`btn btn-outline-secondary ${
                        filterType === "agent" ? "active" : ""
                      }`}
                      onClick={() =>
                        setFilterType(filterType === "agent" ? "" : "agent")
                      }
                    >
                      Sales Agent
                    </button>
                  </div>
                </div>
                {/* Sort */}
                <div className="d-flex flex-wrap align-items-center gap-md-3 gap-1">
                  <h5>Sort by:</h5>
                  {/* <div className="d-flex gap-3">
                    <button className="btn btn-outline-secondary">
                      Priority
                    </button>
                    <button className="btn btn-outline-secondary">
                      Time to Close
                    </button>
                  </div> */}
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
