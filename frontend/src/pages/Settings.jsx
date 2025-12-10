import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import LeadContext from "../contexts/LeadContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Settings() {
  const {
    leads,
    loading,
    error,
    agents,
    agentsLoading,
    agentsError,
    deleteLead,
    deleteAgent,
  } = useContext(LeadContext);

  return (
    <>
      <main>
        <Header />
        <div className="row w-100">
          <Sidebar />

          <div className="col-9 col-md-10 ps-0">
            <div className="container mw-700 d-flex flex-column justify-content-center">
              <h2 className="p-4 text-center">Settings</h2>

              <div className="row">
                <div className="col-md-7">
                  {/* ------------------ LEADS SECTION ------------------ */}
                  <h4 className="mb-3">All Leads</h4>
                  <ul className="list-group mb-4">
                    {loading && (
                      <li className="list-group-item py-3 text-center">
                        Leads Loading...
                      </li>
                    )}
                    {error && (
                      <li className="list-group-item py-3 text-center">
                        Error fetching leads.
                      </li>
                    )}
                    {leads?.map((lead) => (
                      <li key={lead._id} className="list-group-item py-3">
                        <div className="d-flex flec-wrap justify-content-between">
                          <p className="m-0 p-0">
                            {" "}
                            <b>Lead:</b>
                            <Link
                              to={`/lead/${lead._id}`}
                              className="text-decoration-none text-dark"
                            >
                              {" "}
                              {lead.name}
                            </Link>
                          </p>

                          <div>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteLead(lead._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-md-5">
                  {/* ------------------ AGENTS SECTION ------------------ */}
                  <h4 className="mb-3">All Agents</h4>
                  <ul className="list-group mb-4">
                    {agentsLoading && (
                      <li className="list-group-item py-3 text-center">
                        Agents Loading...
                      </li>
                    )}
                    {agentsError && (
                      <li className="list-group-item py-3 text-center">
                        Error fetching agents.
                      </li>
                    )}
                    {agents?.map((agent) => (
                      <li key={agent._id} className="list-group-item py-3">
                        <div className="d-flex flec-wrap justify-content-between">
                          <p className="m-0 p-0">
                            {" "}
                            <b>Agent:</b>
                            <Link
                              to={`/agent/${agent._id}`}
                              className="text-decoration-none text-dark"
                            >
                              {" "}
                              {agent.name}
                            </Link>
                          </p>

                          <div>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteAgent(agent._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Settings;
