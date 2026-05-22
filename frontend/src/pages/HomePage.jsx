import { ArrowRight, Download, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { portraitImage } from "../data/projectImages.js";
import { projectSlug } from "../utils/projects.js";

function HomePage({ profile, projects }) {
  const featuredProjects = projects.slice(0, 3);

  return (
    <main className="page home-page">
      <section className="home-hero">
        <div className="hero-text">
          <p className="eyebrow">Portfolio</p>
          <h1>{profile.name}</h1>
          <p className="hero-role">{profile.title}</p>
          <p className="hero-short">{profile.subtitle}</p>
          <div className="hero-actions">
            <Link className="button primary" to="/projets">
              Voir les projets
              <ArrowRight size={18} />
            </Link>
            <Link className="button ghost" to="/contact">
              <Mail size={18} />
              Contact
            </Link>
            <a className="button ghost" href="/cv-alia-diagne.pdf" target="_blank" rel="noreferrer">
              <Download size={18} />
              CV
            </a>
          </div>
        </div>

        <div className="portrait-frame">
          <img src={portraitImage} alt="Alia DIAGNE" />
        </div>
      </section>

      <section className="home-strip">
        <div>
          <span>Disponible</span>
          <strong>Stages, emplois saisonniers, missions temporaires</strong>
        </div>
        <div>
          <span>Localisation</span>
          <strong>{profile.location}</strong>
        </div>
        <div>
          <span>Formation</span>
          <strong>Licence SRT à l'UADB</strong>
        </div>
      </section>

      <section className="page-section">
        <div className="section-head compact">
          <p className="eyebrow">Sélection</p>
          <h2>Projets récents</h2>
        </div>
        <div className="mini-project-grid">
          {featuredProjects.map((project) => (
            <Link
              className="mini-project"
              to={`/projets/${projectSlug(project)}`}
              key={project._id || project.title}
            >
              <span>{project.category}</span>
              <strong>{project.title}</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
