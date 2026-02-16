/**
 * Hospital Home Page - Hero, statistics, services, ClinicQ CTA
 * Purpose: Main landing page for Hospital Management System
 * Methodology: Fetches stats and services from API; displays hero and cards
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchHospitalStats, fetchServices } from '../api/hospitalApi';
import styles from '../styles/Home.module.css';

export default function HospitalHomePage() {
  const [stats, setStats] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [statsData, servicesData] = await Promise.all([
          fetchHospitalStats(),
          fetchServices(),
        ]);
        setStats(statsData);
        setServices(servicesData);
      } catch (err) {
        setError(err.message || 'Failed to load data');
        // Fallback for demo if backend not running
        setStats({ totalDoctors: 45, totalDepartments: 12, patientsServed: 12500, yearsOfService: 25 });
        setServices([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Carewell Hospital</h1>
        <p className={styles.heroSubtitle}>
          Your trusted healthcare partner. We provide comprehensive medical care
          with modern facilities and experienced doctors.
        </p>
        <div className={styles.heroCta}>
          <Link to="/appointments" className={`${styles.heroBtn} ${styles.heroBtnPrimary}`}>
            📅 Book Appointment
          </Link>
          <Link to="/clinicq" className={`${styles.heroBtn} ${styles.heroBtnOutline}`}>
            📋 Queue Status
          </Link>
        </div>
      </section>

      {/* Statistics Section */}
      <section className={styles.statsSection}>
        <h2 className={styles.sectionTitle}>Our Impact</h2>
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--gray-500)' }}>Loading statistics...</p>
        ) : stats ? (
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>👨‍⚕️</div>
              <div className={styles.statValue}>{stats.totalDoctors}+</div>
              <div className={styles.statLabel}>Doctors</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🏥</div>
              <div className={styles.statValue}>{stats.totalDepartments}</div>
              <div className={styles.statLabel}>Departments</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🙂</div>
              <div className={styles.statValue}>{stats.patientsServed?.toLocaleString()}+</div>
              <div className={styles.statLabel}>Patients Served</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>⭐</div>
              <div className={styles.statValue}>{stats.yearsOfService}+</div>
              <div className={styles.statLabel}>Years of Service</div>
            </div>
          </div>
        ) : null}
      </section>

      {/* Services Section */}
      <section>
        <h2 className={styles.sectionTitle}>Our Services</h2>
        {services.length > 0 ? (
          <div className={styles.servicesGrid}>
            {services.map((s) => (
              <Link key={s.id} to="/departments" className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{s.icon}</div>
                <h3 className={styles.serviceTitle}>{s.name}</h3>
                <p className={styles.serviceDesc}>{s.description}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.servicesGrid}>
            {[
              { icon: '❤️', name: 'Cardiology', desc: 'Heart and cardiovascular care' },
              { icon: '🦴', name: 'Orthopedics', desc: 'Bone, joint, and muscle care' },
              { icon: '🧠', name: 'Neurology', desc: 'Brain and nervous system care' },
              { icon: '👶', name: 'Pediatrics', desc: 'Child healthcare' },
              { icon: '🩺', name: 'General Medicine', desc: 'Primary and preventive care' },
              { icon: '🦷', name: 'Dental', desc: 'Oral and dental health' },
            ].map((s, i) => (
              <Link key={i} to="/departments" className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{s.icon}</div>
                <h3 className={styles.serviceTitle}>{s.name}</h3>
                <p className={styles.serviceDesc}>{s.desc}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ClinicQ CTA */}
      <section className={styles.clinicqSection}>
        <div className={styles.clinicqContent}>
          <h3>ClinicQ - Queue Management</h3>
          <p>Register patients, view queue status, and manage the clinic flow.</p>
        </div>
        <Link to="/clinicq" className={styles.clinicqLink}>
          Open ClinicQ →
        </Link>
      </section>
    </div>
  );
}
