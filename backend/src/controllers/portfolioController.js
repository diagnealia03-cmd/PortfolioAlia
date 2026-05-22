import Experience from "../models/Experience.js";
import Profile from "../models/Profile.js";
import Project from "../models/Project.js";
import Service from "../models/Service.js";
import SkillGroup from "../models/SkillGroup.js";
import Testimonial from "../models/Testimonial.js";
import { isDatabaseReady } from "../config/db.js";
import portfolioSeed from "../data/portfolioSeed.js";

const byOrder = { order: 1, createdAt: 1 };

export const getPortfolio = async (req, res, next) => {
  try {
    if (!isDatabaseReady()) {
      return res.json({ ...portfolioSeed, source: "fallback" });
    }

    const [profile, projects, skillGroups, experiences, services, testimonials] =
      await Promise.all([
        Profile.findOne().lean(),
        Project.find().sort(byOrder).lean(),
        SkillGroup.find().sort(byOrder).lean(),
        Experience.find().sort(byOrder).lean(),
        Service.find().sort(byOrder).lean(),
        Testimonial.find().sort(byOrder).lean()
      ]);

    return res.json({
      profile: profile || portfolioSeed.profile,
      projects: projects.length ? projects : portfolioSeed.projects,
      skillGroups: skillGroups.length ? skillGroups : portfolioSeed.skillGroups,
      experiences: experiences.length ? experiences : portfolioSeed.experiences,
      services: services.length ? services : portfolioSeed.services,
      testimonials: testimonials.length ? testimonials : portfolioSeed.testimonials,
      source: "mongodb"
    });
  } catch (error) {
    next(error);
  }
};
