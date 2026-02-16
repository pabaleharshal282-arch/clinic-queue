/**
 * DepartmentCard - Reusable card for department display
 * Purpose: Used on Departments list and as clickable link to department details
 * Routing: Wraps content in Link to /departments/:departmentId when to prop provided
 * Data flow: Receives department object { id, name, description, icon, doctorCount }
 */

import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css';

export default function DepartmentCard({ department, to }) {
  const content = (
    <>
      <div className={styles.serviceIcon}>{department.icon}</div>
      <h3 className={styles.serviceTitle}>{department.name}</h3>
      <p className={styles.serviceDesc}>{department.description}</p>
      {department.doctorCount != null && (
        <p style={{ fontSize: '0.85rem', color: 'var(--primary-teal)', marginTop: '0.5rem' }}>
          {department.doctorCount} doctor{department.doctorCount !== 1 ? 's' : ''}
          {to && <span style={{ marginLeft: '0.5rem', opacity: 0.8 }}>→ View details</span>}
        </p>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={styles.serviceCard}>
        {content}
      </Link>
    );
  }

  return <div className={styles.serviceCard} style={{ cursor: 'default' }}>{content}</div>;
}
