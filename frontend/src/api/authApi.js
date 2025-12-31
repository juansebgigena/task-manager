import api from "./axiosConfig.js";

export const registerRequest = (user) => api.post("/auth/register", user);

export const loginRequest = (user) => api.post("/auth/login", user);

export const verifyTokenRequest = () => api.get("/auth/verify");

export const logoutRequest = () => api.post("/auth/logout");