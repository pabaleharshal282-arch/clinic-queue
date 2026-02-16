/**
 * Admin Login - Simple login page with hardcoded credential check
 * Protects /admin route - redirect to /admin/login if not logged in
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAdminLoggedIn, isAdminLoggedIn } from '../utils/auth';
import { API_BASE } from '../api/config';
import styles from '../styles/Page.module.css';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdminLoggedIn()) navigate('/admin', { replace: true });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setAdminLoggedIn();
        navigate('/admin', { replace: true });
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.card} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Admin Login</h3>
        </div>
        {error && (
          <div className={`${styles.alert} ${styles.alertError}`}>
            <span>⚠️</span> {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" disabled={loading} className={`${styles.btn} ${styles.btnPrimary}`}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
