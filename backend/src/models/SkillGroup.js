import mongoose from "mongoose";

const skillGroupSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    accent: { type: String, required: true },
    skills: [{ type: String }],
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("SkillGroup", skillGroupSchema);
