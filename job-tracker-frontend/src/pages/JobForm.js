import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

export default function JobForm() {
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    appliedDate: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      API.get(`/jobs/${id}`).then((res) => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await API.put(`/jobs/${id}`, form);
      alert("Job updated!");
    } else {
      await API.post("/jobs", form);
      alert("Job added!");
    }
    navigate("/");
  };

  return (
    <>
      <div className="floating-background" />
      <div className="page-wrapper">
        <div className="content-box">
          <h2>{id ? "✏️ Edit Job" : "➕ Add New Job"}</h2>
          <form onSubmit={handleSubmit} className="job-form">
            <input
              name="company"
              placeholder="Company"
              value={form.company}
              onChange={handleChange}
              required
            />
            <input
              name="role"
              placeholder="Role"
              value={form.role}
              onChange={handleChange}
              required
            />
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
              <option value="Accepted">Accepted</option>
            </select>
            <input
              type="date"
              name="appliedDate"
              value={form.appliedDate}
              onChange={handleChange}
              required
            />
            <textarea
              name="notes"
              placeholder="Notes"
              value={form.notes}
              onChange={handleChange}
            />
            <button type="submit">{id ? "Update Job" : "Add Job"}</button>
          </form>
        </div>
      </div>
    </>
  );
}
