/**
 * API configuration - supports deployment with different backend URL
 * Local: /api (proxied by Vite to localhost:5000)
 * Production: VITE_API_URL from .env.production (e.g. https://your-api.onrender.com/api)
 */
export const API_BASE = import.meta.env.VITE_API_URL || '/api';
