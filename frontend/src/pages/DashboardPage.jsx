/**
 * Dashboard – Queue management with Call Next, Mark Completed, Clear Queue.
 * Syllabus: useState, useEffect, useCallback, event handling, conditional rendering
 */

import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueueData } from '../hooks/useQueueData.js';
import { callNext, markCompleted, clearAllTokens } from '../api/tokenApi.js';
import QueueList from '../components/QueueList.jsx';
import styles from '../styles/Page.module.css';

export default function DashboardPage() {
  const { tokens, stats, loading, error, refetch } = useQueueData();
  const [actionLoading, setActionLoading] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('success');
  const location = useLocation();

  // Show success message from Register redirect
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setMessageType('success');
      // Clear the state to prevent showing again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Auto-hide messages after 4 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Call Next Patient – Syllabus: async/await, try/catch
  const handleCallNext = useCallback(async () => {
    setActionLoading('callNext');
    setMessage(null);
    try {
      const result = await callNext();
      if (result) {
        setMessage(`Now serving: ${result.tokenNumber} - ${result.patientName}`);
        setMessageType('success');
      } else {
        setMessage('No patients waiting in queue.');
        setMessageType('info');
      }
      await refetch();
    } catch (err) {
      setMessage(err.message || 'Failed to call next patient.');
      setMessageType('error');
    } finally {
      setActionLoading(null);
    }
  }, [refetch]);

  // Mark Current as Completed
  const handleMarkCompleted = useCallback(async () => {
    setActionLoading('markCompleted');
    setMessage(null);
    try {
      const result = await markCompleted();
      if (result) {
        setMessage(`Completed: ${result.tokenNumber} - ${result.patientName}`);
        setMessageType('success');
      } else {
        setMessage('No patient currently being served.');
        setMessageType('info');
      }
      await refetch();
    } catch (err) {
      setMessage(err.message || 'Failed to mark completed.');
      setMessageType('error');
    } finally {
      setActionLoading(null);
    }
  }, [refetch]);

  // Clear Entire Queue
  const handleClearQueue = useCallback(async () => {
    if (!window.confirm('Are you sure you want to clear the entire queue? This cannot be undone.')) {
      return;
    }
    setActionLoading('clear');
    setMessage(null);
    try {
      await clearAllTokens();
      setMessage('Queue cleared successfully.');
      setMessageType('success');
      await refetch();
    } catch (err) {
      setMessage(err.message || 'Failed to clear queue.');
      setMessageType('error');
    } finally {
      setActionLoading(null);
    }
  }, [refetch]);

  const currentServing = stats?.currentServing;
  const waitingCount = stats?.waitingCount || 0;

  return (
    <div>
      {/* Message Alert */}
      {message && (
        <div className={`${styles.alert} ${
          messageType === 'error' ? styles.alertError :
          messageType === 'info' ? styles.alertInfo : styles.alertSuccess
        }`}>
          <span>{messageType === 'error' ? '⚠️' : messageType === 'info' ? 'ℹ️' : '✅'}</span>
          {message}
        </div>
      )}

      {/* Current Serving */}
      <div className={styles.currentCard}>
        <h3>Currently Serving</h3>
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

      {/* Action Buttons */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Queue Controls</h3>
          <span style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
            {waitingCount} patient{waitingCount !== 1 ? 's' : ''} waiting
          </span>
        </div>
        
        <div className={styles.btnGroup}>
          <button
            onClick={handleCallNext}
            disabled={actionLoading !== null || waitingCount === 0}
            className={`${styles.btn} ${styles.btnSuccess}`}
          >
            {actionLoading === 'callNext' ? (
              <><span className={styles.spinner}></span> Calling...</>
            ) : (
              <>📢 Call Next Patient</>
            )}
          </button>

          <button
            onClick={handleMarkCompleted}
            disabled={actionLoading !== null || !currentServing}
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            {actionLoading === 'markCompleted' ? (
              <><span className={styles.spinner}></span> Updating...</>
            ) : (
              <>✅ Mark Completed</>
            )}
          </button>

          <button
            onClick={refetch}
            disabled={actionLoading !== null}
            className={`${styles.btn} ${styles.btnOutline}`}
          >
            🔄 Refresh
          </button>

          <button
            onClick={handleClearQueue}
            disabled={actionLoading !== null || tokens?.length === 0}
            className={`${styles.btn} ${styles.btnDanger}`}
          >
            {actionLoading === 'clear' ? (
              <><span className={styles.spinner}></span> Clearing...</>
            ) : (
              <>🗑️ Clear Queue</>
            )}
          </button>
        </div>
      </div>

      {/* Queue List */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Patient Queue</h3>
        </div>
        <QueueList tokens={tokens} loading={loading} error={error} />
      </div>
    </div>
  );
}
