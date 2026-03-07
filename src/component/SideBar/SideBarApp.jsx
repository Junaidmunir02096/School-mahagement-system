import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faXmark } from "@fortawesome/free-solid-svg-icons";
import HomeIcon from "../../assets/SideBarIcone/Home.png";
import StudentIcon from "../../assets/SideBarIcone/Student.png";
import TeacherIcon from "../../assets/SideBarIcone/Teacher.png";
import ClassesIcon from "../../assets/SideBarIcone/Calendar.png";
import FinanaceIcon from "../../assets/SideBarIcone/Finance.png";
import FoodIcon from "../../assets/SideBarIcone/Food.png";
import UserIcon from "../../assets/SideBarIcone/User.png";
import ChatIcon from "../../assets/SideBarIcone/Chat.png";
import LatestActivityIcon from "../../assets/SideBarIcone/Activity.png";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SideBarApp = ({ onClose }) => {
    const [active, setActive] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { label: 'Dashbord', path: '/dashboard', icon: <img src={HomeIcon} alt="Home" className="w-[20px] h-[20px]" /> },
        { label: 'Students', path: '/students', icon: <img src={StudentIcon} alt="Student" className="w-[20px] h-[20px]" /> },
        { label: 'Teachers', path: '/teachers', icon: <img src={TeacherIcon} alt="Teacher" className="w-[20px] h-[20px]" /> },
        { label: 'Attendance', path: '/attendance', icon: <FontAwesomeIcon icon={faClipboardList} className="text-[20px]" /> },
        { label: 'Event', path: '/event', icon: <img src={ClassesIcon} alt="Classes" className="w-[20px] h-[20px]" /> },
        { label: 'Finance', path: '/finance', icon: <img src={FinanaceIcon} alt="Classes" className="w-[20px] h-[20px]" /> },
        { label: 'Food', path: '/food', icon: <img src={FoodIcon} alt="Classes" className="w-[20px] h-[20px]" /> },
        { label: 'User', path: '/user', icon: <img src={UserIcon} alt="Classes" className="w-[20px] h-[20px]" /> },
        { label: 'Chat', path: '/chat', icon: <img src={ChatIcon} alt="Classes" className="w-[20px] h-[20px]" /> },
        { label: 'Latest Activity', path: '/latest-activity', icon: <img src={LatestActivityIcon} alt="Classes" className="w-[20px] h-[20px]" /> },
    ]

    // Set active state based on current path
    useEffect(() => {
        const currentItem = menuItems.find(item => item.path === location.pathname);
        if (currentItem) {
            setActive(currentItem.label);
        }
    }, [location.pathname]);

    return (
    <div className="bg-[#4D44B5] h-screen w-[310px] flex flex-col overflow-y-auto">
        <div className="flex p-[20px] justify-center items-center gap-8 relative">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-lg font-bold relative overflow-hidden shine" style={{ background: "linear-gradient(135deg, #4D44B5, #7C74D8)" }}>E</div>
            <span className="text-xl font-bold" style={{ fontFamily: "Sora, sans-serif", color: "#fff" }}>EduCore</span>
            {/* Close button — only visible on mobile */}
            <button
              onClick={onClose}
              className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close sidebar"
            >
              <FontAwesomeIcon icon={faXmark} className="text-lg" />
            </button>
          </div>
            <div className="flex flex-col w-full mt-2 mb-[40px] flex-1 overflow-y-auto">
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
                                <span className="mr-4 ">{item.icon}</span>
                                <span className="text-[15px] font-Poppins ml-[10px]">{item.label}</span>
                            </div>

                        </div>
                    );
                })}
            </div>
                <div className="flex flex-col gap-[10px] pb-6">
                    <p className="text-[15px] text-[#fff] font-Poppins ml-[10px]">Akademi - School Admission Dashboard</p>
                    <p className="text-[13px] font-[100] text-[#fff] font-Poppins ml-[10px]">Made with ♥ by Peterdraw</p>
                </div>
    </div>
    )
}

export default SideBarApp;