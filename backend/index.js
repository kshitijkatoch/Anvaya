const { initializeDatabase } = require("./db/db.connect");
const Lead = require("./models/lead.model");
const SalesAgent = require("./models/sales.model");
const Comment = require("./models/comment.model");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
initializeDatabase();

// ===== Lead Routes ===== //
// POST
app.post("/leads", async (req, res) => {
  try {
    const body = Array.isArray(req.body) ? req.body : [req.body];
    const data = await Lead.insertMany(body);
    res.status(201).json({ message: "Leads added successfully", leads: data });
  } catch (error) {
    res.status(500).json({ error: "Failed to add the leads." });
  }
});

// GET
app.get("/leads", async (req, res) => {
  try {
    const data = await Lead.find().populate("salesAgent", "name");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the leads." });
  }
});

// GET by id
app.get("/leads/:id", async (req, res) => {
  try {
    const data = await Lead.findById(req.params.id).populate(
      "salesAgent",
      "name"
    );
    data ? res.json(data) : res.status(404).json({ error: "Lead not found." });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the lead." });
  }
});

// Update
app.post("/api/leads/:id", async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("salesAgent", "name");

    updatedLead
      ? res.json({
          message: "Lead updated successfully",
          lead: updatedLead,
        })
      : res.status(404).json({ error: "Lead not found." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update lead." });
  }
});

// DELETE by id
app.delete("/leads/:id", async (req, res) => {
  try {
    const data = await Lead.findByIdAndDelete(req.params.id);
    data
      ? res.json({ message: "Lead deleted successfully.", deleted: data })
      : res.status(404).json({ error: "Lead not found." });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the lead." });
  }
});

// ===== Sales Agent Routes ===== //
// POST
app.post("/agents", async (req, res) => {
  try {
    const body = Array.isArray(req.body) ? req.body : [req.body];

    for (const agent of body) {
      if (!agent.name || !agent.email) {
        return res
          .status(400)
          .json({ error: "Each agent must have name and email." });
      }

      const exists = await SalesAgent.findOne({ email: agent.email });
      if (exists) {
        return res.status(409).json({
          error: `Agent with email '${agent.email}' already exists.`,
        });
      }
    }

    const agents = await SalesAgent.insertMany(body);
    res
      .status(201)
      .json({ message: "Sales agents added successfully", agents });
  } catch (err) {
    res.status(500).json({ error: "Failed to add sales agent." });
  }
});

// GET
app.get("/agents", async (req, res) => {
  try {
    const agents = await SalesAgent.find().sort({ createdAt: -1 });
    res.status(200).json(agents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sales agents." });
  }
});

// ===== Comment Routes ===== //
// POST
app.post("/leads/:id/comments", async (req, res) => {
  try {
    const { commentText, author } = req.body;
    const leadId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(leadId))
      return res.status(400).json({ error: "Invalid Lead ID." });

    if (!commentText || typeof commentText !== "string")
      return res
        .status(400)
        .json({ error: "Comment text is required and must be a string." });

    if (!author || !mongoose.Types.ObjectId.isValid(author))
      return res
        .status(400)
        .json({ error: "Valid author (SalesAgent ID) is required." });

    const lead = await Lead.findById(leadId);
    if (!lead)
      return res
        .status(404)
        .json({ error: `Lead with ID '${leadId}' not found.` });

    const comment = await Comment.create({ lead: leadId, author, commentText });

    const populated = await comment.populate("author", "name");

    res.status(201).json({
      id: populated._id,
      commentText: populated.commentText,
      author: populated.author.name,
      createdAt: populated.createdAt,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment." });
  }
});

// GET
app.get("/leads/:id/comments", async (req, res) => {
  try {
    const leadId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(leadId))
      return res.status(400).json({ error: "Invalid Lead ID." });

    const leadExists = await Lead.findById(leadId);
    if (!leadExists)
      return res
        .status(404)
        .json({ error: `Lead with ID '${leadId}' not found.` });

    const comments = await Comment.find({ lead: leadId })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(
      comments.map((c) => ({
        id: c._id,
        commentText: c.commentText,
        author: c.author.name,
        createdAt: c.createdAt,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments." });
  }
});

// ===== Report API Routes ===== //
// GET report last week
app.get("/report/last-week", async (req, res) => {
  try {
    const now = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(now.getDate() - 7);

    const leads = await Lead.find({
      status: "Closed",
      closedAt: { $gte: lastWeek, $lte: now },
    })
      .populate("salesAgent", "name")
      .select("name salesAgent closedAt");

    const formatted = leads.map((lead) => ({
      id: lead._id,
      name: lead.name,
      salesAgent: lead.salesAgent?.name || "N/A",
      closedAt: lead.closedAt,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leads closed last week" });
  }
});

// GET report pipeline
app.get("/report/pipeline", async (req, res) => {
  try {
    const total = await Lead.countDocuments({ status: { $ne: "Closed" } });
    res.status(200).json({ totalPipelineLeads: total });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch total pipeline leads" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
