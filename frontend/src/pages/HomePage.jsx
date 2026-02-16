/**
 * Home page – Queue overview with stats cards.
 * Shows current serving, waiting count, estimated wait time.
 * Syllabus: useState, useEffect, conditional rendering, JSX expressions
 */

import { Link } from 'react-router-dom';
import { useQueueData } from '../hooks/useQueueData.js';
import styles from '../styles/Page.module.css';

export default function HomePage() {
  const { stats, loading, error, refetch } = useQueueData();

  if (loading) {
    return (
      <div className={styles.loadingCard}>
        <span className={styles.spinner} style={{ borderTopColor: '#0d6efd', borderColor: '#e2e8f0' }}></span>
        <span style={{ marginLeft: '1rem' }}>Loading queue data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.alert + ' ' + styles.alertError}>
        <span>⚠️</span> {error}
        <button onClick={refetch} className={styles.btn + ' ' + styles.btnOutline} style={{ marginLeft: 'auto' }}>
          Retry
        </button>
      </div>
    );
  }

  const { currentServing, waitingCount, completedCount, estimatedWaitMinutes } = stats || {};

  return (
    <div>
      {/* Current Serving Card */}
      <div className={styles.currentCard}>
        <h3>Now Serving</h3>
        {currentServing ? (
          <>
            <div className={styles.currentToken}>{currentServing.tokenNumber}</div>
            <div className={styles.currentName}>{currentServing.patientName}</div>
            <div className={styles.currentProblem}>
              {currentServing.problem} • {currentServing.gender}, {currentServing.age} yrs
            </div>
          </>
        ) : (
          <div className={styles.noPatient}>No patient currently being served</div>
        )}
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>⏳</div>
          <div className={styles.statValue}>{waitingCount || 0}</div>
          <div className={styles.statLabel}>Patients Waiting</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statValue}>{completedCount || 0}</div>
          <div className={styles.statLabel}>Completed Today</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>⏱️</div>
          <div className={styles.statValue}>{estimatedWaitMinutes || 0} min</div>
          <div className={styles.statLabel}>Estimated Wait</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📋</div>
          <div className={styles.statValue}>{(waitingCount || 0) + (completedCount || 0) + (currentServing ? 1 : 0)}</div>
          <div className={styles.statLabel}>Total Tokens</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Quick Actions</h3>
        </div>
        <div className={styles.btnGroup}>
          <Link to="/register" className={`${styles.btn} ${styles.btnPrimary}`}>
            📝 Register New Patient
          </Link>
          <Link to="/dashboard" className={`${styles.btn} ${styles.btnSuccess}`}>
            📊 Open Dashboard
          </Link>
          <button onClick={refetch} className={`${styles.btn} ${styles.btnOutline}`}>
            🔄 Refresh Data
          </button>
        </div>
      </div>

      {/* Info Card */}
      <div className={styles.alert + ' ' + styles.alertInfo}>
        <span>ℹ️</span>
        <span>
          This system runs <strong>offline</strong> using localStorage. Data persists across page refreshes.
          Clear browser data to reset the queue.
        </span>
      </div>
    </div>
  );
}
