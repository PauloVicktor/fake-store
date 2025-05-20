// src/services/api.ts
import axios from 'axios';
// Corrija a importação para ser "type-only"
import type { LoginCredentials } from '../interfaces/Product';

// Criar instância do axios
const api = axios.create({
    baseURL: '/api'  // Será redirecionado pelo proxy do Vite
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Interceptor para tratar respostas da API
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const login = async (username: string, password: string) => {
    try {
        // Não estamos usando o tipo LoginCredentials diretamente aqui
        const response = await api.post('/auth/login', { username, password });
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const fetchProducts = async () => {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const fetchProductById = async (id: string) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw error;
    }
};

export default api;