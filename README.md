# Clinic Queue Management System

**BCA Semester 4 - Full Stack Development Project**

A professional clinic patient queue management system built with React. Fully functional offline using localStorage.

![React](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![Status](https://img.shields.io/badge/Status-Offline%20Ready-green)

## Features

### Patient Registration
- Full patient details: Name, Age, Gender, Department/Problem
- Auto-generated token numbers (Q001, Q002, Q003...)
- New patients automatically set to "Waiting" status

### Queue Dashboard
- **Call Next** - Moves current patient to Completed, next Waiting to In Progress
- **Mark Completed** - Complete current patient without calling next
- **Clear Queue** - Reset entire queue (with confirmation)
- Real-time queue display sorted by status

### Home Overview
- Current serving patient display
- Statistics: Waiting count, Completed count, Estimated wait time
- Quick action buttons

### Technical Features
- **localStorage persistence** - Data survives page refresh
- Professional UI with sidebar navigation
- Status badges (Waiting / In Progress / Completed)
- Loading and error state simulation
- Responsive design

## Tech Stack

| Frontend | Backend (for online mode) |
|----------|---------------------------|
| React 18 | Node.js |
| React Router DOM | Express |
| Vite | MongoDB + Mongoose |
| CSS Modules | |
| Axios (ready) | |

## Project Structure

```
ClinicQueue/
├── frontend/
│   ├── src/
│   │   ├── api/           # API layer (mock + commented axios)
│   │   ├── components/    # Reusable UI components
│   │   ├── data/          # Mock data + localStorage
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS Modules + global CSS
│   │   ├── App.jsx        # Router setup
│   │   └── main.jsx       # Entry point
│   └── package.json
├── backend/               # Node/Express API (for online mode)
└── README.md
```

## How to Run

### Offline Mode (Default)
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000`

### Online Mode (Requires MongoDB)
1. Start MongoDB
2. In `frontend/src/api/tokenApi.js`: Uncomment axios calls, comment mock usage
3. Start backend: `cd backend && npm install && npm start`
4. Start frontend: `cd frontend && npm run dev`

## Queue Logic

1. New patient → **Waiting** status
2. Only **one patient** can be "In Progress" at a time
3. **Call Next**: Current (In Progress) → Completed, First Waiting → In Progress
4. **Mark Completed**: Current → Completed (no auto-call)

## Syllabus Mapping

| Topic | Implementation |
|-------|----------------|
| React Functional Components | All components |
| ES6 (let, const, arrow functions, destructuring) | Throughout codebase |
| JSX expressions | All components |
| useState, useEffect, useRef | Pages, hooks |
| Custom Hook | `useQueueData.js` |
| Controlled Forms | `RegisterTokenPage.jsx` |
| Event Handling (onClick, onChange, onSubmit) | Forms, buttons |
| Conditional Rendering | Status badges, loading states |
| React Router (BrowserRouter, Routes, Route, NavLink) | `App.jsx`, `Layout.jsx` |
| CSS Modules + External CSS | All styles |
| try/catch in async functions | API calls |
| Virtual DOM | State-based re-rendering |

## Screenshots

The application includes:
- Professional sidebar navigation
- Stats cards with icons
- Current serving display
- Patient queue list with status badges
- Registration form with validation
- Action buttons with loading states

## Clear Data

To reset the queue, clear localStorage:
```javascript
localStorage.removeItem('clinic_queue_tokens');
localStorage.removeItem('clinic_queue_counter');
```
Or use browser DevTools → Application → Local Storage → Clear

## License

MIT - BCA Semester 4 Project
