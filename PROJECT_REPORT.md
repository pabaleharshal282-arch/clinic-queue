# Hospital Management System - Academic Project Report

## 1. Problem Definition

Healthcare facilities face challenges in:
- **Queue Management**: Manual token systems cause confusion and long wait times
- **Appointment Booking**: Patients lack easy ways to schedule visits
- **Information Access**: No centralized view of departments, doctors, and services
- **Patient Flow**: Inefficient coordination between registration, waiting, and consultation

This project addresses these issues by building a **Hospital Management System** with an integrated **ClinicQ** queue module.

---

## 2. Objectives

1. **Hospital Website**: Provide a professional, informative hospital website with Home, About, Departments, Doctors, Contact pages
2. **ClinicQ Module**: Maintain the existing queue system (Register → Wait → Call Next → Complete)
3. **Appointment Booking**: Allow patients to request appointments via a simple form
4. **RESTful API**: Structured backend with routes, controllers, models for doctors, departments, appointments
5. **Modern UI**: Responsive, medical-themed, academic-grade frontend
6. **Documentation**: Code comments and structure suitable for report and presentation

---

## 3. Methodology

### 3.1 Technology Stack

| Layer   | Technology                    |
|---------|-------------------------------|
| Frontend| React, Vite, React Router     |
| Backend | Node.js, Express              |
| API     | REST (JSON)                   |
| Data    | Mock/Static (localStorage for ClinicQ) |
| Styling | CSS Modules, CSS Variables    |

### 3.2 Architecture

- **MVC Pattern**: Backend follows Routes → Controllers → Models
- **Component-Based**: Frontend uses reusable components and pages
- **API Layer**: Central `hospitalApi.js` and `tokenApi.js` for API calls
- **Separation of Concerns**: Layout, Pages, Components, Hooks, API modules

### 3.3 ClinicQ Queue Logic

1. **Token States**: `Waiting` → `In Progress` → `Completed`
2. **Call Next**: Marks current `In Progress` as `Completed`, first `Waiting` as `In Progress`
3. **Mark Completed**: Marks current `In Progress` as `Completed`
4. **Data Persistence**: localStorage (offline) or API (when connected)
5. **Stats**: Waiting count, completed count, estimated wait time (~5 min/patient)

---

## 4. System Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    HOSPITAL MANAGEMENT SYSTEM                     │
├─────────────────────────────────────────────────────────────────┤
│  Home → Hero, Stats, Services, ClinicQ CTA                        │
│  About → Hospital info, Objectives, Methodology                   │
│  Departments → List of departments with descriptions              │
│  Doctors → Filterable doctor list                                 │
│  ClinicQ → Queue overview | Register Patient | Dashboard          │
│  Appointments → Book appointment form                             │
│  Contact → Address, Phone, Email, Hours                           │
└─────────────────────────────────────────────────────────────────┘

Backend APIs:
  /api/doctors        - GET all doctors, ?department= filter
  /api/departments    - GET all departments
  /api/appointments   - POST create, GET list
  /api/hospital/stats - GET statistics
  /api/hospital/services - GET featured services
```

---

## 5. Folder Structure

```
frontend/
  src/
    api/         - hospitalApi.js, tokenApi.js
    components/  - Layout, QueueList
    hooks/       - useQueueData
    pages/       - All page components
    styles/      - CSS Modules
    data/        - mockData (ClinicQ)

backend/
  routes/        - doctors, departments, appointments, hospital
  controllers/   - Business logic
  models/        - Schema definitions
  data/          - Mock data
  config/        - db.js
```

---

## 6. How to Run

1. **Backend**: `cd backend && npm install && npm run dev`
2. **Frontend**: `cd frontend && npm install && npm run dev`
3. Open http://localhost:3000

---

## 7. Screenshots for Report

Suggested screenshots:
1. Home page – Hero + Stats + Services
2. Departments page – Department cards
3. Doctors page – Doctor list with filter
4. ClinicQ Overview – Queue stats
5. ClinicQ Register – Patient registration form
6. ClinicQ Dashboard – Queue controls + list
7. Appointment page – Booking form
8. Contact page – Contact info

---

*Academic Mini-Project – Hospital Management System*
