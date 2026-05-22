import Project from "../models/Project.js";
import { isDatabaseReady } from "../config/db.js";
import portfolioSeed from "../data/portfolioSeed.js";

const cleanText = (value) => String(value || "").trim();

const parseTechnologies = (value) => {
  if (Array.isArray(value)) {
    return value.map(cleanText).filter(Boolean);
  }

  return cleanText(value)
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);
};

const normalizeProjectPayload = (body) => ({
  title: cleanText(body.title),
  category: cleanText(body.category) || "Projet web",
  description: cleanText(body.description),
  impact: cleanText(body.impact) || "Projet réalisé pour améliorer l'expérience utilisateur.",
  technologies: parseTechnologies(body.technologies),
  githubUrl: cleanText(body.githubUrl) || "https://github.com/",
  demoUrl: cleanText(body.demoUrl) || "https://example.com",
  image: cleanText(body.image) || "cloud",
  imageUrl: cleanText(body.imageUrl),
  featured: Boolean(body.featured)
});

const validateProject = (project) => {
  const errors = [];

  if (!project.title) {
    errors.push("Le titre est obligatoire.");
  }

  if (!project.description || project.description.length < 20) {
    errors.push("La description doit contenir au moins 20 caractères.");
  }

  if (project.technologies.length === 0) {
    errors.push("Ajoutez au moins une technologie.");
  }

  return errors;
};

export const getProjects = async (req, res, next) => {
  try {
    if (!isDatabaseReady()) {
      return res.json({ projects: portfolioSeed.projects, source: "fallback" });
    }

    const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
    return res.json({
      projects: projects.length ? projects : portfolioSeed.projects,
      source: "mongodb"
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    if (!isDatabaseReady()) {
      return res.status(503).json({
        message: "MongoDB n'est pas connecté. Le projet peut être ajouté localement côté interface."
      });
    }

    const payload = normalizeProjectPayload(req.body);
    const errors = validateProject(payload);

    if (errors.length) {
      return res.status(400).json({ message: errors.join(" ") });
    }

    const project = await Project.create({
      ...payload,
      order: -Date.now()
    });

    return res.status(201).json({
      message: "Projet ajouté avec succès.",
      project
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    if (!isDatabaseReady()) {
      return res.status(503).json({
        message: "MongoDB n'est pas connecté. Le projet peut être modifié localement côté interface."
      });
    }

    const payload = normalizeProjectPayload(req.body);
    const errors = validateProject(payload);

    if (errors.length) {
      return res.status(400).json({ message: errors.join(" ") });
    }

    const project = await Project.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true
    });

    if (!project) {
      return res.status(404).json({ message: "Projet introuvable." });
    }

    return res.json({
      message: "Projet modifié avec succès.",
      project
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    if (!isDatabaseReady()) {
      return res.status(503).json({
        message: "MongoDB n'est pas connecté. Le projet peut être supprimé localement côté interface."
      });
    }

    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Projet introuvable." });
    }

    return res.json({ message: "Projet supprimé avec succès." });
  } catch (error) {
    next(error);
  }
};
