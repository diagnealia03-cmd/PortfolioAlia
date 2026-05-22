import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  createProject,
  deleteProject,
  fetchPortfolio,
  updateProject
} from "./api/portfolioApi.js";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import fallbackData from "./data/fallbackData.js";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import { normalizeProjects } from "./utils/projects.js";

function App() {
  const [portfolio, setPortfolio] = useState(fallbackData);

  useEffect(() => {
    let mounted = true;

    fetchPortfolio()
      .then((data) => {
        if (!mounted) {
          return;
        }
        const localProjects = normalizeProjects(
          JSON.parse(localStorage.getItem("aliaProjects") || "[]")
        );
        const projects = normalizeProjects([
          ...localProjects,
          ...(data.projects || fallbackData.projects)
        ]);
        localStorage.setItem("aliaProjects", JSON.stringify(localProjects));
        setPortfolio({
          ...fallbackData,
          ...data,
          projects
        });
      })
      .catch(() => {
        if (!mounted) {
          return;
        }
        const localProjects = normalizeProjects(
          JSON.parse(localStorage.getItem("aliaProjects") || "[]")
        );
        setPortfolio({
          ...fallbackData,
          projects: normalizeProjects([...localProjects, ...fallbackData.projects])
        });
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleProjectAdded = async (payload) => {
    try {
      const response = await createProject(payload);
      setPortfolio((current) => ({
        ...current,
        projects: normalizeProjects([response.project, ...current.projects])
      }));
      return response.message;
    } catch (error) {
      const localProject = {
        ...payload,
        _id: `local-${Date.now()}`,
        technologies: payload.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
        image: payload.image || "cloud",
        imageUrl: payload.imageUrl || "",
        githubUrl: payload.githubUrl || "https://github.com/",
        demoUrl: payload.demoUrl || "https://example.com",
        impact: payload.impact || "Projet ajouté à la liste des réalisations.",
        featured: false,
        order: 0
      };
      const localProjects = normalizeProjects(
        JSON.parse(localStorage.getItem("aliaProjects") || "[]")
      );
      localStorage.setItem(
        "aliaProjects",
        JSON.stringify(normalizeProjects([localProject, ...localProjects]))
      );
      setPortfolio((current) => ({
        ...current,
        projects: normalizeProjects([localProject, ...current.projects])
      }));
      return (
        error.response?.data?.message ||
        "Projet ajouté localement. Lancez MongoDB pour l'enregistrer en base."
      );
    }
  };

  const handleProjectUpdated = async (project, payload) => {
    const updatedProject = {
      ...project,
      ...payload,
      technologies: Array.isArray(payload.technologies)
        ? payload.technologies
        : payload.technologies
            .split(",")
            .map((tech) => tech.trim())
            .filter(Boolean)
    };

    try {
      if (project._id && !String(project._id).startsWith("local-")) {
        const response = await updateProject(project._id, payload);
        setPortfolio((current) => ({
          ...current,
          projects: normalizeProjects(
            current.projects.map((item) =>
              item._id === project._id ? response.project : item
            )
          )
        }));
        return response.message;
      }

      throw new Error("local project");
    } catch (error) {
      const localProjects = normalizeProjects(
        JSON.parse(localStorage.getItem("aliaProjects") || "[]").map((item) =>
          item._id === project._id || item.title === project.title ? updatedProject : item
        )
      );

      localStorage.setItem("aliaProjects", JSON.stringify(localProjects));
      setPortfolio((current) => ({
        ...current,
        projects: normalizeProjects(
          current.projects.map((item) =>
            item._id === project._id || item.title === project.title ? updatedProject : item
          )
        )
      }));

      return (
        error.response?.data?.message ||
        "Projet modifié localement. Lancez MongoDB pour l'enregistrer en base."
      );
    }
  };

  const handleProjectDeleted = async (project) => {
    try {
      if (project._id && !String(project._id).startsWith("local-")) {
        const response = await deleteProject(project._id);
        setPortfolio((current) => ({
          ...current,
          projects: current.projects.filter((item) => item._id !== project._id)
        }));
        return response.message;
      }

      throw new Error("local project");
    } catch (error) {
      const localProjects = JSON.parse(localStorage.getItem("aliaProjects") || "[]").filter(
        (item) => item._id !== project._id && item.title !== project.title
      );

      localStorage.setItem("aliaProjects", JSON.stringify(localProjects));
      setPortfolio((current) => ({
        ...current,
        projects: current.projects.filter(
          (item) => item._id !== project._id && item.title !== project.title
        )
      }));

      return (
        error.response?.data?.message ||
        "Projet supprimé localement. Lancez MongoDB pour le supprimer en base."
      );
    }
  };

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<HomePage profile={portfolio.profile} projects={portfolio.projects} />}
        />
        <Route
          path="/projets"
          element={
            <ProjectsPage
              projects={portfolio.projects}
              onProjectAdded={handleProjectAdded}
              onProjectUpdated={handleProjectUpdated}
              onProjectDeleted={handleProjectDeleted}
            />
          }
        />
        <Route
          path="/projets/:slug"
          element={<ProjectDetailPage projects={portfolio.projects} />}
        />
        <Route
          path="/parcours"
          element={
            <AboutPage
              profile={portfolio.profile}
              experiences={portfolio.experiences}
              testimonials={portfolio.testimonials}
            />
          }
        />
        <Route path="/contact" element={<ContactPage profile={portfolio.profile} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer profile={portfolio.profile} />
    </>
  );
}

export default App;
