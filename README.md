<div align="center">

# 🎓 EduCore — School Management System

**A modern, responsive, full-featured school administration dashboard built with React 19, Redux Toolkit, and Firebase.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.x-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Problem Statement](#2-problem-statement)
3. [Solution](#3-solution)
4. [System Architecture](#4-system-architecture)
5. [Technology Stack](#5-technology-stack)
6. [Key Features](#6-key-features)
7. [Code Structure Analysis](#7-code-structure-analysis)
8. [UI/UX Structure](#8-uiux-structure)
9. [Challenges and Technical Decisions](#9-challenges-and-technical-decisions)
10. [Performance & Scalability Considerations](#10-performance--scalability-considerations)
11. [Security Considerations](#11-security-considerations)
12. [Future Improvements](#12-future-improvements)
13. [Developer Learnings](#13-developer-learnings)
14. [Resume Description](#14-resume-description)
15. [Getting Started](#15-getting-started)

---

## 1. Project Overview

**EduCore** is a comprehensive, web-based School Management System designed to centralize and streamline the daily administrative operations of a school. Built as a Single Page Application (SPA) using React 19, it provides school administrators, teachers, and staff with a unified dashboard to manage students, teachers, attendance, finances, events, food programs, and internal communications.

The application features a polished, responsive UI with a persistent sidebar navigation, real-time data visualizations via charts, Firebase-backed authentication, and a scalable Redux-powered state management layer. A public-facing landing page presents the system's value proposition to potential institutional clients before they log in.

**Core purpose in one sentence:** Replace fragmented spreadsheets and paper-based school administration with a single, modern, role-aware digital platform.

---

## 2. Problem Statement

Schools and educational institutions routinely manage vast amounts of operational data across multiple disconnected tools:

- **Student records** stored in spreadsheets or legacy software
- **Attendance** tracked on paper registers with no historical analytics
- **Finance and fee collection** managed manually with no automated reminders or status tracking
- **Staff management** lacking a central directory or activity log
- **Internal communication** scattered across email threads and messaging apps
- **Event scheduling** maintained in physical notice boards or basic calendar apps
- **Cafeteria / food programs** with no digital menu, order tracking, or nutrition data

This fragmentation leads to:

- Data inconsistency and duplication
- Slow decision-making due to unavailable real-time insights
- High administrative overhead for routine tasks
- Poor visibility for school leadership into overall school performance

---

## 3. Solution

EduCore solves these problems by providing an **all-in-one, browser-based management platform** that consolidates all school operations into a single dashboard.

**How it works from a user perspective:**

1. **Administrators** visit the landing page and sign up or log in using email/password or Google OAuth.
2. After authentication, they land on the **Dashboard** — a command center showing live counts of students, teachers, events, and food items, alongside performance charts, finance summaries, a school calendar, and a list of students with unpaid fees.
3. From the **persistent sidebar**, administrators navigate between dedicated modules:
   - Add or search students and teachers
   - Mark and review class-wise attendance
   - Track weekly income and manage fee payments
   - Schedule and view school events
   - Browse cafeteria menus and food details
   - Communicate through a built-in chat interface
   - Review a live activity feed of all system actions
4. All data mutations (adding students, submitting attendance, marking fees paid, etc.) instantly update the **Latest Activity** feed, providing a complete audit trail.
5. The interface is fully **responsive** — collapsing the sidebar into a mobile-friendly hamburger menu on smaller screens.

---

## 4. System Architecture

### Frontend Structure

EduCore is a **client-side SPA** built entirely on React with no backend server. All business logic, state, and data reside in the browser. Firebase is consumed directly from the client for authentication.

```
Browser (React SPA)
    │
    ├── React Router v7     — Client-side routing & nested layouts
    ├── Redux Toolkit       — Global state management
    ├── Firebase Auth SDK   — Authentication (Email/Password + Google OAuth)
    └── Recharts / MUI      — Data visualization & UI components
```

### Tech Stack at a Glance

```
React 19 + Vite 7  →  build toolchain
Tailwind CSS 4     →  utility-first styling
Redux Toolkit      →  state management
React Router v7    →  client-side routing
Firebase 12        →  authentication
Recharts 3         →  data visualization
MUI 7              →  date picker & UI components
Framer Motion 12   →  page animations
```

### Folder Organization

```
src/
├── App.jsx                   # Root component — renders AppRoutes
├── main.jsx                  # React DOM entry point, Redux Provider
├── index.css                 # Global styles
│
├── routes/
│   └── AppRoutes.jsx         # Centralized route definitions (public + protected)
│
├── pages/                    # Route-level page components
│   ├── LandingPage.jsx       # Public marketing/landing page
│   ├── auth/                 # Login & Signup pages
│   ├── DashboardPage/        # Main dashboard page
│   ├── StudentPage/          # Student list page
│   ├── TeacherPage/          # Teacher list page
│   ├── AttendancePage/       # Attendance overview, mark & report pages
│   ├── FinancePage/          # Finance management page
│   └── FoodPage/             # Food/cafeteria page
│
├── component/                # Reusable UI components
│   ├── Auth/                 # AuthLayout wrapper
│   ├── Chat/                 # Chat page + sidebar + window + message bubble
│   ├── commonComponent/      # Pagination, search header
│   ├── DashBoard/            # Charts, calendar, unpaid students widgets
│   ├── DashboardLayout/      # Persistent layout (sidebar + outlet)
│   ├── Event/                # Event management component
│   ├── Finance/              # Finance components & styles
│   ├── Food/                 # Food list, details, percentage circle
│   ├── LatestActivity/       # Activity feed component
│   ├── SideBar/              # Sidebar navigation component
│   ├── Student/              # Add student form
│   ├── Teacher/              # Add teacher form
│   └── User/                 # User profile component
│
├── store/                    # Redux state management
│   ├── store.js              # Redux store configuration
│   └── slices/
│       ├── authSlice.js      # Authentication state + async thunks
│       ├── studentsSlice.js  # Students CRUD + search/filter
│       ├── teachersSlice.js  # Teachers CRUD + search/filter
│       ├── attendanceSlice.js  # Attendance tracking + reporting
│       ├── financeSlice.js   # Fee payments + weekly income
│       ├── eventsSlice.js    # School events CRUD
│       └── activitiesSlice.js  # Auto-generated activity log
│
├── services/
│   └── firebase.js           # Firebase app init + Auth export
│
├── utils/
│   └── mockData/             # Static seed data for development
│       ├── studentsData.js
│       ├── teacherData.js
│       ├── attendanceData.js
│       ├── chatMockData.js
│       └── mockFoodData.js
│
└── assets/
    └── SideBarIcone/         # PNG icons used in the sidebar navigation
```

---

## 5. Technology Stack

### Core Framework & Language

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.x | UI component library |
| **Vite** | 7.x | Build tool & development server |
| **JavaScript (ES Modules)** | ES2022+ | Primary language |

### Routing

| Technology | Version | Purpose |
|---|---|---|
| **React Router DOM** | 7.x | Client-side routing & nested layouts |

### State Management

| Technology | Version | Purpose |
|---|---|---|
| **Redux Toolkit** | 2.x | Global state management (slices, thunks, selectors) |
| **React-Redux** | 9.x | React bindings for Redux |

### Backend / Authentication

| Technology | Version | Purpose |
|---|---|---|
| **Firebase** | 12.x | Authentication (Email/Password + Google OAuth) |

### UI & Styling

| Technology | Version | Purpose |
|---|---|---|
| **Tailwind CSS** | 4.x | Utility-first styling |
| **MUI (Material UI)** | 7.x | Date pickers & advanced UI components |
| **Emotion** | 11.x | CSS-in-JS (MUI dependency) |
| **Framer Motion** | 12.x | Animations (auth layout, landing page transitions) |

### Data Visualization

| Technology | Version | Purpose |
|---|---|---|
| **Recharts** | 3.x | Bar charts, line charts for performance & finance |

### Icons

| Technology | Version | Purpose |
|---|---|---|
| **Font Awesome (React)** | 7.x / 3.x | Solid & regular icon sets |
| **React Icons** | 5.x | Google icon, supplemental icons |
| **Heroicons** | 2.x | Supplemental icon set |

### Date Handling

| Technology | Version | Purpose |
|---|---|---|
| **Day.js** | 1.x | Lightweight date/time formatting |

### Development Tools

| Technology | Purpose |
|---|---|
| **ESLint** | Code linting with React Hooks & Refresh plugins |
| **PostCSS + Autoprefixer** | CSS processing pipeline |

---

## 6. Key Features

### 🔐 Authentication System
- Email & password registration and login via Firebase Auth
- Google OAuth single sign-on (one-click login)
- Persistent auth state managed in Redux
- Animated authentication layout using Framer Motion
- Error handling and loading states on all auth actions

### 📊 Admin Dashboard
- Live KPI cards: total students, teachers, events, and food items (reactive to Redux state)
- **School Performance Chart** — multi-line Recharts visualization of academic performance over time
- **Finance Chart** — weekly income comparison (this week vs last week) via Recharts BarChart
- **School Calendar** — interactive MUI DateCalendar for event awareness
- **Unpaid Students Panel** — filterable list of students with outstanding fees and one-click "mark as paid" action

### 👨‍🎓 Student Management
- Paginated, searchable student directory with grade-based color coding
- Add new students via a structured form (name, email, phone, parent, grade, city, address, payment status)
- Delete students with automatic activity log entry
- Filter students by grade level
- Auto-generated student IDs and avatar initials

### 👩‍🏫 Teacher Management
- Paginated, searchable teacher directory
- Add and delete teacher records
- Automatic activity log entry on all changes

### 📋 Attendance System
- **Overview Page** — Class-wise today's attendance with present/absent/late counts, attendance rate percentage badges, and a weekly summary bar chart
- **Mark Attendance Page** — Per-student status toggle (Present / Absent / Late / Excused) and session submission
- **Report Page** — Monthly per-student attendance summary with trend charts
- Attendance submissions update the Redux store and trigger activity log entries

### 💰 Finance Management
- Weekly income tracker comparing current vs prior week performance
- Unpaid students list with individual "Mark as Paid" actions
- School expense breakdown visualization
- Finance actions feed the activity log automatically

### 📅 Event Management
- Create, view, and delete school events (meetings, exams, holidays, activities)
- Events categorized by type with color-coded badges
- Event count reflected live on the Dashboard KPIs

### 🍽️ Food / Cafeteria Management
- Cafeteria menu browser with food categories (Breakfast, Lunch, Snack)
- Percentage popularity circle component for each food item
- Detailed food view (`/food-details/:id`) with ratings, order counts, and description
- Navigable detail page using React Router dynamic segments

### 💬 Internal Chat
- Sidebar with contact list and recent messages
- Chat window with full conversation history
- Real-time message sending (local state; mock data seeded)
- Sender/receiver message bubble differentiation

### 📰 Latest Activity Feed
- Auto-generated audit log for: student enrollment/removal, teacher changes, attendance submissions, payment receipts, event scheduling/cancellation
- Time-grouped display (Today / Yesterday / Earlier)
- Rich message formatting with bold actors and highlighted subjects
- Activity entries triggered automatically via Redux `extraReducers` listening to other slice actions

### 📱 Responsive Layout
- Mobile-first sidebar that collapses to a hamburger menu on small screens
- Backdrop overlay blocks interaction when sidebar is open on mobile
- Body scroll lock while sidebar is open
- Responsive grid layouts throughout all pages

---

## 7. Code Structure Analysis

### `src/pages/`
Route-level components that represent full pages. Each page imports and orchestrates smaller components. Pages are thin orchestration layers — they read from Redux via selectors and delegate rendering to component children.

### `src/component/`
Reusable presentational and smart components organized by feature domain (e.g., `Chat/`, `Food/`, `DashBoard/`). Components like `Pagination` and `searchHeader` in `commonComponent/` are truly reusable utilities shared across multiple pages.

### `src/store/slices/`
Each Redux slice encapsulates one domain's state, reducers, async thunks, and selectors. Key highlights:

- **`authSlice.js`** — Four async thunks (`loginUser`, `signupUser`, `loginWithGoogle`, `logoutUser`) backed by Firebase SDK calls. Returns only serializable user fields to avoid Redux non-serializable value warnings.
- **`activitiesSlice.js`** — Uses Redux Toolkit's `extraReducers` with `builder.addCase()` to listen for `fulfilled` actions from other slices and automatically append a new activity entry. This is an elegant cross-slice communication pattern.
- **`attendanceSlice.js`** — Complex slice managing four data shapes: class-level overview, per-student records, in-progress marked data (keyed by `classId`), and submitted session history.
- **`financeSlice.js`** — Manages unpaid student records and weekly income comparison data with auto-calculated totals.

### `src/services/`
Thin Firebase configuration layer. Exports only the `auth` instance. Keeping initialization isolated here makes it easy to swap providers or add Firestore in the future.

### `src/utils/mockData/`
Static JavaScript arrays that seed the Redux store's `initialState`. This approach enables full UI development without a live backend, following the "mock-first" development pattern.

### `src/assets/`
Custom PNG icons used in the sidebar navigation. Styled via Tailwind's `brightness-0 invert` utility to achieve color theming without maintaining multiple icon variants.

---

## 8. UI/UX Structure

| Screen | Route | Purpose |
|---|---|---|
| **Landing Page** | `/` | Public marketing page with stats, features, testimonials, and scroll animations |
| **Login** | `/login` | Firebase email/password + Google OAuth login with animated split-screen layout |
| **Signup** | `/signup` | New account registration form with Firebase |
| **Dashboard** | `/dashboard` | Main KPI command center: counts, charts, calendar, unpaid fees |
| **Students List** | `/students` | Searchable, filterable, paginated student directory |
| **Add Student** | `/students/add-student` | Multi-field form to enroll a new student |
| **Teachers List** | `/teachers` | Searchable, paginated teacher directory |
| **Add Teacher** | `/teachers/add-teacher` | Form to add a new teacher record |
| **Attendance Overview** | `/attendance` | Class-wise today's attendance stats + weekly chart |
| **Mark Attendance** | `/attendance/mark` | Per-student attendance status toggle & submission |
| **Attendance Report** | `/attendance/report` | Monthly per-student report with trend visualization |
| **Events** | `/event` | Calendar-style event list with add/delete functionality |
| **Finance** | `/finance` | Weekly income chart + unpaid students + expense breakdown |
| **Food** | `/food` | Cafeteria menu browser with category filters |
| **Food Details** | `/food-details/:id` | Individual food item detail with stats and ratings |
| **User Profile** | `/user` | User account information panel |
| **Chat** | `/chat` | Internal messaging with sidebar contacts and chat window |
| **Latest Activity** | `/latest-activity` | Time-grouped audit log of all system events |

### Design Language

- **Primary brand color:** `#4D44B5` (Indigo/Purple)
- **Accent colors:** `#FB7D5B` (Coral), `#FCC43E` (Amber), `#4CAF79` (Green)
- **Background:** `#F3F4FF` (light blue-gray) for all dashboard pages
- **Card style:** White rounded cards with a 20px border-radius and subtle shadows
- **Typography:** Poppins and Sora font families for modern, professional readability

---

## 9. Challenges and Technical Decisions

### Challenge 1: Cross-Slice State Synchronization (Activity Log)
**Problem:** The activity feed needed to update whenever actions occurred in other modules, but Redux slices are isolated by design.

**Decision:** Used Redux Toolkit's `extraReducers` with `builder.addCase()` to listen for `fulfilled` actions from other slices within `activitiesSlice`. This keeps each slice decoupled while enabling automatic cross-domain reactions — a clean, scalable Redux pattern that avoids prop drilling or event buses.

### Challenge 2: Firebase Auth State Serialization
**Problem:** Firebase `User` objects contain non-serializable properties that cause Redux middleware warnings if stored directly.

**Decision:** Each auth async thunk extracts only serializable fields (`uid`, `email`, `displayName`, `photoURL`) before dispatching to the store, keeping auth state plain and Redux-compliant.

### Challenge 3: Responsive Sidebar on Mobile
**Problem:** A persistent full-height sidebar is impractical on mobile screens and requires careful z-index, scroll, and visibility management.

**Decision:** The sidebar uses `fixed` positioning with CSS `translate-x` transitions on mobile, a backdrop overlay, and a `useEffect` that locks `document.body.overflow` when the sidebar is open. A second `useEffect` listens to `location.pathname` changes to auto-close the sidebar on navigation.

### Challenge 4: Mock-First Development without a Backend
**Problem:** Building and demonstrating a feature-complete application required realistic data before any backend was available.

**Decision:** All modules use static `mockData` files as Redux `initialState`. This enabled immediate UI development, complete feature demonstration, and simple future migration — just swap `initialState` sources for API calls.

### Challenge 5: Dynamic Food Detail Navigation
**Problem:** The food detail page needs access to the full food object, but URL params only carry an ID.

**Decision:** Used React Router's `location.state` to pass the full food object during navigation, with a fallback default object — supporting both programmatic navigation and direct URL access.

---

## 10. Performance & Scalability Considerations

### Current Performance Strengths
- **Vite** provides near-instant HMR and optimized production bundles with automatic tree-shaking and code splitting
- **Redux selectors** ensure components only re-render when their specific slice of state changes
- **Recharts** renders resolution-independent SVG charts with minimal overhead
- **Intersection Observer API** on the landing page defers scroll animations until elements enter the viewport
- **Tailwind CSS 4** with PostCSS produces minimal, purged CSS bundles in production

### Scalability Path
- **Replace mock data with a REST API or Firebase Firestore** — The async thunk pattern is already in place; extending it to all data slices requires minimal architectural change
- **Route-level code splitting** — React Router + Vite supports `React.lazy()` + `Suspense` for on-demand chunk loading as the app grows
- **Role-Based Access Control (RBAC)** — The auth slice already includes a `role` field; routing guards can restrict module access per role
- **Virtualized lists** — As student/teacher records scale to thousands, `react-virtual` can replace flat mapped lists for performant rendering without DOM bloat
- **Pagination** — The reusable `Pagination` component makes backend-driven pagination straightforward to wire in

---

## 11. Security Considerations

### Authentication
- Backed entirely by **Firebase Authentication** — a Google-managed service with industry-standard security, rate limiting, and brute-force protection
- Supports **Email/Password** and **Google OAuth 2.0**, reducing reliance on weak credential patterns
- Auth state initialized via Firebase's `onAuthStateChanged` listener, preventing stale session issues

### Credential Handling
- Firebase configuration keys are **publishable client-side keys** scoped by Firebase Security Rules — not secret server credentials
- For production: move all Firebase config values to `.env.local` using Vite's `import.meta.env` to keep them out of version control

### Input Handling
- All form inputs use controlled React components with `onChange` handlers
- No `innerHTML`, `dangerouslySetInnerHTML`, or `eval()` patterns detected — mitigating XSS risk
- Form submissions use `e.preventDefault()` consistently

### Data Integrity
- Redux reducers use ID-based lookups (`findIndex`, `filter`) before mutating state, preventing orphaned or duplicate records

### Recommended Improvements for Production
- Implement `<ProtectedRoute>` to redirect unauthenticated users away from dashboard routes
- Add Firebase Firestore Security Rules when a database is introduced
- Add server-side input validation and sanitization
- Move Firebase config to environment variables

---

## 12. Future Improvements

### High Priority
- **Protected Routes** — `<ProtectedRoute>` HOC using the Redux `isAuthenticated` flag to guard all dashboard routes
- **Firebase Firestore Integration** — Replace `mockData` initialState with real-time Firestore reads/writes for data persistence
- **Environment Variables** — Move Firebase config to `.env.local`

### Feature Enhancements
- **Role-Based Access Control** — Differentiate Admin, Teacher, and Parent views using the existing `role` field in `authSlice`
- **Notifications System** — Real-time push notifications via Firebase Cloud Messaging (FCM) for fee reminders and attendance alerts
- **Exam & Grades Module** — Record exam scores, generate report cards, and visualize grade distributions
- **Parent Portal** — Dedicated view for parents to monitor attendance, grades, fee status, and communications
- **PDF / Excel Export** — Export reports and data tables using `jsPDF` or `SheetJS`
- **Dark Mode** — System-preference-aware dark theme using Tailwind's `dark:` variant
- **Library Management** — Book inventory, borrowing records, and overdue notifications
- **Transport Tracking** — Real-time GPS bus tracking (referenced on the landing page as a planned feature)

### Technical Improvements
- **TanStack Query** — Replace manual async thunks with React Query for automatic caching, background refetching, and optimistic updates
- **Automated Testing** — Unit tests for Redux slices with Jest + RTL; E2E tests with Playwright or Cypress
- **PWA Support** — Service worker + web manifest for offline access and mobile home screen installation
- **Storybook** — Visual documentation and testing of the reusable component library

---

## 13. Developer Learnings

Building EduCore provides deep, practical experience across modern frontend engineering:

- **React 19** — Functional components, hooks (`useState`, `useEffect`, `useRef`, `useParams`, `useNavigate`, `useLocation`), and composition patterns
- **Redux Toolkit** — Slice creation, `createAsyncThunk`, `extraReducers` for cross-slice communication, and selector-based optimized re-renders
- **Firebase Authentication** — Real-world OAuth with email/password and Google provider flows; handling serialization in Redux
- **React Router v7** — Nested layouts via `<Outlet>`, dynamic route segments (`:id`), programmatic navigation, and `location.state` passing
- **Responsive Design** — Mobile-first layout strategies, `fixed` + `translate-x` sidebar patterns, backdrop overlays, and body scroll locking
- **Data Visualization** — Interactive charts with Recharts (BarChart, LineChart, ResponsiveContainer, custom tooltips)
- **Component Architecture** — Clean separation of pages (route orchestrators) from components (presentational units); shared utilities like `Pagination`
- **Animations** — Scroll-triggered animations with Intersection Observer API; Framer Motion for declarative entrance animations
- **Mock-First Development** — Designing full UI and state layer against static seed data before backend integration
- **Performance Patterns** — Memoized selectors, conditional re-renders, viewport-based lazy rendering

---

## 14. Resume Description

> **EduCore – School Management System** *(React 19 · Redux Toolkit · Firebase · Tailwind CSS 4 · Recharts)*
>
> Designed and developed a full-featured, responsive school administration SPA from scratch. The platform consolidates student and teacher management, multi-status attendance tracking, financial reporting, event scheduling, cafeteria management, and internal messaging into a single dashboard. Implemented Firebase Email/Password and Google OAuth authentication with Redux-managed state, cross-slice activity logging via `extraReducers`, and interactive data visualizations using Recharts. Delivered a mobile-responsive layout with smooth animated transitions, paginated data tables, and a clean component architecture ready for backend integration.

---

## 15. Getting Started

### Prerequisites

- Node.js >= 18.x
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/school-management-system.git
cd school-management-system

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

### Environment Variables

For production, create a `.env.local` file at the project root and move Firebase credentials out of `firebase.js`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## Project Metadata

| Property | Value |
|---|---|
| **Project Name** | EduCore – School Management System |
| **Version** | 0.0.0 |
| **Type** | Frontend SPA (React) |
| **Authentication** | Firebase Auth (Email + Google OAuth) |
| **State Management** | Redux Toolkit |
| **Styling** | Tailwind CSS 4 |
| **Build Tool** | Vite 7 |
| **Primary Language** | JavaScript (ES Modules) |
| **Case Study Date** | March 2026 |

---



