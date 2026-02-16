/**
 * ClinicQ Mock Data - localStorage-based persistence
 * Purpose: Stores queue tokens and counter for ClinicQ module
 * Flow: Tokens have status (Waiting → In Progress → Completed)
 * 
 * Academic Note: In online mode, tokenApi.js would call backend API instead.
 * Clear localStorage keys 'clinic_queue_tokens' and 'clinic_queue_counter' to reset.
 */

const STORAGE_KEY = 'clinic_queue_tokens';
const COUNTER_KEY = 'clinic_queue_counter';

// Default sample data (used only if localStorage is empty)
// priority: 'normal' | 'emergency' - emergency patients appear above normal in queue
const defaultTokens = [
  { id: '1', tokenNumber: 'Q001', patientName: 'Rahul Sharma', age: 35, gender: 'Male', problem: 'General Checkup', status: 'Completed', priority: 'normal', createdAt: '2025-02-01T09:00:00Z' },
  { id: '2', tokenNumber: 'Q002', patientName: 'Priya Patel', age: 28, gender: 'Female', problem: 'Dental', status: 'In Progress', priority: 'normal', createdAt: '2025-02-01T09:15:00Z' },
  { id: '3', tokenNumber: 'Q003', patientName: 'Amit Kumar', age: 45, gender: 'Male', problem: 'Orthopedic', status: 'Waiting', priority: 'emergency', createdAt: '2025-02-01T09:30:00Z' },
  { id: '4', tokenNumber: 'Q004', patientName: 'Sneha Reddy', age: 32, gender: 'Female', problem: 'ENT', status: 'Waiting', priority: 'normal', createdAt: '2025-02-01T09:45:00Z' },
];

// Initialize from localStorage or use defaults
function loadTokens() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [...defaultTokens];
  } catch {
    return [...defaultTokens];
  }
}

function saveTokens(tokens) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
}

function getCounter() {
  try {
    const stored = localStorage.getItem(COUNTER_KEY);
    return stored ? parseInt(stored, 10) : 5;
  } catch {
    return 5;
  }
}

function saveCounter(count) {
  localStorage.setItem(COUNTER_KEY, String(count));
}

// Generate token number like Q001, Q002, etc.
function generateTokenNumber(count) {
  return `Q${String(count).padStart(3, '0')}`;
}

// ==================== EXPORTED FUNCTIONS ====================

export function getMockTokens() {
  return loadTokens();
}

export function addMockToken({ patientName, age, gender, problem, priority }) {
  const tokens = loadTokens();
  let counter = getCounter();
  
  const newToken = {
    id: String(Date.now()),
    tokenNumber: generateTokenNumber(counter),
    patientName,
    age: parseInt(age, 10),
    gender,
    problem,
    status: 'Waiting',
    priority: priority === 'emergency' ? 'emergency' : 'normal',
    createdAt: new Date().toISOString(),
  };
  
  tokens.push(newToken);
  saveTokens(tokens);
  saveCounter(counter + 1);
  return newToken;
}

export function updateMockTokenStatus(id, status) {
  const tokens = loadTokens();
  const index = tokens.findIndex((t) => t.id === id);
  if (index === -1) return null;
  tokens[index] = { ...tokens[index], status };
  saveTokens(tokens);
  return tokens[index];
}

// Call next patient: Current "In Progress" → "Completed", first "Waiting" (emergency first) → "In Progress"
export function callNextPatient() {
  const tokens = loadTokens();
  
  const inProgressIdx = tokens.findIndex((t) => t.status === 'In Progress');
  if (inProgressIdx !== -1) tokens[inProgressIdx].status = 'Completed';
  
  // Sort waiting: emergency first, then normal
  const waiting = tokens.filter((t) => t.status === 'Waiting');
  const emergencyFirst = [...waiting].sort((a, b) => {
    if (a.priority === 'emergency' && b.priority !== 'emergency') return -1;
    if (a.priority !== 'emergency' && b.priority === 'emergency') return 1;
    return 0;
  });
  const firstWaiting = emergencyFirst[0];
  if (firstWaiting) {
    const idx = tokens.findIndex((t) => t.id === firstWaiting.id);
    if (idx !== -1) {
      tokens[idx].status = 'In Progress';
      saveTokens(tokens);
      return tokens[idx];
    }
  }
  saveTokens(tokens);
  return null;
}

// Mark current in-progress as completed
export function markCurrentCompleted() {
  const tokens = loadTokens();
  const inProgressIdx = tokens.findIndex((t) => t.status === 'In Progress');
  if (inProgressIdx !== -1) {
    tokens[inProgressIdx].status = 'Completed';
    saveTokens(tokens);
    return tokens[inProgressIdx];
  }
  return null;
}

// Clear entire queue
export function clearQueue() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(COUNTER_KEY);
  return [];
}

// Get queue statistics (emergency patients sorted first in waiting)
export function getQueueStats() {
  const tokens = loadTokens();
  const waiting = tokens.filter((t) => t.status === 'Waiting');
  const inProgress = tokens.find((t) => t.status === 'In Progress');
  const completed = tokens.filter((t) => t.status === 'Completed');
  const estimatedWaitMinutes = waiting.length * 5;
  
  return {
    total: tokens.length,
    waitingCount: waiting.length,
    completedCount: completed.length,
    currentServing: inProgress || null,
    estimatedWaitMinutes,
  };
}

export function resetMockData() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(COUNTER_KEY);
}
