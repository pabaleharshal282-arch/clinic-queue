/**
 * Token API - ClinicQ queue operations
 * Purpose: Create tokens, call next, mark completed, clear queue, fetch stats
 * Tries backend /api/tokens first; falls back to localStorage (mockData) when backend unavailable
 * Priority: emergency tokens appear above normal in queue
 */

import {
  getMockTokens,
  addMockToken,
  updateMockTokenStatus,
  callNextPatient,
  markCurrentCompleted,
  clearQueue,
  getQueueStats,
} from '../data/mockData.js';

import { API_BASE } from './config.js';

async function apiGet(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error('API error');
  return res.json();
}

async function apiPost(endpoint, body) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {}),
  });
  if (!res.ok) throw new Error('API error');
  return res.json();
}

async function apiDelete(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('API error');
  return res.json();
}

/** Fetch full queue - backend first, fallback to localStorage */
export async function fetchQueue() {
  try {
    const json = await apiGet('/tokens');
    return json.data || [];
  } catch {
    return getMockTokens();
  }
}

/** Create token - backend first (enables admin stats), fallback to localStorage */
export async function createToken(patientData) {
  try {
    const json = await apiPost('/tokens', {
      patientName: patientData.patientName,
      age: patientData.age,
      gender: patientData.gender,
      problem: patientData.problem,
      priority: patientData.priority || 'normal',
    });
    return json.data;
  } catch {
    return addMockToken(patientData);
  }
}

export async function updateTokenStatus(id, status) {
  try {
    await fetch(`${API_BASE}/tokens/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return updateMockTokenStatus(id, status);
  } catch {
    return updateMockTokenStatus(id, status);
  }
}

/** Call next - backend first, fallback localStorage */
export async function callNext() {
  try {
    const json = await apiPost('/tokens/call-next');
    return json.data;
  } catch {
    return callNextPatient();
  }
}

/** Mark completed - backend first, fallback localStorage */
export async function markCompleted() {
  try {
    const json = await apiPost('/tokens/mark-completed');
    return json.data;
  } catch {
    return markCurrentCompleted();
  }
}

/** Clear queue - backend first, fallback localStorage */
export async function clearAllTokens() {
  try {
    await apiDelete('/tokens');
    clearQueue();
    return [];
  } catch {
    return clearQueue();
  }
}

/** Fetch queue stats - backend first, fallback localStorage */
export async function fetchQueueStats() {
  try {
    const json = await apiGet('/tokens/stats');
    return json.data;
  } catch {
    return getQueueStats();
  }
}
