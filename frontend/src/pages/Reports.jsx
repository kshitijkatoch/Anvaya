import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Reports() {
  return (
    <>
      <main>
        <Header />
        <div className="row w-100">
          <Sidebar />
          <div className="col-9 col-md-10 ps-0">
            <div className="container mw-700 d-flex flex-column justify-content-center">
              <h2 className="p-3 text-center">Reports</h2>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Reports;
