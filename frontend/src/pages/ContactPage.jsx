/**
 * Contact Page - Hospital contact information
 * Purpose: Display contact details for academic report
 */

import styles from '../styles/Page.module.css';

export default function ContactPage() {
  return (
    <div>
      <div className={styles.card}>
        <h2 style={{ marginBottom: '1.5rem' }}>Contact Us</h2>
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          <div>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--primary-teal)' }}>📍 Address</h4>
            <p>Carewell Hospital, Medical Complex<br />City, State - 400001</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--primary-teal)' }}>📞 Phone</h4>
            <p>Main: +91 22 1234 5678<br />Emergency: 1800-123-4567</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--primary-teal)' }}>✉️ Email</h4>
            <p>info@carewellhospital.com<br />emergency@carewellhospital.com</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--primary-teal)' }}>🕐 Hours</h4>
            <p>OPD: 8:00 AM - 8:00 PM<br />Emergency: 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
}
