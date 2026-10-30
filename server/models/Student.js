
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    rollNumber: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
  },
  { timestamps: true }
);



studentSchema.index({ user: 1, email: 1 }, { unique: true });
studentSchema.index({ user: 1, rollNumber: 1 }, { unique: true });

module.exports = mongoose.model("Student", studentSchema);
