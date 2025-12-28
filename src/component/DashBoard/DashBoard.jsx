
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import StudentIcon from "../../assets/SideBarIcone/Student.png";
import EventIcon from "../../assets/SideBarIcone/Calendar.png";
import FoodIcon from "../../assets/SideBarIcone/Food.png";
import SchoolPerformanceChart from "./SchoolPerformanceChart";
import SchoolFinanceChart from "./SchoolFinanceChart";
import BasicDateCalendar from "./SchoolCalendar"
import UnpaidStudents from "./UnpaidStudents"
const DashBoard = () => {
    return (
        <div className="w-full h-[100vh] overflow-y-scroll bg-[#F3F4FF] p-[20px]">
            <div className="flex justify-between items-center">
                <h1 className="text-[36px] font-[700] text-center p-[20px] text-[#4D44B5]">Dashboard</h1>
                <div className="flex items-center   bg-[#fff] rounded-full px-4 py-[10px] w-[300px]">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE] ml-[20px]" />
                    <input type="text" placeholder="Search here..." className="outline-none ml-[10px] border-none ml-2 w-full text-[#A098AE] placeholder-[#A098AE]" />
                </div>
            </div>
            <div className="flex justify-evenly min-h-[112px] rounded-[20px] flex-wrap   gap-[20px] w-full bg-[#fff]">
                <div className="flex gap-[20px] items-center ">
                    <div className="bg-[#4D44B5] text-[#fff] h-[40px] w-[40px] flex items-center justify-center rounded-full ">
                        <img src={StudentIcon} alt="Student" className="h-[30px] w-[30px] text-[10px] p-[2px] rounded-full brightness-0 invert" />
                    </div>
                    <div className="flex flex-col gap-[3px]">
                        <p className="text-[#A098AE] text-[15px] font-[300]">Students</p>
                        <h1>935</h1>
                    </div>
                </div>
                <div className="flex gap-[20px] items-center ">
                    <div className="bg-[#FB7D5B] text-[#fff] h-[40px] w-[40px] flex items-center justify-center rounded-full ">
                        <img src={StudentIcon} alt="Student" className="h-[30px]  w-[30px] text-[10px] p-[2px] rounded-full brightness-0 invert" />
                    </div>
                    <div className="flex flex-col gap-[3px]">
                        <p className="text-[#A098AE] text-[15px] font-[300]">Teachers</p>
                        <h1>735</h1>
                    </div>
                </div>
                <div className="flex gap-[20px] items-center ">
                    <div className="bg-[#FCC43E] h-[40px] w-[40px] flex items-center justify-center rounded-full ">
                        <img src={EventIcon} alt="Student" className="h-[30px] w-[30px] text-[10px] p-[2px] rounded-full brightness-0 invert" />
                    </div>
                    <div className="flex flex-col gap-[3px]">
                        <p className="text-[#A098AE] text-[15px] font-[300]">Events</p>
                        <h1>40</h1>
                    </div>
                </div>
                <div className="flex gap-[20px] items-center ">
                    <div className="bg-[#4D44B5] text-[#fff] h-[40px] w-[40px] flex items-center justify-center rounded-full ">
                        <img src={FoodIcon} alt="Student" className="h-[30px] w-[30px] text-[10px] p-[2px] rounded-full brightness-0 invert" />
                    </div>
                    <div className="flex flex-col gap-[3px]">
                        <p className="text-[#A098AE] text-[15px] font-[300]">Foods</p>
                        <h1>30k</h1>
                    </div>
                </div>
                <div>
                </div>
            </div>
            <div className="w-full min-h-[300px] bg-[#fff] mt-[20px] rounded-[20px]">
                <SchoolPerformanceChart />
            </div>
            <div className="flex justify-between">
                <div className="w-[50%] min-h-[300px] bg-[#fff] mt-[20px] rounded-[20px]">
                    <SchoolFinanceChart />
                </div>
                <div className="w-[45%] mt-[20px] bg-[#fff] rounded-[20px] flex items-center justify-center">
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
