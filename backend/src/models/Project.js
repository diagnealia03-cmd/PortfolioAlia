import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    impact: { type: String, required: true },
    technologies: [{ type: String }],
    githubUrl: String,
    demoUrl: String,
    image: { type: String, default: "cloud" },
    imageUrl: String,
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
