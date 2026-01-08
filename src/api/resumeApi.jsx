import axiosInstance from "../utils/axiosInstance";

export const createResume = (data) =>
  axiosInstance.post("/resume/create", data);

export const updateResume = (id, data) =>
  axiosInstance.put(`/resume/update/${id}`, data);

export const deleteResume = (id) =>
  axiosInstance.delete(`/resume/delete/${id}`);

export const getMyResumes = () => axiosInstance.get("/resume/get");
