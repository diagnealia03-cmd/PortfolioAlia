import { CloudCog, Database, MonitorSmartphone, ServerCog, Sparkles } from "lucide-react";
import SectionTitle from "./SectionTitle.jsx";

const icons = {
  CloudCog,
  Database,
  MonitorSmartphone,
  ServerCog,
  Sparkles
};

function Skills({ skillGroups }) {
  return (
    <section className="page-section">
      <div className="container">
        <SectionTitle eyebrow="Compétences" title="Stack technique">
          Les outils principaux, sans détour.
        </SectionTitle>

        <div className="skills-grid">
          {skillGroups.map((group) => {
            const Icon = icons[group.icon] || Sparkles;
            return (
              <article className={`skill-card accent-${group.accent}`} key={group.title}>
                <div className="card-icon">
                  <Icon size={23} />
                </div>
                <h3>{group.title}</h3>
                <div className="skill-tags">
                  {group.skills.slice(0, 5).map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;
