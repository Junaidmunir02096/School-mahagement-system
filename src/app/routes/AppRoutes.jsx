import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import LandingPage from "../../features/landing/pages/LandingPage";

import Dashboard from "../../features/dashboard/pages/Dashboard";
import StudentComp from "../../features/students/pages/StudentComp";
import TeacherComp from "../../features/teachers/pages/TeacherComp";
import EventComp from "../../features/events/components/EventComp";
import FinanceComp from "../../features/finance/pages/FinanceComp";
import FoodComp from "../../features/food/pages/FoodComp";
import UserComp from "../../features/user/pages/UserComp";
import ChatComp from "../../features/chat/pages/ChatPage";
import LatestActivityComp from "../../features/activities/components/LatestActivityComp";
import FoodDetails from "../../features/food/components/FoodDetails";
import AddTeacher from "../../features/teachers/components/AddTeacher";
import AddStudent from "../../features/students/components/AddStudent";
import AttendancePage from "../../features/attendance/pages/AttendancePage";
import MarkAttendance from "../../features/attendance/pages/MarkAttendance";
import AttendanceReport from "../../features/attendance/pages/AttendanceReport";
import Login from "../../features/auth/pages/Login";
import Signup from "../../features/auth/pages/Signup";
import NotFound from "../../features/notfound/pages/NotFound";

const getRouteAccessMode = () => {
  return localStorage.getItem("routeAccessMode") === "limited" ? "limited" : "full";
};

const RouteAccess = ({ children, allowLimited = false }) => {
  const accessMode = getRouteAccessMode();

  if (accessMode === "limited" && !allowLimited) {
    return <Navigate to="/user" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔹 Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* 🔹 Dashboard Layout Routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<RouteAccess><Dashboard /></RouteAccess>} />
        <Route path="/students" element={<RouteAccess><StudentComp /></RouteAccess>} />
        <Route path="/students/add-student" element={<RouteAccess><AddStudent /></RouteAccess>} />
        <Route path="/teachers" element={<RouteAccess><TeacherComp /></RouteAccess>} />
        <Route path="/teachers/add-teacher" element={<RouteAccess><AddTeacher /></RouteAccess>} />
        <Route path="/attendance" element={<RouteAccess><AttendancePage /></RouteAccess>} />
        <Route path="/attendance/mark" element={<RouteAccess><MarkAttendance /></RouteAccess>} />
        <Route path="/attendance/report" element={<RouteAccess><AttendanceReport /></RouteAccess>} />
        <Route path="/event" element={<RouteAccess><EventComp /></RouteAccess>} />
        <Route path="/finance" element={<RouteAccess><FinanceComp /></RouteAccess>} />
        <Route path="/food" element={<RouteAccess allowLimited><FoodComp /></RouteAccess>} />
        <Route path="/food-details/:id" element={<RouteAccess allowLimited><FoodDetails /></RouteAccess>} />
        <Route path="/user" element={<RouteAccess allowLimited><UserComp /></RouteAccess>} />
        <Route path="/chat" element={<RouteAccess allowLimited><ChatComp /></RouteAccess>} />
        <Route path="/latest-activity" element={<RouteAccess allowLimited><LatestActivityComp /></RouteAccess>} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;