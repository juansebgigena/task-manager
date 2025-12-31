import api from "./axiosConfig.js";

export const getTasksRequest = () => api.get("/tasks");

export const createTaskRequest = (task) => api.post("/tasks", task);

export const updateTaskRequest = (id, status) => api.put(`/tasks/${id}`, { status });

export const deleteTaskRequest = (id) => api.delete(`/tasks/${id}`);