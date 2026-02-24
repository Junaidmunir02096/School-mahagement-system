import { Routes, Route } from "react-router-dom";
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

const AppRoutes = () => {
  return (
        <Routes>
      {/* 🔹 Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* 🔹 Dashboard Layout Routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/students" element={<StudentComp />} />
        <Route path="/students/add-student" element={<AddStudent />} />
        <Route path="/teachers" element={<TeacherComp />} />
        <Route path="/teachers/add-teacher" element={<AddTeacher />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/attendance/mark" element={<MarkAttendance />} />
        <Route path="/attendance/report" element={<AttendanceReport />} />
        <Route path="/event" element={<EventComp />} />
        <Route path="/finance" element={<FinanceComp />} />
        <Route path="/food" element={<FoodComp />} />
        <Route path="/food-details/:id" element={<FoodDetails />} />
        <Route path="/user" element={<UserComp />} />
        <Route path="/chat" element={<ChatComp />} />
        <Route path="/latest-activity" element={<LatestActivityComp />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;