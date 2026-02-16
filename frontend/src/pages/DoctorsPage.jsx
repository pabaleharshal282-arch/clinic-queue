/**
 * Doctors Page - Lists hospital doctors with department filter
 * Purpose: Display doctor cards using reusable DoctorCard; fetches from API
 * Data flow: fetchDoctors(filter) + fetchDepartments() → DoctorCard for each doctor
 */

import { useState, useEffect } from 'react';
import { fetchDoctors, fetchDepartments } from '../api/hospitalApi';
import DoctorCard from '../components/DoctorCard';
import styles from '../styles/Page.module.css';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchDoctors(filter || undefined), fetchDepartments()])
      .then(([docs, depts]) => {
        setDoctors(Array.isArray(docs) ? docs : []);
        setDepartments(Array.isArray(depts) ? depts : []);
      })
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false));
  }, [filter]);

  // Fallback if API fails - 12-15 doctors with id, name, department, specialization, experience, availability
  const docs = doctors.length > 0 ? doctors : [
    { id: 'doc-1', name: 'Dr. Rajesh Kumar', department: 'Cardiology', specialization: 'Interventional Cardiologist', experience: 15, availability: 'Mon, Wed, Fri' },
    { id: 'doc-2', name: 'Dr. Priya Sharma', department: 'Cardiology', specialization: 'Pediatric Cardiologist', experience: 10, availability: 'Tue, Thu, Sat' },
    { id: 'doc-3', name: 'Dr. Amit Patel', department: 'Orthopedics', specialization: 'Joint Replacement', experience: 12, availability: 'Mon, Tue, Wed, Thu' },
    { id: 'doc-4', name: 'Dr. Sneha Reddy', department: 'Neurology', specialization: 'Stroke Specialist', experience: 14, availability: 'Mon, Wed, Fri' },
    { id: 'doc-5', name: 'Dr. Vikram Singh', department: 'Neurology', specialization: 'Epilepsy & Sleep Disorders', experience: 8, availability: 'Tue, Thu, Sat' },
    { id: 'doc-6', name: 'Dr. Anjali Desai', department: 'Pediatrics', specialization: 'Child Development', experience: 11, availability: 'Mon-Fri' },
    { id: 'doc-7', name: 'Dr. Ravi Verma', department: 'General Medicine', specialization: 'Internal Medicine', experience: 20, availability: 'Mon-Sat' },
    { id: 'doc-8', name: 'Dr. Meera Krishnan', department: 'Gynecology', specialization: 'High-Risk Pregnancy', experience: 16, availability: 'Tue, Wed, Fri' },
    { id: 'doc-9', name: 'Dr. Karthik Nair', department: 'ENT', specialization: 'Head & Neck Surgery', experience: 9, availability: 'Mon, Thu, Sat' },
    { id: 'doc-10', name: 'Dr. Pooja Gupta', department: 'Dermatology', specialization: 'Cosmetic Dermatology', experience: 7, availability: 'Wed, Fri, Sat' },
  ];

  return (
    <div>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Filter by Department</h3>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.select}
          style={{ maxWidth: '280px' }}
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d.id} value={d.name}>{d.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: 'var(--gray-500)' }}>Loading doctors...</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {docs.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      )}
    </div>
  );
}
