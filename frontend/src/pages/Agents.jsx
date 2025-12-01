import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import LeadContext from "../contexts/LeadContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Agents() {
  const { agents, openAgentModal } = useContext(LeadContext);
  return (
    <>
      <main>
        <Header />
        <div className="row w-100">
          <Sidebar />
          <div className="col-9 col-md-10 ps-0">
            <div className="container mw-700 d-flex flex-column justify-content-center">
              <h2 className="p-4 text-center">Sales Agent List</h2>
              <div className="my-2">
                <ul className="list-group">
                  {/* {loading && <p>Loading...</p>}
                  {error && <p>Error loading data.</p>} */}
                  {agents?.map((s) => (
                    <li className="list-group-item py-3">
                      <div className="row">
                        <div className="col-md-6">
                          <b>Agent: </b>
                          <Link to={`/agent/${s._id}`}>
                            <button className="btn btn-secondary shadow-sm btn-sm opacity-75">
                              {s.name}
                            </button>{" "}
                          </Link>
                        </div>
                        <div className="col-md-6 border-start">
                          <b>Email: </b>
                          {`${s.email}`}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-2 d-flex flex-column gap-3">
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-primary btn-lg col-md-4 my-4"
                    onClick={openAgentModal}
                  >
                    Add New Agent
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

export default Agents;
