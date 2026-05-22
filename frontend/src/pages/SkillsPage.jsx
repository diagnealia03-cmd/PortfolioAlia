import Services from "../components/Services.jsx";
import Skills from "../components/Skills.jsx";

function SkillsPage({ skillGroups, services }) {
  return (
    <main className="page">
      <Skills skillGroups={skillGroups} />
      <Services services={services} />
    </main>
  );
}

export default SkillsPage;
