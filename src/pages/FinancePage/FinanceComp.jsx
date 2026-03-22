import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import StudentIcon from "../../assets/SideBarIcone/Student.png";
import FinanaceIcon from "../../assets/SideBarIcone/Finance.png";
import SchoolPerformanceChart from "../../component/DashBoard/SchoolPerformanceChart";
import UnpaidStudents from "../../component/DashBoard/UnpaidStudents";
import SchoolExpense from "../../component/Finance/schoolExpense";
// import './FinanceComp.css';

const FinanceComp = () => {
    return (
        <div className="w-full h-[100vh] overflow-y-scroll bg-[#F3F4FF] p-[20px]">
            <div className="flex justify-between items-center">
                <h1 className="text-[36px] font-[700] text-center p-[20px] text-[#4D44B5]">Finance</h1>
                <div className="flex items-center   bg-[#fff] rounded-full px-4 py-[10px] w-[300px]">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE] ml-[20px]" />
                    <input type="text" placeholder="Search here..." className="outline-none ml-[10px] border-none ml-2 w-full text-[#A098AE] placeholder-[#A098AE]" />
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 w-full">
                {/* Total Students Card */}
                <div className="flex bg-[#fff] p-3 sm:p-[15px] rounded-[10px] gap-3 sm:gap-[20px] items-center flex-wrap sm:flex-nowrap">
                    <div className="bg-[#4D44B5] text-[#fff] h-[40px] w-[40px] flex-shrink-0 flex items-center justify-center rounded-full">
                        <img src={StudentIcon} alt="Student" className="h-[30px] w-[30px] text-[10px] p-[2px] rounded-full brightness-0 invert" />
                    </div>
                    <div className="flex flex-col gap-[3px] flex-1 min-w-0">
                        <p className="text-[#A098AE] text-xs sm:text-[15px] font-[300] truncate">Students</p>
                        <h1 className="text-lg sm:text-2xl font-bold truncate">935</h1>
                        <p className="text-[#A098AE] text-xs sm:text-sm font-medium truncate"><span className="text-[#4CBC9A]">10%</span> than last month</p>
                    </div>
                </div>

                {/* Total Teachers Card */}
                <div className="flex bg-[#fff] p-3 sm:p-[15px] rounded-[10px] gap-3 sm:gap-[20px] items-center flex-wrap sm:flex-nowrap">
                    <div className="bg-[orange] text-[#fff] h-[40px] w-[40px] flex-shrink-0 flex items-center justify-center rounded-full">
                        <img src={StudentIcon} alt="Student" className="h-[30px] w-[30px] text-[10px] p-[2px] rounded-full brightness-0 invert" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[#A098AE] text-xs sm:text-sm font-medium mb-1 truncate">Total Teachers</p>
                        <h2 className="text-[#303972] text-2xl sm:text-4xl font-bold mb-2 ">754</h2>
                        <p className="text-[#FB7D5B] text-xs sm:text-sm font-medium ">-0,5% than last month</p>
                    </div>
                </div>

                {/* School Balance Card */}
                <div className="flex bg-[#fff] p-3 sm:p-[15px] rounded-[10px] gap-3 sm:gap-[20px] items-center flex-wrap sm:flex-nowrap sm:col-span-2 lg:col-span-1">
                    <div className="bg-[orange] text-[#fff] h-[40px] w-[40px] flex-shrink-0 flex items-center justify-center rounded-full">
                        <img src={FinanaceIcon} alt="Finance" className="h-[30px] w-[30px] text-[10px] p-[2px] rounded-full brightness-0 invert" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[#A098AE] text-xs sm:text-sm font-medium mb-1 ">School Balance</p>
                        <h2 className="text-[#303972] text-2xl sm:text-4xl font-bold mb-2 ">$123,456</h2>
                        <p className="text-[#4CBC9A] text-xs sm:text-sm font-medium ">+23% than last month</p>
                    </div>
                </div>
            </div>
            <div className="w-full min-h-[300px] bg-[#fff] mt-[20px] rounded-[20px]">
                <SchoolPerformanceChart title="Balance Analytics" />
            </div>
            <div className="responsive-left">
                <UnpaidStudents  />
            </div>
            <div className="w-full min-h-[500px] overflow-x-auto md:overflow-x-visible bg-[#fff] mt-[20px] rounded-[20px]">
                <SchoolExpense />
            </div>
        </div>
    )
}

export default FinanceComp;