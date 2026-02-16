/**
 * Register Token – Full patient registration form.
 * Syllabus: Controlled forms, event handling (onChange, onSubmit), useState
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createToken } from '../api/tokenApi.js';
import styles from '../styles/Page.module.css';

const departments = [
  'General Checkup',
  'Dental',
  'Orthopedic',
  'ENT',
  'Cardiology',
  'Dermatology',
  'Pediatrics',
  'Gynecology',
  'Ophthalmology',
  'Other',
];

export default function RegisterTokenPage() {
  // Controlled form state – Syllabus: useState
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: '',
    problem: '',
    priority: 'normal',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Event handler – Syllabus: onChange with argument passing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit handler – Syllabus: onSubmit, async/await, try/catch
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    const { patientName, age, gender, problem } = formData;
    if (!patientName.trim()) {
      setError('Please enter patient name.');
      return;
    }
    if (!age || age < 1 || age > 150) {
      setError('Please enter a valid age (1-150).');
      return;
    }
    if (!gender) {
      setError('Please select gender.');
      return;
    }
    if (!problem) {
      setError('Please select department/problem.');
      return;
    }

    setSubmitting(true);
    try {
      const token = await createToken({
        patientName: patientName.trim(),
        age,
        gender,
        problem,
        priority: formData.priority || 'normal',
      });
      
      setSuccess(`Token ${token.tokenNumber} created for ${token.patientName}`);
      setFormData({ patientName: '', age: '', gender: '', problem: '' });
      
      // Redirect to dashboard after short delay
      setTimeout(() => {
        navigate('/clinicq/dashboard', { 
          state: { message: `Token ${token.tokenNumber} created successfully!` } 
        });
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to create token.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Patient Information</h3>
        </div>

        {/* Success message */}
        {success && (
          <div className={`${styles.alert} ${styles.alertSuccess}`}>
            <span>✅</span> {success}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className={`${styles.alert} ${styles.alertError}`}>
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Registration Form – Syllabus: Controlled forms */}
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
                placeholder="Enter full name"
                className={styles.input}
                disabled={submitting}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                min="1"
                max="150"
                className={styles.input}
                disabled={submitting}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="priority">Queue Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className={styles.select}
                disabled={submitting}
              >
                <option value="normal">Normal OPD</option>
                <option value="emergency">Emergency (High Priority)</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="gender">Gender *</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={styles.select}
                disabled={submitting}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="problem">Department / Problem *</label>
              <select
                id="problem"
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                className={styles.select}
                disabled={submitting}
              >
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.btnGroup}>
            <button
              type="submit"
              disabled={submitting}
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              {submitting ? (
                <>
                  <span className={styles.spinner}></span>
                  Creating...
                </>
              ) : (
                <>📋 Generate Token</>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => setFormData({ patientName: '', age: '', gender: '', problem: '', priority: 'normal' })}
              disabled={submitting}
              className={`${styles.btn} ${styles.btnOutline}`}
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>

      {/* Info */}
      <div className={`${styles.alert} ${styles.alertInfo}`}>
        <span>ℹ️</span>
        <span>
          Token numbers are auto-generated (Q001, Q002...). New patients start with <strong>"Waiting"</strong> status.
        </span>
      </div>
    </div>
  );
}
