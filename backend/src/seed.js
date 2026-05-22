import "dotenv/config";
import mongoose from "mongoose";
import { connectToDatabase } from "./config/db.js";
import Experience from "./models/Experience.js";
import Profile from "./models/Profile.js";
import Project from "./models/Project.js";
import Service from "./models/Service.js";
import SkillGroup from "./models/SkillGroup.js";
import Testimonial from "./models/Testimonial.js";
import Message from "./models/Message.js";
import portfolioSeed from "./data/portfolioSeed.js";

await connectToDatabase({ required: true });

await Promise.all([
  Profile.deleteMany({}),
  Project.deleteMany({}),
  SkillGroup.deleteMany({}),
  Experience.deleteMany({}),
  Service.deleteMany({}),
  Testimonial.deleteMany({}),
  Message.deleteMany({})
]);

await Promise.all([
  Profile.create(portfolioSeed.profile),
  Project.insertMany(portfolioSeed.projects),
  SkillGroup.insertMany(portfolioSeed.skillGroups),
  Experience.insertMany(portfolioSeed.experiences),
  Service.insertMany(portfolioSeed.services),
  Testimonial.insertMany(portfolioSeed.testimonials)
]);

console.log("Données portfolio insérées dans MongoDB.");
await mongoose.disconnect();
