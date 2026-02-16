/**
 * Admin Dashboard - Control panel with Doctor Management, Queue Control
 * Protected by auth - redirect to /admin/login if not logged in
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin, isAdminLoggedIn } from '../utils/auth';
import {
  fetchAdminStats,
  fetchDoctors,
  addDoctor,
  deleteDoctor,
  toggleDoctorDuty,
  fetchQueue,
  removeFromQueue,
  clearQueue,
} from '../api/hospitalApi';
import { departments } from '../data/departmentsData';
import styles from '../styles/Page.module.css';
import homeStyles from '../styles/Home.module.css';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctorForm, setDoctorForm] = useState({
    name: '',
    department: departments[0]?.name || 'General Medicine',
    specialization: '',
  });
  const [adding, setAdding] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [statsData, doctorsData, queueData] = await Promise.all([
        fetchAdminStats(),
        fetchDoctors(),
        fetchQueue(),
      ]);
      setStats(statsData || {});
      setDoctors(Array.isArray(doctorsData) ? doctorsData : []);
      setQueue(Array.isArray(queueData) ? queueData : []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    loadData();
  }, [navigate, loadData]);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login', { replace: true });
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    if (!doctorForm.name?.trim()) return;
    setAdding(true);
    try {
      await addDoctor(doctorForm);
      setDoctorForm({ name: '', department: '', specialization: '' });
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (!window.confirm('Delete this doctor?')) return;
    try {
      await deleteDoctor(id);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleDuty = async (id) => {
    try {
      await toggleDoctorDuty(id);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveFromQueue = async (id) => {
    try {
      await removeFromQueue(id);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClearQueue = async () => {
    if (!window.confirm('Clear the entire queue? This cannot be undone.')) return;
    try {
      await clearQueue();
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isAdminLoggedIn()) return null;
  if (loading) return <p style={{ textAlign: 'center', color: 'var(--gray-500)' }}>Loading...</p>;

  const data = stats || {};

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 className={homeStyles.sectionTitle} style={{ margin: 0 }}>Admin Control Panel</h2>
        <button onClick={handleLogout} className={`${styles.btn} ${styles.btnOutline}`}>
          Logout
        </button>
      </div>

      {error && (
        <div className={`${styles.alert} ${styles.alertError}`}>
          <span>⚠️</span> {error}
        </div>
      )}

      <div className={homeStyles.statsGrid}>
        <div className={homeStyles.statCard}>
          <div className={homeStyles.statIcon}>👥</div>
          <div className={homeStyles.statValue}>{data.totalPatientsToday ?? 0}</div>
          <div className={homeStyles.statLabel}>Total Patients Today</div>
        </div>
        <div className={homeStyles.statCard}>
          <div className={homeStyles.statIcon}>📋</div>
          <div className={homeStyles.statValue}>{data.activeQueuesCount ?? 0}</div>
          <div className={homeStyles.statLabel}>Active Queues</div>
        </div>
        <div className={homeStyles.statCard}>
          <div className={homeStyles.statIcon}>📅</div>
          <div className={homeStyles.statValue}>{data.appointmentsToday ?? 0}</div>
          <div className={homeStyles.statLabel}>Appointments Today</div>
        </div>
        <div className={homeStyles.statCard}>
          <div className={homeStyles.statIcon}>👨‍⚕️</div>
          <div className={homeStyles.statValue}>
            {Array.isArray(data.doctorsOnDuty) ? data.doctorsOnDuty.length : 0}
          </div>
          <div className={homeStyles.statLabel}>Doctors On Duty</div>
        </div>
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Doctor Management</h3>
        <form onSubmit={handleAddDoctor} className={styles.form} style={{ marginBottom: '1.5rem' }}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input
                type="text"
                value={doctorForm.name}
                onChange={(e) => setDoctorForm((p) => ({ ...p, name: e.target.value }))}
                className={styles.input}
                placeholder="Dr. Name"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Department</label>
              <select
                value={doctorForm.department}
                onChange={(e) => setDoctorForm((p) => ({ ...p, department: e.target.value }))}
                className={styles.select}
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Specialization</label>
              <input
                type="text"
                value={doctorForm.specialization}
                onChange={(e) => setDoctorForm((p) => ({ ...p, specialization: e.target.value }))}
                className={styles.input}
                placeholder="e.g. Cardiologist"
              />
            </div>
          </div>
          <button type="submit" disabled={adding} className={`${styles.btn} ${styles.btnPrimary}`}>
            {adding ? 'Adding...' : 'Add Doctor'}
          </button>
        </form>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--gray-200)' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Doctor</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Department</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>On Duty</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d) => (
                <tr key={d.id} style={{ borderBottom: '1px solid var(--gray-200)' }}>
                  <td style={{ padding: '0.75rem' }}>{d.name}</td>
                  <td style={{ padding: '0.75rem' }}>{d.department}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <button
                      onClick={() => handleToggleDuty(d.id)}
                      className={`${styles.btn} ${d.onDuty ? styles.btnSuccess : styles.btnOutline}`}
                      style={{ fontSize: '0.85rem', padding: '0.35rem 0.75rem' }}
                    >
                      {d.onDuty ? 'On Duty' : 'Off Duty'}
                    </button>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <button
                      onClick={() => handleDeleteDoctor(d.id)}
                      className={`${styles.btn} ${styles.btnDanger}`}
                      style={{ fontSize: '0.85rem', padding: '0.35rem 0.75rem' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Queue Control</h3>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <button onClick={loadData} className={`${styles.btn} ${styles.btnOutline}`}>
            Refresh
          </button>
          <button
            onClick={handleClearQueue}
            disabled={queue.length === 0}
            className={`${styles.btn} ${styles.btnDanger}`}
          >
            Clear Full Queue
          </button>
        </div>
        {queue.length === 0 ? (
          <p style={{ color: 'var(--gray-500)' }}>No patients in queue.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--gray-200)' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Token</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((t) => (
                  <tr key={t.id} style={{ borderBottom: '1px solid var(--gray-200)' }}>
                    <td style={{ padding: '0.75rem' }}>{t.tokenNumber}</td>
                    <td style={{ padding: '0.75rem' }}>{t.patientName}</td>
                    <td style={{ padding: '0.75rem' }}>{t.status || 'Waiting'}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <button
                        onClick={() => handleRemoveFromQueue(t.id)}
                        className={`${styles.btn} ${styles.btnOutline}`}
                        style={{ fontSize: '0.85rem', padding: '0.35rem 0.75rem' }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {Array.isArray(data.doctorsOnDuty) && data.doctorsOnDuty.length > 0 && (
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Doctors On Duty Today</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {data.doctorsOnDuty.map((d) => (
              <li key={d.id} style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between' }}>
                <span>{d.name}</span>
                <span style={{ color: 'var(--gray-500)' }}>{d.department}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
