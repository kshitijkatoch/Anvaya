import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import LeadContext from "../contexts/LeadContext";

import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Reports() {
  const {
    leads,
    newLeads,
    contactedLeads,
    qualifiedLeads,
    closedLeads,
    totalPipelineLeads,
    agents,
  } = useContext(LeadContext);

  const closedLeadsPerAgent = agents?.map((agent) => {
    return leads?.filter(
      (lead) =>
        lead.status === "Closed" &&
        String(lead.salesAgent?._id) === String(agent._id)
    ).length;
  });

  const leadsClosedVsPipeline = {
    labels: ["Closed", "Pipeline"],
    datasets: [
      {
        data: [closedLeads, totalPipelineLeads],
        backgroundColor: ["#4CAF50", "#FFC107"],
      },
    ],
  };

  const leadStatusDistribution = {
    labels: ["New", "Contacted", "Qualified", "Closed"],
    datasets: [
      {
        data: [newLeads, contactedLeads, qualifiedLeads, closedLeads],
        backgroundColor: ["#03A9F4", "#8BC34A", "#FFC107", "#E91E63"],
      },
    ],
  };

  const leadsClosedByAgent = {
    labels: agents.map((a) => a.name),
    datasets: [
      {
        label: "Closed Leads",
        data: closedLeadsPerAgent,
        backgroundColor: "#2196F3",
      },
    ],
  };

  return (
    <>
      <main>
        <Header />

        <div className="row w-100">
          <Sidebar />

          <div className="col-9 col-md-10 ps-0">
            <div className="container mw-700 d-flex flex-column justify-content-center">
              {/* Reports */}
              <h2 className="text-center p-4">Report Overview</h2>

              <div className="row">
                <div className="col-md-6">
                  {/* -------- Pie Chart 1 -------- */}
                  <div className="report-card shadow-sm p-4 mb-4 rounded bg-white">
                    <div className="chart-wrapper">
                      <Pie data={leadsClosedVsPipeline} />
                    </div>
                    <h5 className="text-center pt-3">
                      Total Leads Closed vs In Pipeline
                    </h5>
                  </div>
                </div>
                <div className="col-md-6">
                  {/* -------- Pie Chart 2 -------- */}
                  <div className="report-card shadow-sm p-4 mb-4 rounded bg-white">
                    <div className="chart-wrapper">
                      <Pie data={leadStatusDistribution} />
                    </div>
                    <h5 className="text-center pt-3">
                      Lead Status Distribution
                    </h5>
                  </div>
                </div>
                <div className="col-md-12">
                  {/* -------- Bar Chart -------- */}
                  <div className="report-card shadow-sm p-4 mb-4 rounded bg-white">
                    <div className="chart-wrapper">
                      <Bar data={leadsClosedByAgent} />
                    </div>
                    <h5 className="text-center pt-3">
                      Leads Closed by Sales Agent
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Reports;
