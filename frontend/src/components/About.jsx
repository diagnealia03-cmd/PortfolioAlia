import { CheckCircle2 } from "lucide-react";
import { portraitImage } from "../data/projectImages.js";
import SectionTitle from "./SectionTitle.jsx";

function About({ profile }) {
  const highlights = (profile.highlights || []).slice(0, 3);

  return (
    <section className="page-section">
      <div className="container split-section">
        <div>
          <SectionTitle eyebrow="Profil" title="Alia DIAGNE">
            {profile.bio}
          </SectionTitle>
          <div className="highlight-list slim">
            {highlights.map((highlight) => (
              <div className="highlight-item" key={highlight}>
                <CheckCircle2 size={18} />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        <img className="profile-side-image" src={portraitImage} alt={profile.name} />
      </div>
    </section>
  );
}

export default About;
