import Projects from "../components/Projects.jsx";

function ProjectsPage({ projects, onProjectAdded }) {
  return (
    <main className="page">
      <Projects projects={projects} onProjectAdded={onProjectAdded} />
    </main>
  );
}

export default ProjectsPage;
