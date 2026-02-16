/**
 * Doctor Store - Mutable in-memory doctor list
 * Purpose: Add, delete, toggle on-duty for Admin Doctor Management
 */

const { doctors: seedDoctors } = require('../data/mockData');

const doctors = seedDoctors.map((d) => ({
  ...d,
  onDuty: false,
}));

let idCounter = 20;

function nextId() {
  return `doc-${idCounter++}`;
}

module.exports = {
  getAll() {
    return [...doctors];
  },

  getById(id) {
    return doctors.find((d) => d.id === id) || null;
  },

  add(data) {
    const doc = {
      id: nextId(),
      name: data.name || '',
      department: data.department || 'General',
      specialization: data.specialization || '',
      experience: data.experience || 0,
      availability: data.availability || 'Mon, Wed, Fri',
      contact: data.contact || '',
      onDuty: false,
    };
    doctors.push(doc);
    return doc;
  },

  delete(id) {
    const idx = doctors.findIndex((d) => d.id === id);
    if (idx === -1) return false;
    doctors.splice(idx, 1);
    return true;
  },

  toggleOnDuty(id) {
    const doc = doctors.find((d) => d.id === id);
    if (!doc) return null;
    doc.onDuty = !doc.onDuty;
    return doc;
  },

  getOnDuty() {
    return doctors.filter((d) => d.onDuty);
  },
};
