
import Sidebar from "./component/SideBar/SideBarApp";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./component/DashBoard/DashBoard";
import StudentComp from "./component/Student/StudentComp";
import TeacherComp from "./component/Teacher/TeacherComp";
import EventComp from "./component/Event/EventComp";
import FinanceComp from "./component/Finance/FinanceComp";
import FoodComp from "./component/Food/FoodComp";
import UserComp from "./component/User/UserComp";
import ChatComp from "./component/Chat/ChatPage";
import LatestActivityComp from "./component/LatestActivity/LatestActivityComp";
import FoodDetails from "./component/Food/components/FoodDetails/FoodDetails";
import AddTeacher from "./component/Teacher/AddTeacher/AddTeacher"; 
import AddStudent from "./component/Student/AddStudent/AddStudent";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/students" element={<StudentComp />} />
          <Route path="/students/add-student" element={<AddStudent />} />
          <Route path="/teachers" element={<TeacherComp />} />
          <Route path="/teachers/add-teacher" element={<AddTeacher />} />
          <Route path="/event" element={<EventComp />} />
          <Route path="/finance" element={<FinanceComp />} />
          <Route path="/food" element={<FoodComp />} />
          <Route path="/food-details/:id" element={<FoodDetails/>}/>
          <Route path="/user" element={<UserComp />} />
          <Route path="/chat" element={<ChatComp />} />
          <Route path="/latest-activity" element={<LatestActivityComp />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;