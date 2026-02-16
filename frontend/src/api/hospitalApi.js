/**
 * Hospital API - Fetches data from backend REST API
 * Purpose: Central API layer for doctors, departments, stats, appointments
 * Production: Set VITE_API_URL in .env.production (e.g. https://your-api.onrender.com/api)
 */

import { API_BASE } from './config.js';

async function fetchApi(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'API request failed');
  return data;
}

/** Get hospital statistics for home page */
export async function fetchHospitalStats() {
  const { data } = await fetchApi('/hospital/stats');
  return data;
}

/** Get featured services (departments) */
export async function fetchServices() {
  const { data } = await fetchApi('/hospital/services');
  return data;
}

/** Get all doctors, optionally filter by department */
export async function fetchDoctors(department = '') {
  const qs = department ? `?department=${encodeURIComponent(department)}` : '';
  const { data } = await fetchApi(`/doctors${qs}`);
  return data;
}

/** Get all departments */
export async function fetchDepartments() {
  const { data } = await fetchApi('/departments');
  return data;
}

/** Get single department by ID - for dynamic route /departments/:departmentId */
export async function fetchDepartmentById(id) {
  const { data } = await fetchApi(`/departments/${id}`);
  return data;
}

/** Submit appointment (persisted to backend) */
export async function createAppointment(appointmentData) {
  const res = await fetch(`${API_BASE}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointmentData),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || 'Failed to create appointment');
  return json.data;
}

/** Search appointments by patient name or phone */
export async function searchAppointments(query) {
  const q = encodeURIComponent(query || '');
  const res = await fetch(`${API_BASE}/appointments/search?q=${q}`);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || 'Search failed');
  return json.data || [];
}

/** Get admin dashboard stats */
export async function fetchAdminStats() {
  const res = await fetch(`${API_BASE}/admin/stats`);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || 'Failed to load admin stats');
  return json.data || {};
}

/** Admin login */
export async function adminLogin(username, password) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || 'Login failed');
  return json;
}

/** Add doctor */
export async function addDoctor(data) {
  const res = await fetch(`${API_BASE}/doctors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || 'Failed to add doctor');
  return json.data;
}

/** Delete doctor */
export async function deleteDoctor(id) {
  const res = await fetch(`${API_BASE}/doctors/${id}`, { method: 'DELETE' });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || 'Failed to delete doctor');
}

/** Toggle doctor on duty */
export async function toggleDoctorDuty(id) {
  const res = await fetch(`${API_BASE}/doctors/${id}/toggle-duty`, {
    method: 'PATCH',
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || 'Failed to toggle');
  return json.data;
}

/** Get queue (tokens) */
export async function fetchQueue() {
  const res = await fetch(`${API_BASE}/tokens`);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || 'Failed to load queue');
  return json.data || [];
}

/** Remove patient from queue */
export async function removeFromQueue(tokenId) {
  const res = await fetch(`${API_BASE}/tokens/${tokenId}`, {
    method: 'DELETE',
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || 'Failed to remove');
}

/** Clear full queue */
export async function clearQueue() {
  const res = await fetch(`${API_BASE}/tokens`, { method: 'DELETE' });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || 'Failed to clear queue');
}
