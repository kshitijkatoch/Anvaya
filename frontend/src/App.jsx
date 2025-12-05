import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import LeadContext from "./contexts/LeadContext";

function App() {
  const {
    leads,
    loading,
    error,
    newLeads,
    contactedLeads,
    qualifiedLeads,
    setFilter,
    openLeadModal,
  } = useContext(LeadContext);
  const [activeFilter, setActiveFilter] = useState("");
  const refreshLeads = () => setFilter(activeFilter);

  return (
    <>
      <main>
        <Header />
        <div className="row w-100">
          <Sidebar />
          <div className="col-9 col-md-10 ps-0">
            <div className="container mw-700 d-flex flex-column justify-content-center">
              <h2 className="p-4 text-center">Main Content</h2>
              {/* Leads */}
              {loading ? (
                <p className="text-center">Loading...</p>
              ) : error ? (
                <p className="text-center">Error loading data.</p>
              ) : (
                <div className="d-flex flex-wrap gap-3 my-2">
                  {leads?.map((l) => (
                    <Link to={`/leads/${l._id}`} key={l._id}>
                      <button
                        className="btn btn-outline-info"
                        style={{ "--bs-btn-hover-color": "#fff" }}
                      >
                        {l.name}
                      </button>
                    </Link>
                  ))}
                </div>
              )}

              <hr />
              {/* Status */}
              <div className="mb-2">
                <h4>Lead Status:</h4>
                <ul className="list-group col-md-3">
                  <li className="list-group-item">New: {newLeads}</li>
                  <li className="list-group-item">
                    Contacted: {contactedLeads}
                  </li>
                  <li className="list-group-item">
                    Qualified: {qualifiedLeads}
                  </li>
                </ul>
              </div>
              <hr />
              {/* Quick Filters */}
              <div className="mt-2">
                <div className="d-flex flex-wrap gap-md-3 gap-1">
                  <h4>Quick Filters:</h4>
                  <div className="d-flex flex-wrap gap-3">
                    <button
                      className={`btn btn-outline-secondary ${
                        activeFilter === "New" ? "active" : ""
                      }`}
                      onClick={() => {
                        setFilter("New"), setActiveFilter("New");
                      }}
                    >
                      New
                    </button>
                    <button
                      className={`btn btn-outline-secondary ${
                        activeFilter === "Contacted" ? "active" : ""
                      }`}
                      onClick={() => {
                        setFilter("Contacted"), setActiveFilter("Contacted");
                      }}
                    >
                      Contacted
                    </button>
                    <button
                      className={`btn btn-outline-secondary ${
                        activeFilter === "Qualified" ? "active" : ""
                      }`}
                      onClick={() => {
                        setFilter("Qualified"), setActiveFilter("Qualified");
                      }}
                    >
                      Qualified
                    </button>
                    <button
                      className={`btn btn-outline-secondary ${
                        activeFilter === "" ? "active" : ""
                      }`}
                      onClick={() => {
                        setFilter(""), setActiveFilter("");
                      }}
                    >
                      All
                    </button>
                  </div>
                </div>
                {/* Add New Lead */}
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

export default App;
