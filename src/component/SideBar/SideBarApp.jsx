// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHouse } from "@fortawesome/free-regular-svg-icons";
import HomeIcon from "../../assets/SideBarIcone/Home.png";
import StudentIcon from "../../assets/SideBarIcone/Student.png";
import TeacherIcon from "../../assets/SideBarIcone/Teacher.png";
import ClassesIcon from "../../assets/SideBarIcone/Calendar.png";
import FinanaceIcon from "../../assets/SideBarIcone/Finance.png";
import FoodIcon from "../../assets/SideBarIcone/Food.png";
import UserIcon from "../../assets/SideBarIcone/User.png";
import ChatIcon from "../../assets/SideBarIcone/Chat.png";
import LatestActivityIcon from "../../assets/SideBarIcone/Activity.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBarApp = () => {
    const [active, setActive] = useState('Dashbord');
    const navigate = useNavigate();

    const menuItems = [
        { label: 'Dashbord', path: '/dashboard', icon: <img src={HomeIcon} alt="Home" className="w-[20px] h-[20px]" /> },
        { label: 'Students', path: '/students', icon: <img src={StudentIcon} alt="Student" className="w-[20px] h-[20px]" /> },
        { label: 'Teachers', path: '/teachers', icon: <img src={TeacherIcon} alt="Teacher" className="w-[20px] h-[20px]" /> },
        { label: 'Event', path: '/event', icon: <img src={ClassesIcon} alt="Classes" className="w-[20px] h-[20px]" /> },
        { label: 'Finance', path: '/finance', icon: <img src={FinanaceIcon} alt="Classes" className="w-[20px] h-[20px]" /> },
        { label: 'Food', path: '/food', icon: <img src={FoodIcon} alt="Classes" className="w-[20px] h-[20px]" /> },
        { label: 'User', path: '/user', icon: <img src={UserIcon} alt="Classes" className="w-[20px] h-[20px]" /> },
        { label: 'Chat', path: '/chat', icon: <img src={ChatIcon} alt="Classes" className="w-[20px] h-[20px]" /> },
        { label: 'Latest Activity', path: '/latest-activity', icon: <img src={LatestActivityIcon} alt="Classes" className="w-[20px] h-[20px]" /> },
    ]

    return (
        <div className="bg-[#4D44B5] h-screen w-[310px]">
            <p className="text-[36px] font-[700] text-center p-[20px] text-[#fff] ">Akademi </p>
            <div className="flex flex-col  w-full mt-8 mb-[40px]">
                {menuItems.map((item) => {
                    const isActive = active === item.label;
                    return (
                        <div
                            key={item.label}
                            className="flex justify-end w-full"
                            onClick={() => {
                                setActive(item.label);
                                navigate(item.path);
                            }}
                        >
                            {/* Inner container: 80% width + white background */}
                            <div
                                className={`w-[80%] cursor-pointer rounded-tl-[25px] rounded-bl-[25px] flex items-center p-[10px] mt-[10px] transition-colors duration-300
                                ${isActive ? 'bg-[#fff] text-[#4D44B5]' : 'text-[#C1BBEB] text-[#4D44B5]'}`}
                            >
                                <span className="text-3xl mr-4 ">{item.icon}</span>
                                <span className="text-[15px] font-Poppins ml-[10px]">{item.label}</span>
                            </div>

                        </div>
                    );
                })}
            </div>
                <div className="flex flex-col gap-[10px]">
                    <p className="text-[15px] text-[#fff] font-Poppins ml-[10px]">Akademi - School Admission Dashboard</p>
                    <p className="text-[13px] font-[100] text-[#fff] font-Poppins ml-[10px]">Made with ♥ by Peterdraw</p>
                </div>
        </div>
    )
}

export default SideBarApp;