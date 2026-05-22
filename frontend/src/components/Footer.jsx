import { Github, Linkedin, Mail } from "lucide-react";

function Footer({ profile }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <p>
          © {year} {profile.name}. Portfolio React, Node.js et MongoDB.
        </p>
        <div className="footer-links">
          <a href="/cv-alia-diagne.pdf" target="_blank" rel="noreferrer" aria-label="CV">
            CV
          </a>
          <a href={profile.socials?.github || "#"} aria-label="Github">
            <Github size={18} />
          </a>
          <a href={profile.socials?.linkedin || "#"} aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href={profile.socials?.email || `mailto:${profile.email}`} aria-label="Email">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
