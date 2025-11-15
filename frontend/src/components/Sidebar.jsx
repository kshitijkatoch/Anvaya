import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isDashboard = location.pathname === "/";

  return (
    <div className="sidebar col-3 col-md-2">
      <div className="bg-dark p-3 text-white sidebar-height">
        <div className="d-flex flex-column gap-3">
          {isDashboard ? (
            <>
              <NavLink
                to="/leads"
                className={
                  "btn btn-sidebar text-start p-md-3 p-2 w-100 fs-5 text-white text-opacity-75"
                }
              >
                <i className="bi bi-folder me-2"></i>{" "}
                <p className="d-none d-md-inline">Leads</p>
              </NavLink>

              <NavLink
                to="/sales"
                className={
                  "btn btn-sidebar text-start p-md-3 p-2 w-100 fs-5 text-white text-opacity-75"
                }
              >
                <i className="bi bi-graph-up me-2"></i>{" "}
                <p className="d-none d-md-inline">Sales</p>
              </NavLink>

              <NavLink
                to="/agents"
                className={
                  "btn btn-sidebar text-start p-md-3 p-2 w-100 fs-5 text-white text-opacity-75"
                }
              >
                <i className="bi bi-people-fill me-2"></i>{" "}
                <p className="d-none d-md-inline">Agents</p>
              </NavLink>

              <NavLink
                to="/reports"
                className={
                  "btn btn-sidebar text-start p-md-3 p-2 w-100 fs-5 text-white text-opacity-75"
                }
              >
                <i className="bi bi-file-earmark-bar-graph me-2"></i>{" "}
                <p className="d-none d-md-inline">Reports</p>
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/"
              className="btn btn-info text-start p-md-3 p-2 w-100 fs-6 text-white fw-bold-hover"
            >
              <i className="bi bi-arrow-left"></i>{" "}
              <p className="d-none d-md-inline">Dashboard</p>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
