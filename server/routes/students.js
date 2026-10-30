
const express = require("express");
const Student = require("../models/Students");
const protect = require("../middleware/auth");

const router = express.Router();

router.use(protect);

// GET /api/students — display logged-in user's students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/students — add a student
router.post("/", async (req, res) => {
  try {
    const { name, email, rollNumber, course, year } = req.body;

    const student = await Student.create({
      user: req.user._id,
      name,
      email,
      rollNumber,
      course,
      year,
    });

    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/students/:id — edit a student
router.put("/:id", async (req, res) => {
  try {
    const { name, email, rollNumber, course, year } = req.body;

    const student = await Student.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name, email, rollNumber, course, year },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/students/:id — delete a student
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted", id: req.params.id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
