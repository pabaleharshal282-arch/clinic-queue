/**
 * Root App – Hospital Management System Router
 * Purpose: Defines all routes; Layout wraps pages
 * Syllabus: React Router – BrowserRouter, Routes, Route, Navigate
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HospitalHomePage from './pages/HospitalHomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import DepartmentsPage from './pages/DepartmentsPage.jsx';
import DepartmentDetailsPage from './pages/DepartmentDetailsPage.jsx';
import DoctorsPage from './pages/DoctorsPage.jsx';
import AppointmentPage from './pages/AppointmentPage.jsx';
import AppointmentHistoryPage from './pages/AppointmentHistoryPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ClinicQOverviewPage from './pages/ClinicQOverviewPage.jsx';
import RegisterTokenPage from './pages/RegisterTokenPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HospitalHomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="departments/:departmentId" element={<DepartmentDetailsPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="appointments" element={<AppointmentPage />} />
          <Route path="appointment-history" element={<AppointmentHistoryPage />} />
          <Route path="admin" element={<AdminDashboardPage />} />
          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route path="contact" element={<ContactPage />} />
          {/* ClinicQ - Queue Management Module */}
          <Route path="clinicq" element={<ClinicQOverviewPage />} />
          <Route path="clinicq/register" element={<RegisterTokenPage />} />
          <Route path="clinicq/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
