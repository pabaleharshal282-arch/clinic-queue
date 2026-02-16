/**
 * DepartmentDetailsPage - Dynamic route /departments/:departmentId
 * Purpose: Shows full department info: name, description, services, facilities, doctors
 * Data flow: useParams() → departmentId → getDepartmentById() + getDoctorsByDepartment()
 * Uses static data (departmentsData, doctorsData) - no API calls.
 *
 * Note: Backend API integration can be added later by replacing static imports
 * with fetchDepartmentById() and fetchDoctors() from hospitalApi.js
 */

import { useParams, Link } from 'react-router-dom';
import { getDepartmentById } from '../data/departmentsData';
import { getDoctorsByDepartment } from '../data/doctorsData';
import DoctorCard from '../components/DoctorCard';
import styles from '../styles/Page.module.css';
import deptStyles from '../styles/DepartmentDetails.module.css';

export default function DepartmentDetailsPage() {
  const { departmentId } = useParams();
  const department = departmentId ? getDepartmentById(departmentId) : null;
  const doctors = department ? getDoctorsByDepartment(department.name) : [];

  if (!department) {
    return (
      <div className={styles.card}>
        <p style={{ color: 'var(--danger)' }}>⚠️ Department not found</p>
        <Link to="/departments" className={`${styles.btn} ${styles.btnOutline}`} style={{ marginTop: '1rem' }}>
          ← Back to Departments
        </Link>
      </div>
    );
  }

  const services = department.services || [];
  const facilities = department.facilities || [];

  return (
    <div>
      <Link to="/departments" className={deptStyles.backLink}>
        ← Back to Departments
      </Link>

      <div className={deptStyles.header}>
        <span className={deptStyles.icon}>{department.icon}</span>
        <div>
          <h1 className={deptStyles.title}>{department.name}</h1>
          <p className={deptStyles.description}>{department.description}</p>
        </div>
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Services</h3>
        <ul className={deptStyles.list}>
          {services.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Facilities</h3>
        <ul className={deptStyles.list}>
          {facilities.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>
          Doctors ({doctors.length})
        </h3>
        {doctors.length > 0 ? (
          <div className={deptStyles.doctorsGrid}>
            {doctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} compact />
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--gray-500)' }}>No doctors listed for this department.</p>
        )}
      </div>
    </div>
  );
}
