/**
 * QueueList - Displays patient queue with status badges
 * Purpose: Renders sorted list (In Progress → Waiting → Completed)
 * Methodology: Conditional rendering, array map, dynamic className
 */

import styles from '../styles/QueueList.module.css';

// Format time to display (e.g., "9:30 AM")
function formatTime(isoString) {
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  } catch {
    return '';
  }
}

// Status badge class mapping
const statusClasses = {
  'Waiting': styles.statusWaiting,
  'In Progress': styles.statusInProgress,
  'Completed': styles.statusCompleted,
};

export default function QueueList({ tokens, loading, error }) {
  // Loading state – Syllabus: Conditional rendering
  if (loading) {
    return (
      <div className={styles.loading}>
        <span className={styles.spinner}></span>
        Loading queue...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.error}>
        <p>⚠️ {error}</p>
      </div>
    );
  }

  // Empty state
  if (!tokens || tokens.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📋</div>
        <p>No patients in queue</p>
        <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
          Register a new patient to get started
        </p>
      </div>
    );
  }

  // Sort: In Progress first, then Waiting (emergency before normal), then Completed
  const sortedTokens = [...tokens].sort((a, b) => {
    const order = { 'In Progress': 0, 'Waiting': 1, 'Completed': 2 };
    const statusDiff = (order[a.status] ?? 3) - (order[b.status] ?? 3);
    if (statusDiff !== 0) return statusDiff;
    if (a.status === 'Waiting' && b.status === 'Waiting') {
      if (a.priority === 'emergency' && b.priority !== 'emergency') return -1;
      if (a.priority !== 'emergency' && b.priority === 'emergency') return 1;
    }
    return 0;
  });

  return (
    <ul className={styles.list}>
      {/* Syllabus: Array map method, JSX expressions */}
      {sortedTokens.map((token) => (
        <li key={token.id} className={styles.item}>
          <span className={styles.tokenNum}>{token.tokenNumber}</span>
          
          <div className={styles.patientInfo}>
            <span className={styles.name}>{token.patientName}</span>
            <span className={styles.details}>
              {token.age} yrs • {token.gender} • {token.problem}
            </span>
          </div>
          
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {token.priority === 'emergency' && (
              <span className={styles.emergencyBadge}>Emergency</span>
            )}
            <span className={`${styles.status} ${statusClasses[token.status] || ''}`}>
              {token.status}
            </span>
          </span>
          
          <span className={styles.time}>
            {formatTime(token.createdAt)}
          </span>
        </li>
      ))}
    </ul>
  );
}
