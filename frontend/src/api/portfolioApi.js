import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  timeout: 8000
});

export const fetchPortfolio = async () => {
  const { data } = await api.get("/api/portfolio");
  return data;
};

export const sendContactMessage = async (payload) => {
  const { data } = await api.post("/api/messages", payload);
  return data;
};

export const createProject = async (payload) => {
  const { data } = await api.post("/api/projects", payload);
  return data;
};

export const updateProject = async (id, payload) => {
  const { data } = await api.put(`/api/projects/${id}`, payload);
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await api.delete(`/api/projects/${id}`);
  return data;
};
