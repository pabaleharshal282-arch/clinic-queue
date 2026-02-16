/**
 * Doctor Controller - Handles doctor CRUD and toggle on-duty
 */

const doctorStore = require('../store/doctorStore');

const getAllDoctors = (req, res) => {
  try {
    const { department } = req.query;
    let result = doctorStore.getAll();
    if (department) {
      result = result.filter((d) =>
        d.department.toLowerCase().includes(department.toLowerCase())
      );
    }
    res.json({ success: true, data: result, count: result.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getDoctorById = (req, res) => {
  try {
    const doctor = doctorStore.getById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, data: doctor });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const addDoctor = (req, res) => {
  try {
    const { name, department, specialization, experience, availability, contact } = req.body || {};
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    const doctor = doctorStore.add({
      name: name.trim(),
      department: department || 'General',
      specialization: specialization || '',
      experience: parseInt(experience, 10) || 0,
      availability: availability || 'Mon, Wed, Fri',
      contact: contact || '',
    });
    res.status(201).json({ success: true, data: doctor });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteDoctor = (req, res) => {
  try {
    const ok = doctorStore.delete(req.params.id);
    if (!ok) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, message: 'Doctor deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const toggleOnDuty = (req, res) => {
  try {
    const doctor = doctorStore.toggleOnDuty(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, data: doctor });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  addDoctor,
  deleteDoctor,
  toggleOnDuty,
};
