import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  const fetchJobs = useCallback(() => {
    const params = {};
    if (statusFilter) params.status = statusFilter;
    if (sortOrder) params.sort = sortOrder;

    API.get("/jobs", { params })
      .then((res) => setJobs(res.data))
      .catch((err) => {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [statusFilter, sortOrder, navigate]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await API.delete(`/jobs/${id}`);
    fetchJobs();
  };

  const getCardColor = (status) => {
    switch (status) {
      case "Interview":
        return "#FFF5E1";
      case "Offer":
        return "#E1FFF0";
      case "Rejected":
        return "#FFE1E1";
      case "Accepted":
        return "#E1F7FF";
      default:
        return "#F4F4F4";
    }
  };

  return (
    <>
      <div className="floating-background" />
      <div className="page-wrapper">
        <h2>📋 My Job Applications</h2>
        <div className="filters">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
            <option value="Accepted">Accepted</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Date ↑</option>
            <option value="desc">Date ↓</option>
          </select>

          <button onClick={() => navigate("/add")}>+ Add Job</button>
        </div>

        {jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="job-card"
              style={{ backgroundColor: getCardColor(job.status) }}
            >
              <h3>{job.role} @ {job.company}</h3>
              <p><strong>Status:</strong> {job.status}</p>
              <p><strong>Applied:</strong> {new Date(job.appliedDate).toLocaleDateString()}</p>
              <p>{job.notes}</p>
              <div className="buttons">
                <button onClick={() => navigate(`/edit/${job._id}`)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(job._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
