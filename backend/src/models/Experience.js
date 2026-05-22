import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    organization: { type: String, required: true },
    period: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    achievements: [{ type: String }],
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);
