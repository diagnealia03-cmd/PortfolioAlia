export const projectSlug = (project) =>
  String(project?.title || "projet")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const normalizeProjects = (projects = []) => {
  const seen = new Set();

  return projects.filter((project) => {
    const key = projectSlug(project);
    if (!key || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};
