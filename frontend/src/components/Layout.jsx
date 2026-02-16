/**
 * Layout - Hospital website with sidebar navigation and footer
 * Purpose: Wraps all pages with consistent navbar and footer
 * Syllabus: React Router – NavLink, Outlet
 */

import { Outlet, NavLink, useLocation } from 'react-router-dom';
import styles from '../styles/Layout.module.css';

const navItems = [
  { path: '/', label: 'Home', icon: '🏠', end: true },
  { path: '/about', label: 'About', icon: 'ℹ️', end: true },
  { path: '/departments', label: 'Departments', icon: '🏥', end: true },
  { path: '/doctors', label: 'Doctors', icon: '👨‍⚕️', end: true },
  { path: '/clinicq', label: 'ClinicQ', icon: '📋', end: false, sub: [
    { path: '/clinicq/register', label: 'Register Patient' },
    { path: '/clinicq/dashboard', label: 'Queue Dashboard' },
  ]},
  { path: '/appointments', label: 'Appointments', icon: '📅', end: true },
  { path: '/appointment-history', label: 'Appointment History', icon: '📜', end: true },
  { path: '/admin', label: 'Admin', icon: '⚙️', end: false },
  { path: '/contact', label: 'Contact', icon: '📞', end: true },
];

const pageTitles = {
  '/': 'Home',
  '/about': 'About Us',
  '/departments': 'Departments',
  '/doctors': 'Our Doctors',
  '/clinicq': 'ClinicQ - Queue Overview',
  '/clinicq/register': 'Register Patient',
  '/clinicq/dashboard': 'Queue Management',
  '/appointments': 'Book Appointment',
  '/appointment-history': 'Appointment History',
  '/admin': 'Admin Dashboard',
  '/admin/login': 'Admin Login',
  '/contact': 'Contact Us',
};

// Dynamic route: /departments/:departmentId shows "Department Details"
function getPageTitle(pathname) {
  if (pathname.match(/^\/departments\/[^/]+$/)) return 'Department Details';
  return pageTitles[pathname] || 'Carewell Hospital';
}

export default function Layout() {
  const location = useLocation();
  const currentTitle = getPageTitle(location.pathname);

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>🏥</div>
          <h1 className={styles.logoTitle}>Carewell Hospital</h1>
          <p className={styles.logoSubtitle}>Management System</p>
        </div>

        <nav className={styles.nav}>
          {navItems.map(({ path, label, icon, end, sub }) => (
            <div key={path}>
              <NavLink
                to={path}
                end={end}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                <span className={styles.navIcon}>{icon}</span>
                {label}
              </NavLink>
              {sub && location.pathname.startsWith(path) && (
                <div className={styles.subNav}>
                  {sub.map(({ path: p, label: l }) => (
                    <NavLink
                      key={p}
                      to={p}
                      end
                      className={({ isActive }) =>
                        `${styles.subNavLink} ${isActive ? styles.active : ''}`
                      }
                    >
                      {l}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <p>© 2025 Carewell Hospital</p>
          <p>Academic Mini-Project</p>
        </div>
      </aside>

      <div className={styles.mainWrapper}>
        <header className={styles.header}>
          <h2 className={styles.headerTitle}>{currentTitle}</h2>
          <div className={styles.headerBadge}>
            <span className={styles.headerBadgeDot}></span>
            System Online
          </div>
        </header>

        <main className={styles.main}>
          <Outlet />
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <span>Carewell Hospital</span>
            <span>•</span>
            <span>24/7 Emergency: +91 1800-123-4567</span>
            <span>•</span>
            <span>Hospital Management System - Academic Project</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
