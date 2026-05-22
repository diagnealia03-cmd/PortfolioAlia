import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getProjectImage } from "../data/projectImages.js";
import { projectSlug } from "../utils/projects.js";

function ProjectDetailPage({ projects }) {
  const { slug } = useParams();
  const project = projects.find((item) => projectSlug(item) === slug);

  if (!project) {
    return <Navigate to="/projets" replace />;
  }

  return (
    <main className="page project-detail-page">
      <section className="page-section">
        <div className="container project-detail">
          <Link className="back-link" to="/projets">
            <ArrowLeft size={18} />
            Projets
          </Link>

          <div className="project-detail-grid">
            <div className="project-detail-image">
              <img
                className={project.imageUrl ? "is-uploaded" : undefined}
                src={getProjectImage(project)}
                alt={`Illustration ${project.title}`}
              />
            </div>

            <article className="project-detail-content">
              <p className="eyebrow">{project.category}</p>
              <h1>{project.title}</h1>
              <p>{project.description}</p>

              <div className="detail-block">
                <span>Impact</span>
                <strong>{project.impact || "Projet réalisé et ajouté au portfolio."}</strong>
              </div>

              <div className="tech-list">
                {(project.technologies || []).map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              <div className="project-links detail-actions">
                {project.demoUrl && project.demoUrl !== "https://example.com" ? (
                  <a href={project.demoUrl}>
                    <ArrowUpRight size={18} />
                    Voir la démo
                  </a>
                ) : null}
                {project.githubUrl && project.githubUrl !== "https://github.com/" ? (
                  <a href={project.githubUrl}>
                    <Github size={18} />
                    Voir le code
                  </a>
                ) : null}
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProjectDetailPage;
