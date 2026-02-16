/**
 * Appointment Store - In-memory persistence for appointments
 * Purpose: Persists appointments when MongoDB unavailable; used for history search
 * Data flows to: GET /api/appointments/search, GET /api/admin/stats
 */

const appointments = [];
let counter = 1;

function getNextId() {
  return `apt-${Date.now()}-${counter++}`;
}

function isToday(dateStr) {
  const d = new Date(dateStr);
  const today = new Date();
  return d.toDateString() === today.toDateString();
}

function toISODate(dateStr) {
  return new Date(dateStr).toISOString().split('T')[0];
}

module.exports = {
  /** Create and store appointment */
  create(data) {
    const apt = {
      id: getNextId(),
      patientName: data.patientName?.trim() || '',
      phone: data.phone?.trim() || '',
      department: data.department || '',
      doctorId: data.doctorId || null,
      doctorName: data.doctorName || null,
      date: data.date,
      timeSlot: data.timeSlot || '',
      status: data.status || 'Pending',
      tokenNumber: data.tokenNumber || null,
      createdAt: new Date().toISOString(),
    };
    appointments.push(apt);
    return apt;
  },

  /** Search by patient name or phone (case-insensitive partial match) */
  search(query) {
    const q = (query || '').trim().toLowerCase();
    if (!q) return [];
    return appointments.filter(
      (a) =>
        a.patientName.toLowerCase().includes(q) ||
        (a.phone && a.phone.includes(q))
    );
  },

  /** Count appointments for a given date (YYYY-MM-DD) */
  countByDate(dateStr) {
    return appointments.filter((a) => toISODate(a.date) === dateStr).length;
  },

  /** Get all appointments (for admin) */
  getAll() {
    return [...appointments];
  },
};
