/**
 * DoctorCard - Reusable card for doctor display
 * Purpose: Used on Doctors page and DepartmentDetails page
 * Data flow: Receives doctor object { id, name, department, specialization, experience, availability }
 * Props: doctor (required), compact (optional) - compact layout for lists
 */

import styles from '../styles/Page.module.css';

export default function DoctorCard({ doctor, compact = false }) {
  const availability = doctor.availability ?? (Array.isArray(doctor.availableDays) ? doctor.availableDays.join(', ') : null);

  return (
    <div className={styles.card}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <div
          style={{
            width: compact ? 48 : 56,
            height: compact ? 48 : 56,
            background: 'var(--gray-200)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: compact ? '1.25rem' : '1.5rem',
            flexShrink: 0,
          }}
        >
          👨‍⚕️
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4 style={{ marginBottom: '0.25rem' }}>{doctor.name}</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--primary-teal)', marginBottom: '0.25rem' }}>
            {doctor.department}
          </p>
          {doctor.specialization && (
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>{doctor.specialization}</p>
          )}
          {doctor.experience != null && (
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
              {doctor.experience} years experience
            </p>
          )}
          {availability && (
            <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
              <strong>Available:</strong> {availability}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
