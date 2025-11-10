import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Reports() {
  return (
    <>
      <main>
        <Header />
        <div className="row w-100">
          <Sidebar />
          <div className="col-md-9 ps-0">
            <div className="d-flex justify-content-center">
              <h2 className="p-3">Reports</h2>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Reports;
