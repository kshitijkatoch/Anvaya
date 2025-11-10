import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import LeadContext from "../contexts/LeadContext";

const AddLeadModal = ({ show, onClose }) => {
  const { agents, setLeads } = useContext(LeadContext);

  const [enums, setEnums] = useState({
    sources: [],
    statuses: [],
    priorities: [],
  });
  const [loadingEnums, setLoadingEnums] = useState(false);
  const [lead, setLead] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    priority: "",
    timeToClose: "",
    tags: [],
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchEnums = async () => {
    try {
      setLoadingEnums(true);
      const res = await fetch("https://anvaya-brown.vercel.app/leads/enums");
      const data = await res.json();
      setEnums(data);
    } catch (err) {
      console.error("Failed to load enums", err);
    } finally {
      setLoadingEnums(false);
    }
  };

  useEffect(() => {
    if (show) fetchEnums();
  }, [show]);

  console.log("Enums:", enums);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLead({ ...lead, [name]: value });
  };

  const handleTagsChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setLead({ ...lead, tags: selected });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("https://anvaya-brown.vercel.app/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || "Failed to create lead");
        return;
      }

      const data = await res.json();
      setLeads((prev) => [...prev, ...data.leads]);
      alert("Lead created successfully!");
      onClose();
      setLead({
        name: "",
        source: "",
        salesAgent: "",
        status: "",
        priority: "",
        timeToClose: "",
        tags: [],
      });
    } catch (err) {
      console.error("Error submitting lead:", err);
      alert("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Lead</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {loadingEnums ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            {/* Lead Name */}
            <Form.Group className="mb-3">
              <Form.Label>Lead Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={lead.name}
                onChange={handleChange}
                placeholder="Enter lead name"
                required
              />
            </Form.Group>

            {/* Lead Source */}
            <Form.Group className="mb-3">
              <Form.Label>Lead Source</Form.Label>
              <Form.Select
                name="source"
                value={lead.source}
                onChange={handleChange}
                required
              >
                <option value="">Select Source</option>
                {enums.sources.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Sales Agent */}
            <Form.Group className="mb-3">
              <Form.Label>Sales Agent</Form.Label>
              <Form.Select
                name="salesAgent"
                value={lead.salesAgent}
                onChange={handleChange}
                required
              >
                <option value="">Select Agent</option>
                {agents.map((a) => (
                  <option key={a._id} value={a._id}>
                    {a.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Lead Status */}
            <Form.Group className="mb-3">
              <Form.Label>Lead Status</Form.Label>
              <Form.Select
                name="status"
                value={lead.status}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                {enums.statuses.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Priority */}
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                name="priority"
                value={lead.priority}
                onChange={handleChange}
                required
              >
                <option value="">Select Priority</option>
                {enums.priorities.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Time to Close */}
            <Form.Group className="mb-3">
              <Form.Label>Time to Close (Days)</Form.Label>
              <Form.Control
                type="number"
                name="timeToClose"
                value={lead.timeToClose}
                onChange={handleChange}
                min="1"
                placeholder="e.g. 7"
                required
              />
            </Form.Group>

            {/* Tags */}
            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <Form.Select multiple name="tags" onChange={handleTagsChange}>
                <option>High Value</option>
                <option>Follow-up</option>
                <option>Potential</option>
                <option>Important</option>
              </Form.Select>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create Lead"}
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddLeadModal;
