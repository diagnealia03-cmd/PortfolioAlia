import mongoose from "mongoose";

const statSchema = new mongoose.Schema(
  {
    value: { type: String, required: true },
    label: { type: String, required: true }
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    availability: { type: String },
    bio: { type: String, required: true },
    highlights: [{ type: String }],
    stats: [statSchema],
    socials: {
      github: String,
      linkedin: String,
      email: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
