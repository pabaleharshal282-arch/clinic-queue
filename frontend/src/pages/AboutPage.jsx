/**
 * About Page - Hospital information and mission
 * Purpose: Informational page for academic report
 */

import styles from '../styles/Page.module.css';

export default function AboutPage() {
  return (
    <div>
      <div className={styles.card}>
        <h2 style={{ marginBottom: '1rem' }}>About Carewell Hospital</h2>
        <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
          Carewell Hospital has been serving the community for over 25 years. Our mission
          is to provide accessible, quality healthcare to all patients.
        </p>
        <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
          We offer a wide range of medical services including Cardiology, Orthopedics,
          Neurology, Pediatrics, and many more. Our team of experienced doctors and
          staff are committed to your wellbeing.
        </p>
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Our Objectives</h3>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: 2 }}>
          <li>Provide comprehensive healthcare services</li>
          <li>Maintain efficient patient queue management</li>
          <li>Enable easy appointment booking</li>
          <li>Ensure transparency and patient satisfaction</li>
        </ul>
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Methodology</h3>
        <p style={{ lineHeight: 1.8 }}>
          This Hospital Management System follows a structured approach: REST API backend
          with Node.js/Express, React frontend with component-based architecture, and
          modular design for scalability. ClinicQ handles real-time queue management.
        </p>
      </div>
    </div>
  );
}
