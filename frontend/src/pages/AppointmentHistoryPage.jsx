/**
 * Appointment History - Mini dashboard for patient search
 * Purpose: Search by patient name or phone; display past appointments
 * Data flow: searchAppointments(query) → display table (date, department, doctor, token, status)
 */

import { useState } from 'react';
import { searchAppointments } from '../api/hospitalApi';
import styles from '../styles/Page.module.css';

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr || '-';
  }
}

export default function AppointmentHistoryPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const data = await searchAppointments(query.trim());
      setResults(data);
    } catch (err) {
      setError(err.message || 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Patient Appointment History</h3>
        </div>
        <form onSubmit={handleSearch} className={styles.form} style={{ maxWidth: '400px' }}>
          <div className={styles.formGroup}>
            <label htmlFor="search">Search by patient name or phone</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                id="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter name or phone number"
                className={styles.input}
                disabled={loading}
              />
              <button type="submit" disabled={loading} className={`${styles.btn} ${styles.btnPrimary}`}>
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {error && (
        <div className={`${styles.alert} ${styles.alertError}`}>
          <span>⚠️</span> {error}
        </div>
      )}

      {results !== null && (
        <div className={styles.card}>
          <h4 style={{ marginBottom: '1rem' }}>
            {results.length} result{results.length !== 1 ? 's' : ''} found
          </h4>
          {results.length === 0 ? (
            <p style={{ color: 'var(--gray-500)' }}>No appointments found.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--gray-200)' }}>
                    <th style={{ textAlign: 'left', padding: '0.75rem' }}>Date</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem' }}>Department</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem' }}>Doctor</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem' }}>Token</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((apt) => (
                    <tr key={apt.id} style={{ borderBottom: '1px solid var(--gray-200)' }}>
                      <td style={{ padding: '0.75rem' }}>{formatDate(apt.date)} {apt.timeSlot}</td>
                      <td style={{ padding: '0.75rem' }}>{apt.department}</td>
                      <td style={{ padding: '0.75rem' }}>{apt.doctorName || '-'}</td>
                      <td style={{ padding: '0.75rem' }}>{apt.tokenNumber || '-'}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span
                          style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.85rem',
                            background: apt.status === 'Completed' ? '#d1fae5' : apt.status === 'Pending' ? '#fef3c7' : '#e2e8f0',
                            color: apt.status === 'Completed' ? '#065f46' : apt.status === 'Pending' ? '#92400e' : '#475569',
                          }}
                        >
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
