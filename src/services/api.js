import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ===== Auth =====
export const loginAdmin = (data) => api.post('/auth/login', data);
export const verifyToken = () => api.get('/auth/verify');

// ===== Images =====
export const getImages = (params) => api.get('/images', { params });
export const uploadImage = (formData) =>
  api.post('/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const updateImage = (id, formData) =>
  api.put(`/images/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteImage = (id) => api.delete(`/images/${id}`);

// ===== Projects =====
export const getProjects = () => api.get('/projects');
export const getProjectById = (id) => api.get(`/projects/${id}`);
export const createProject = (formData) =>
  api.post('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const updateProject = (id, formData) =>
  api.put(`/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteProject = (id) => api.delete(`/projects/${id}`);
export const removeProjectImage = (projectId, imageId) =>
  api.delete(`/projects/${projectId}/images/${imageId}`);

// ===== Inquiries =====
export const createInquiry = (data) => api.post('/inquiry', data);
export const getInquiries = () => api.get('/inquiry');
export const updateInquiry = (id, data) => api.put(`/inquiry/${id}`, data);
export const deleteInquiry = (id) => api.delete(`/inquiry/${id}`);

// ===== Testimonials =====
export const getTestimonials = () => api.get('/testimonials');
export const createTestimonial = (formData) =>
  api.post('/testimonials', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`);

// ===== Stats =====
export const getStats = () => api.get('/stats');

export default api;
