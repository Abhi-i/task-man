import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Optional: Auto-update `updatedAt` on save
taskSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
