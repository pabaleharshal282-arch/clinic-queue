/**
 * Appointment Page - Book appointment form (UI only)
 * Purpose: Demo form for appointment booking; submits to API
 * Methodology: Controlled form, validation, API integration
 */

import { useState, useEffect } from 'react';
import { fetchDoctors, createAppointment } from '../api/hospitalApi';
import { departments } from '../data/departmentsData';
import styles from '../styles/Page.module.css';

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    department: '',
    doctorId: '',
    doctorName: '',
    date: '',
    timeSlot: '',
  });
  const [doctors, setDoctors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('success');

  useEffect(() => {
    fetchDoctors()
      .then((docs) => setDoctors(Array.isArray(docs) ? docs : []))
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'department') setFormData((prev) => ({ ...prev, doctorId: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!formData.patientName?.trim() || !formData.department || !formData.date || !formData.timeSlot || !formData.phone?.trim()) {
      setMessage('Please fill all required fields (name, phone, department, date, time).');
      setMessageType('error');
      return;
    }
    setSubmitting(true);
    try {
      const doctor = filteredDoctors.find((d) => d.id === formData.doctorId);
      await createAppointment({
        patientName: formData.patientName.trim(),
        phone: formData.phone.trim(),
        department: formData.department,
        doctorId: formData.doctorId || null,
        doctorName: doctor?.name || null,
        date: formData.date,
        timeSlot: formData.timeSlot,
      });
      setMessage('Appointment submitted successfully! We will confirm soon.');
      setMessageType('success');
      setFormData({ patientName: '', phone: '', department: '', doctorId: '', doctorName: '', date: '', timeSlot: '' });
    } catch (err) {
      setMessage(err.message || 'Failed to submit. Please try again.');
      setMessageType('error');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredDoctors = formData.department
    ? doctors.filter((d) => d.department === formData.department)
    : doctors;
  const depts = departments;

  return (
    <div>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Book Appointment</h3>
        </div>

        {message && (
          <div className={`${styles.alert} ${messageType === 'error' ? styles.alertError : styles.alertSuccess}`}>
            <span>{messageType === 'error' ? '⚠️' : '✅'}</span> {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="patientName">Patient Name *</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Full name"
                className={styles.input}
                disabled={submitting}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                className={styles.input}
                disabled={submitting}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="department">Department *</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={styles.select}
                disabled={submitting}
              >
                <option value="">Select department</option>
                {depts.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="doctorId">Doctor (Optional)</label>
              <select
                id="doctorId"
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                className={styles.select}
                disabled={submitting || !formData.department}
              >
                <option value="">Any available doctor</option>
                {filteredDoctors.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={styles.input}
                disabled={submitting}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="timeSlot">Time Slot *</label>
            <select
              id="timeSlot"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              className={styles.select}
              disabled={submitting}
            >
              <option value="">Select time</option>
              {timeSlots.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className={styles.btnGroup}>
            <button type="submit" disabled={submitting} className={`${styles.btn} ${styles.btnPrimary}`}>
              {submitting ? <>Submitting...</> : <>📅 Submit Appointment</>}
            </button>
            <button
              type="button"
              onClick={() => setFormData({ patientName: '', phone: '', department: '', doctorId: '', doctorName: '', date: '', timeSlot: '' })}
              disabled={submitting}
              className={`${styles.btn} ${styles.btnOutline}`}
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      <div className={`${styles.alert} ${styles.alertInfo}`}>
        <span>ℹ️</span>
        <span>Appointment requests are sent to the hospital. Confirmation will be provided via phone/email.</span>
      </div>
    </div>
  );
}
