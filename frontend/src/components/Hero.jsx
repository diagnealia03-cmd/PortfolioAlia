import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";

function Hero({ profile }) {
  return (
    <section id="accueil" className="hero">
      <div className="hero-content">
        <p className="eyebrow">{profile.availability}</p>
        <h1>{profile.name}</h1>
        <p className="hero-title">{profile.title}</p>
        <p className="hero-copy">{profile.subtitle}</p>

        <div className="hero-actions" aria-label="Actions principales">
          <a className="button primary" href="#contact">
            <Mail size={18} />
            Me contacter
          </a>
          <a className="button secondary" href="#projets">
            <ArrowDown size={18} />
            Projets
          </a>
        </div>

        <div className="hero-meta">
          <span>
            <MapPin size={17} />
            {profile.location}
          </span>
          <a href={profile.socials?.github || "#"} aria-label="Github">
            <Github size={18} />
          </a>
          <a href={profile.socials?.linkedin || "#"} aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
        </div>

        <div className="hero-stats">
          {profile.stats?.map((stat) => (
            <div className="stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <a className="scroll-cue" href="#apropos" aria-label="Aller à la section À propos">
        <ArrowDown size={22} />
      </a>
    </section>
  );
}

export default Hero;
