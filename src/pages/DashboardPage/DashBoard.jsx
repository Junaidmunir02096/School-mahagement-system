
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import StudentIcon from "../../assets/SideBarIcone/Student.png";
import EventIcon from "../../assets/SideBarIcone/Calendar.png";
import FoodIcon from "../../assets/SideBarIcone/Food.png";
import SchoolPerformanceChart from "../../component/DashBoard/SchoolPerformanceChart";
import SchoolFinanceChart from "../../component/DashBoard/SchoolFinanceChart";
import BasicDateCalendar from "../../component/DashBoard/SchoolCalendar"
import UnpaidStudents from "../../component/DashBoard/UnpaidStudents"
import { useSelector } from "react-redux";
import { selectStudentCount } from "../../store/slices/studentsSlice";
import { selectTeacherCount } from "../../store/slices/teachersSlice";
import { selectEventCount } from "../../store/slices/eventsSlice";

const DashBoard = () => {
    const studentCount = useSelector(selectStudentCount);
    const teacherCount = useSelector(selectTeacherCount);
    const eventCount   = useSelector(selectEventCount);
    return (
        <div className="w-full h-[100vh] overflow-y-scroll bg-[#F3F4FF] p-[20px]">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-2.5">
                <h1 className="text-2xl sm:text-[36px] font-[700] p-[20px] text-[#4D44B5]">Dashboard</h1>
                <div className="flex items-center bg-[#fff] rounded-full px-4 py-[10px] w-full sm:w-[300px]">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE]" />
                    <input type="text" placeholder="Search here..." className="outline-none border-none ml-2 w-full text-[#A098AE] placeholder-[#A098AE] bg-transparent" />
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full bg-[#fff] rounded-[20px] p-4">
                <div className="flex gap-4 items-center p-2">
                    <div className="bg-[#4D44B5] text-[#fff] h-[40px] w-[40px] flex-shrink-0 flex items-center justify-center rounded-full">
                        <img src={StudentIcon} alt="Student" className="h-[30px] w-[30px] p-[2px] brightness-0 invert" />
                    </div>
                    <div className="flex flex-col gap-[3px]">
                        <p className="text-[#A098AE] text-[13px] sm:text-[15px] font-[300]">Students</p>
                        <h1 className="text-base sm:text-lg font-bold">{studentCount}</h1>
                    </div>
                </div>
                <div className="flex gap-4 items-center p-2">
                    <div className="bg-[#FB7D5B] text-[#fff] h-[40px] w-[40px] flex-shrink-0 flex items-center justify-center rounded-full">
                        <img src={StudentIcon} alt="Teacher" className="h-[30px] w-[30px] p-[2px] brightness-0 invert" />
                    </div>
                    <div className="flex flex-col gap-[3px]">
                        <p className="text-[#A098AE] text-[13px] sm:text-[15px] font-[300]">Teachers</p>
                        <h1 className="text-base sm:text-lg font-bold">{teacherCount}</h1>
                    </div>
                </div>
                <div className="flex gap-4 items-center p-2">
                    <div className="bg-[#FCC43E] h-[40px] w-[40px] flex-shrink-0 flex items-center justify-center rounded-full">
                        <img src={EventIcon} alt="Event" className="h-[30px] w-[30px] p-[2px] brightness-0 invert" />
                    </div>
                    <div className="flex flex-col gap-[3px]">
                        <p className="text-[#A098AE] text-[13px] sm:text-[15px] font-[300]">Events</p>
                        <h1 className="text-base sm:text-lg font-bold">{eventCount}</h1>
                    </div>
                </div>
                <div className="flex gap-4 items-center p-2">
                    <div className="bg-[#4D44B5] text-[#fff] h-[40px] w-[40px] flex-shrink-0 flex items-center justify-center rounded-full">
                        <img src={FoodIcon} alt="Food" className="h-[30px] w-[30px] p-[2px] brightness-0 invert" />
                    </div>
                    <div className="flex flex-col gap-[3px]">
                        <p className="text-[#A098AE] text-[13px] sm:text-[15px] font-[300]">Foods</p>
                        <h1 className="text-base sm:text-lg font-bold">30k</h1>
                    </div>
                </div>
            </div>
            <div className="w-full min-h-[300px] bg-[#fff] mt-[20px] rounded-[20px]">
                <SchoolPerformanceChart title="School Performance" />
            </div>
            <div className="flex flex-col md:flex-row  justify-between">
                <div className="md:w-[50%] w-full min-h-[300px] bg-[#fff] mt-[20px] rounded-[20px]">
                    <SchoolFinanceChart />
                </div>
                <div className="md:w-[45%] w-full mt-[20px] bg-[#fff] rounded-[20px] flex items-center justify-center">
                    <BasicDateCalendar />
                </div>
            </div>
            <div>
                <UnpaidStudents />  
            </div>
        </div>
    )
}

export default DashBoard;
