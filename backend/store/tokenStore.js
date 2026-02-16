/**
 * Token Store - In-memory persistence for queue tokens
 * Purpose: Stores tokens with priority (normal/emergency) when backend receives them
 * Frontend ClinicQ can POST tokens here; Admin stats read from this store
 */

const tokens = [];
let counter = 1;

function getNextTokenNumber() {
  return `Q${String(counter).padStart(3, '0')}`;
}

function isToday(isoString) {
  try {
    const d = new Date(isoString);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  } catch {
    return false;
  }
}

module.exports = {
  /** Create token with priority (default: normal) */
  create(data) {
    const token = {
      id: String(Date.now()),
      tokenNumber: getNextTokenNumber(),
      patientName: data.patientName || '',
      age: data.age,
      gender: data.gender || '',
      problem: data.problem || '',
      status: 'Waiting',
      priority: data.priority === 'emergency' ? 'emergency' : 'normal',
      createdAt: new Date().toISOString(),
    };
    tokens.push(token);
    counter++;
    return token;
  },

  /** Get all tokens */
  getAll() {
    return [...tokens];
  },

  /** Get tokens created today */
  getTodayTokens() {
    return tokens.filter((t) => isToday(t.createdAt));
  },

  /** Count distinct departments with waiting patients today */
  getActiveQueuesCount() {
    const waiting = tokens.filter(
      (t) => t.status === 'Waiting' && isToday(t.createdAt)
    );
    const departments = new Set(waiting.map((t) => t.problem));
    return departments.size;
  },

  /** Call next: complete current, start first waiting (emergency first) */
  callNext() {
    const inProgress = tokens.find((t) => t.status === 'In Progress');
    if (inProgress) inProgress.status = 'Completed';

    const waiting = tokens
      .filter((t) => t.status === 'Waiting')
      .sort((a, b) => {
        if (a.priority === 'emergency' && b.priority !== 'emergency') return -1;
        if (a.priority !== 'emergency' && b.priority === 'emergency') return 1;
        return 0;
      });
    if (waiting.length > 0) {
      waiting[0].status = 'In Progress';
      return waiting[0];
    }
    return null;
  },

  /** Mark current in-progress as completed */
  markCompleted() {
    const inProgress = tokens.find((t) => t.status === 'In Progress');
    if (inProgress) {
      inProgress.status = 'Completed';
      return inProgress;
    }
    return null;
  },

  /** Remove patient from queue by token id */
  removeById(id) {
    const idx = tokens.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    return tokens.splice(idx, 1)[0];
  },

  /** Clear all tokens */
  clear() {
    tokens.length = 0;
    counter = 1;
    return [];
  },

  /** Get queue stats */
  getStats() {
    const waiting = tokens.filter((t) => t.status === 'Waiting');
    const inProgress = tokens.find((t) => t.status === 'In Progress');
    const completed = tokens.filter((t) => t.status === 'Completed');
    const emergencyWaiting = waiting.filter((t) => t.priority === 'emergency');
    const normalWaiting = waiting.filter((t) => t.priority === 'normal');
    const sortedWaiting = [...emergencyWaiting, ...normalWaiting];
    return {
      total: tokens.length,
      waitingCount: waiting.length,
      completedCount: completed.length,
      currentServing: inProgress || null,
      estimatedWaitMinutes: sortedWaiting.length * 5,
      tokens: tokens,
    };
  },
};
