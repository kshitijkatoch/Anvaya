import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import LeadContext from "../contexts/LeadContext";

const EditLeadModal = ({ show, onClose, lead }) => {
  const { agents, updateLead } = useContext(LeadContext);

  const [enums, setEnums] = useState({
    sources: [],
    statuses: [],
    priorities: [],
  });
  const [loadingEnums, setLoadingEnums] = useState(false);

  // Editable form state
  const [form, setForm] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    priority: "",
    timeToClose: "",
    tags: [],
  });

  const [submitting, setSubmitting] = useState(false);

  // Fetch enums once modal opens
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

  // When modal opens → load enums & fill data
  useEffect(() => {
    if (show && lead) {
      fetchEnums();

      setForm({
        name: lead.name,
        source: lead.source,
        salesAgent: lead.salesAgent?._id || "",
        status: lead.status,
        priority: lead.priority,
        timeToClose: lead.timeToClose,
        tags: lead.tags || [],
      });
    }
  }, [show, lead]);

  // Handle simple fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle tags multi-select
  const handleTagsChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setForm({ ...form, tags: selected });
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const updatedData = {
      ...form,
      timeToClose: Number(form.timeToClose),
    };

    try {
      await updateLead(lead._id, updatedData);
      alert("Lead updated successfully!");
      onClose();
    } catch (error) {
      alert("Failed to update lead");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Lead</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {loadingEnums ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            {/* Name */}
            <Form.Group className="mb-3">
              <Form.Label>Lead Name</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Source */}
            <Form.Group className="mb-3">
              <Form.Label>Lead Source</Form.Label>
              <Form.Select
                name="source"
                value={form.source}
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
                value={form.salesAgent}
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

            {/* Status */}
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={form.status}
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
                value={form.priority}
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
                value={form.timeToClose}
                onChange={handleChange}
                min="1"
                required
              />
            </Form.Group>

            {/* Tags */}
            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <Form.Select
                name="tags"
                multiple
                value={form.tags}
                onChange={handleTagsChange}
              >
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
              {submitting ? "Saving..." : "Save Changes"}
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditLeadModal;
