import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUserGraduate, faChalkboardTeacher, faCoins,  } from "@fortawesome/free-solid-svg-icons";
import StudentIcon from "../../assets/SideBarIcone/Student.png";
import FinanaceIcon from "../../assets/SideBarIcone/Finance.png";
import SchoolPerformanceChart from "../DashBoard/SchoolPerformanceChart";
import UnpaidStudents from "../DashBoard/UnpaidStudents";
import SchoolExpense from "./schoolExpense";
import './FinanceComp.css';

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
            <div className="flex w-[100%] gap-[2rem] mt-8">
                {/* Total Students Card */}
                <div className="flex  bg-[#fff] space-between p-[15px] rounded-[10px] w-[30%] gap-[20px] items-center ">
                    <div className="bg-[#4D44B5] text-[#fff] h-[40px] w-[40px] flex items-center justify-center rounded-full ">
                        <img src={StudentIcon} alt="Student" className="h-[30px] w-[30px] text-[10px] p-[2px] rounded-full brightness-0 invert" />
                    </div>
                    <div className="flex flex-col gap-[3px]">
                        <p className="text-[#A098AE] text-[15px] font-[300]">Students</p>
                        <h1>935</h1>
                        <p className="text-[#A098AE] text-sm font-medium"><span className="text-[#4CBC9A]">10%</span> than last month</p>
                    </div>
                </div>

                {/* Total Teachers Card */}

                <div className="flex  bg-[#fff] p-[15px] rounded-[10px] space-between w-[30%] gap-[20px] items-center ">
                    <div className="bg-[orange] text-[#fff] h-[40px] w-[40px] flex items-center justify-center rounded-full ">
                        <img src={StudentIcon} alt="Student" className="h-[30px] w-[30px] text-[10px] p-[2px] rounded-full brightness-0 invert" />
                    </div>
                    <div className="flex-1">
                        <p className="text-[#A098AE] text-sm font-medium mb-1">Total Teachers</p>
                        <h2 className="text-[#303972] text-4xl font-bold mb-2">754</h2>
                        <p className="text-[#FB7D5B] text-sm font-medium">-0,5% than last month</p>
                    </div>
                </div>


                {/* School Balance Card */}

                <div className="flex bg-[#fff] p-[15px] rounded-[10px] w-[40%] space-between gap-[20px] items-center ">
                    <div className="bg-[orange] text-[#fff] h-[40px] w-[40px] flex items-center justify-center rounded-full ">
                        <img src={FinanaceIcon} alt="Student" className="h-[30px] w-[30px] text-[10px] p-[2px] rounded-full brightness-0 invert" />
                    </div>
                    <div className="flex-1">
                        <p className="text-[#A098AE] text-sm font-medium mb-1">School Balance</p>
                        <h2 className="text-[#303972] text-4xl font-bold mb-2">$123,456</h2>
                        <p className="text-[#4CBC9A] text-sm font-medium">+23% than last month</p>
                    </div>

                    {/* Wavy Chart Line */}
                    {/* <div className="absolute bottom-0 right-0 w-1/2 h-20">
                        <svg viewBox="0 0 200 80" className="w-full h-full" preserveAspectRatio="none">
                            <path
                                d="M 0 50 Q 30 30, 60 40 T 120 35 Q 150 30, 180 20 L 200 10"
                                fill="none"
                                stroke="#4CBC9A"
                                strokeWidth="4"
                                opacity="0.6"
                            />
                        </svg>
                    </div> */}
                </div>
            </div>
            <div className="w-full min-h-[300px] bg-[#fff] mt-[20px] rounded-[20px]">
                <SchoolPerformanceChart title="Balance Analytics" />
            </div>
            <div className="responsive-container">
                 <div className="responsive-left">
                     <UnpaidStudents  />
                 </div>
                 <div className="responsive-right">
                     <SchoolExpense />
                 </div>
            </div>
        </div>
    )
}

export default FinanceComp;