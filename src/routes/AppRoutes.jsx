import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../component/DashboardLayout/DashboardLayout";
import LandingPage from "../pages/LandingPage";

import DashBoard from "../pages/DashboardPage/DashBoard";
import StudentComp from "../pages/StudentPage/StudentComp";
import TeacherComp from "../pages/TeacherPage/TeacherComp";
import EventComp from "../component/Event/EventComp";
import FinanceComp from "../pages/FinancePage/FinanceComp";
import FoodComp from "../pages/FoodPage/FoodComp";
import UserComp from "../component/User/UserComp";
import ChatComp from "../component/Chat/ChatPage";
import LatestActivityComp from "../component/LatestActivity/LatestActivityComp";
import FoodDetails from "../component/Food/FoodDetails";
import AddTeacher from "../component/Teacher/AddTeacher";
import AddStudent from "../component/Student/AddStudent";
import AttendancePage from "../pages/AttendancePage/AttendancePage";
import MarkAttendance from "../pages/AttendancePage/MarkAttendance";
import AttendanceReport from "../pages/AttendancePage/AttendanceReport";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import NotFound from "../pages/NotFound";

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
        <Route path="/dashboard" element={<RouteAccess><DashBoard /></RouteAccess>} />
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