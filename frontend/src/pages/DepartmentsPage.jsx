/**
 * Departments Page - Lists all hospital departments as clickable cards
 * Purpose: Display department cards; clicking navigates to /departments/:departmentId
 * Routing: DepartmentCard uses Link to enable dynamic routing on click
 * Data flow: Static departmentsData - no API calls. Backend integration can be added later.
 */

import { departments } from '../data/departmentsData';
import DepartmentCard from '../components/DepartmentCard';
import styles from '../styles/Home.module.css';

export default function DepartmentsPage() {

  return (
    <div>
      <h2 className={styles.sectionTitle}>Hospital Departments</h2>
      <p style={{ textAlign: 'center', color: 'var(--gray-500)', marginBottom: '1.5rem' }}>
        Click a department to view details, services, facilities, and doctors.
      </p>
      <div className={styles.servicesGrid}>
        {departments.map((d) => (
          <DepartmentCard key={d.id} department={d} to={`/departments/${d.id}`} />
        ))}
      </div>
    </div>
  );
}
