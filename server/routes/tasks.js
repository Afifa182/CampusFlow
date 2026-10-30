const express = require("express");
const Task = require("../models/Task");
const protect = require("../middleware/auth");

const router = express.Router();
router.use(protect); // every task route needs a logged-in user

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// READ  GET /api/tasks?status=todo&search=abc
router.get("/", async (req, res) => {
  try {
    const filter = { user: req.user._id };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.search) {
      filter.title = { $regex: escapeRegex(req.query.search), $options: "i" };
    }
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE  POST /api/tasks
router.post("/", async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      status,
      priority,
      dueDate: dueDate || undefined,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE  PUT /api/tasks/:id
router.put("/:id", async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description, status, priority, dueDate: dueDate || null },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE  DELETE /api/tasks/:id
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted", id: req.params.id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
