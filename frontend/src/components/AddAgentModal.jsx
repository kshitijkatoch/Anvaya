import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import LeadContext from "../contexts/LeadContext";

const AddAgentModal = ({ show, onClose }) => {
  const { setAgents } = useContext(LeadContext);

  const [agent, setAgent] = useState({
    name: "",
    email: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgent({ ...agent, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("https://anvaya-brown.vercel.app/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agent), // Single agent object
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to add agent");
        return;
      }

      const addedAgent = data.agents;

      // Update UI immediately
      setAgents((prev) => [addedAgent[0], ...prev]);

      alert("Sales Agent added!");

      // Reset form & close modal
      setAgent({ name: "", email: "" });
      onClose();
    } catch (err) {
      console.error("Error adding agent:", err);
      alert("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Sales Agent</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Name */}
          <Form.Group className="mb-3">
            <Form.Label>Agent Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={agent.name}
              onChange={handleChange}
              placeholder="Enter agent name"
              required
            />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={agent.email}
              onChange={handleChange}
              placeholder="Enter agent email"
              required
            />
          </Form.Group>

          <Button type="submit" className="w-100" disabled={submitting}>
            {submitting ? "Saving..." : "Add Agent"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAgentModal;
