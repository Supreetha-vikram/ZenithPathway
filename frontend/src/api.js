import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Real Axios Instance
const api = axios.create({
    baseURL: API_URL
});

// Attach Token to Requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API
export const login = async (formData) => {
    return await api.post('/auth/login', formData);
};

export const register = async (formData) => {
    return await api.post('/auth/register', formData);
};

// Career/Assessment API
// Note: Backend expects /assessment/submit and /assessment/history
export const submitAssessment = async (data) => {
    // We map the frontend 'technical/soft/interests' to what the backend expects if necessary
    // But our backend controller expects { skills, interests, experience }
    // The frontend sends { technical: [], soft: [], interests: [], experience: '' }
    // Let's adapt it here or in the backend. 
    // Let's adapt here to make it a simple string for the keyword matcher

    const payload = {
        skills: Array.isArray(data.technical) ? data.technical.join(', ') : data.technical,
        interests: Array.isArray(data.interests) ? data.interests.join(', ') : data.interests,
        experience: data.experience
    };

    return await api.post('/assessment/submit', payload);
};

export const getHistory = async () => {
    return await api.get('/assessment/history');
};

// Roadmap API
export const fetchRoadmap = async () => {
    return await api.get('/roadmap');
};

export const saveRoadmap = async (progress) => {
    return await api.post('/roadmap', { progress });
};

export default api;
