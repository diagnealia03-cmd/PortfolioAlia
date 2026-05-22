import { ArrowUpRight, ImagePlus, Pencil, Plus, Send, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getProjectImage } from "../data/projectImages.js";
import { projectSlug } from "../utils/projects.js";
import SectionTitle from "./SectionTitle.jsx";

const initialProject = {
  title: "",
  category: "Développement web",
  description: "",
  impact: "Projet réalisé et ajouté au portfolio.",
  technologies: "HTML, CSS, PHP",
  githubUrl: "",
  demoUrl: "",
  image: "tailwind",
  imageUrl: ""
};

const imageFromFile = (file) =>
  new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      resolve("");
      return;
    }

    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const maxSize = 900;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

function Projects({ projects, onProjectAdded, onProjectUpdated, onProjectDeleted }) {
  const [form, setForm] = useState(initialProject);
  const [editingProject, setEditingProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const updatePhoto = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const imageUrl = await imageFromFile(file);
    setForm((current) => ({ ...current, imageUrl }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const message = editingProject
      ? await onProjectUpdated(editingProject, form)
      : await onProjectAdded(form);
    setStatus(message);
    setEditingProject(null);
    setForm(initialProject);
    event.target.reset();
    setIsSubmitting(false);
  };

  const startEdit = (project) => {
    setEditingProject(project);
    setStatus("");
    setForm({
      title: project.title || "",
      category: project.category || "Développement web",
      description: project.description || "",
      impact: project.impact || "Projet réalisé et ajouté au portfolio.",
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : project.technologies || "",
      githubUrl: project.githubUrl === "https://github.com/" ? "" : project.githubUrl || "",
      demoUrl: project.demoUrl === "https://example.com" ? "" : project.demoUrl || "",
      image: project.image || "tailwind",
      imageUrl: project.imageUrl || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingProject(null);
    setStatus("");
    setForm(initialProject);
  };

  const removeProject = async (project) => {
    const confirmed = window.confirm(`Supprimer le projet "${project.title}" ?`);
    if (!confirmed) {
      return;
    }

    const message = await onProjectDeleted(project);
    setStatus(message);
  };

  return (
    <section className="page-section projects-page">
      <div className="container">
        <SectionTitle eyebrow="Projets" title="Réalisations">
          Ajoutez un projet et gardez une liste claire de vos travaux.
        </SectionTitle>

        <form className="add-project-form compact-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <span className="card-icon">
              <Plus size={22} />
            </span>
            <div>
              <h3>Ajouter un projet</h3>
              <p>
                {editingProject
                  ? "Modifiez les informations du projet."
                  : "Une photo, un titre, une courte description."}
              </p>
            </div>
          </div>

          <div className="project-form-layout">
            <label className="photo-picker">
              {form.imageUrl ? (
                <img src={form.imageUrl} alt="Aperçu du projet" />
              ) : (
                <span>
                  <ImagePlus size={26} />
                  Photo du projet
                </span>
              )}
              <input type="file" accept="image/*" onChange={updatePhoto} />
            </label>

            <div className="form-grid">
              <label>
                Titre
                <input
                  name="title"
                  value={form.title}
                  onChange={updateField}
                  placeholder="Nom du projet"
                  required
                />
              </label>
              <label>
                Catégorie
                <select name="category" value={form.category} onChange={updateField}>
                  <option>Développement web</option>
                  <option>Programmation</option>
                  <option>Systèmes</option>
                  <option>Base de données</option>
                  <option>Support informatique</option>
                </select>
              </label>
              <label>
                Technologies
                <input
                  name="technologies"
                  value={form.technologies}
                  onChange={updateField}
                  placeholder="HTML, CSS, PHP"
                  required
                />
              </label>
              <label className="wide">
                Description
                <textarea
                  name="description"
                  value={form.description}
                  onChange={updateField}
                  placeholder="Ce que le projet fait."
                  rows="2"
                  minLength="20"
                  required
                />
              </label>

              <details className="optional-links">
                <summary>Liens optionnels</summary>
                <div>
                  <label>
                    GitHub
                    <input
                      type="url"
                      name="githubUrl"
                      value={form.githubUrl}
                      onChange={updateField}
                      placeholder="https://github.com/..."
                    />
                  </label>
                  <label>
                    Démo
                    <input
                      type="url"
                      name="demoUrl"
                      value={form.demoUrl}
                      onChange={updateField}
                      placeholder="https://..."
                    />
                  </label>
                </div>
              </details>
            </div>
          </div>

          {status ? (
            <p className="form-status success" role="status">
              {status}
            </p>
          ) : null}

          <div className="form-actions">
            <button className="button primary" type="submit" disabled={isSubmitting}>
              <Send size={18} />
              {isSubmitting ? "Enregistrement..." : editingProject ? "Modifier" : "Ajouter"}
            </button>
            {editingProject ? (
              <button className="button ghost" type="button" onClick={cancelEdit}>
                <X size={18} />
                Annuler
              </button>
            ) : null}
          </div>
        </form>

        <div className="list-head">
          <h3>Liste des projets</h3>
          <span>{projects.length} projets</span>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project._id || project.title}>
              <Link className="project-image-link" to={`/projets/${projectSlug(project)}`}>
                <img
                  className={project.imageUrl ? "project-image is-uploaded" : "project-image"}
                  src={getProjectImage(project)}
                  alt={`Illustration ${project.title}`}
                />
              </Link>
              <div className="project-body">
                <span>{project.category}</span>
                <h3>
                  <Link to={`/projets/${projectSlug(project)}`}>{project.title}</Link>
                </h3>
                <p>{project.description}</p>
                <div className="tech-list">
                  {(project.technologies || []).slice(0, 4).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <Link to={`/projets/${projectSlug(project)}`}>
                    <ArrowUpRight size={17} />
                    Détails
                  </Link>
                  <button type="button" onClick={() => startEdit(project)}>
                    <Pencil size={16} />
                    Modifier
                  </button>
                  <button
                    className="danger-link"
                    type="button"
                    onClick={() => removeProject(project)}
                  >
                    <Trash2 size={16} />
                    Supprimer
                  </button>
                  {project.demoUrl && project.demoUrl !== "https://example.com" ? (
                    <a href={project.demoUrl} aria-label={`Voir la démo de ${project.title}`}>
                      <ArrowUpRight size={17} />
                      Démo
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
