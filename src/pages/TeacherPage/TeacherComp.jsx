import SearchHeader from "../../component/commonComponent/searchNavbar/searchHeader";
import Pagination from "../../component/commonComponent/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllTeachers } from "../../store/slices/teachersSlice";

const TeacherComp = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Read from Redux store instead of static mockData
    const teacherData = useSelector(selectAllTeachers);
    // Pagination logic
    const totalPages = Math.ceil(teacherData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTeachers = teacherData.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleContact = (type, value) => {
        if (type === 'phone') {
            window.location.href = `tel:${value}`;
        } else if (type === 'email') {
            window.location.href = `mailto:${value}`;
        }
    };

    return (
            <div className="w-full h-[100vh] overflow-y-scroll bg-[#F3F4FF] p-[20px]">
            <h1 className="text-[36px] font-[700] p-[20px] text-[#4D44B5]">Teacher</h1>
            <SearchHeader title={'Add Teacher'}  />

            {/* Teacher Cards Grid */}
            <div className="bg-white rounded-[20px] mt-[20px] p-[30px]">
                <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
                    {currentTeachers.map((teacher) => (
                        <div 
                            key={teacher.id} 
                            className="bg-white rounded-[20px] p-[20px] border border-[#E5E5E5] hover:shadow-lg transition-all duration-300 flex flex-col items-center relative"
                        >
                            {/* Three dots menu */}
                            <div className="absolute cursor-pointer top-[15px] right-[15px] text-[#A098AE] hover:text-[#4D44B5] transition-colors">
                                <FontAwesomeIcon icon={faEllipsis} className="text-[18px]" />
                            </div>

                            {/* Avatar */}
                            <div className={`w-[100px] h-[100px] rounded-full ${teacher.avatarColor} flex items-center justify-center mb-[15px]`}>
                                <span className="text-white text-[28px] font-[600]">{teacher.avatar}</span>
                            </div>

                            {/* Teacher Name */}
                            <h3 className="text-[#303972] text-[18px] font-[600] mb-[5px] text-center">
                                {teacher.name}
                            </h3>

                            {/* Subject */}
                            <p className="text-[#A098AE] text-[14px] mb-[20px] text-center">
                                {teacher.subject}
                            </p>

                            {/* Contact Icons */}
                            <div className="flex gap-[15px]">
                                <button 
                                    onClick={() => handleContact('phone', teacher.phone)}
                                    className="w-[40px] h-[40px] rounded-full bg-[#4D44B5] flex items-center justify-center hover:bg-[#3d3591] transition-colors"
                                >
                                    <FontAwesomeIcon icon={faPhone} className="text-white text-[16px]" />
                                </button>
                                <button 
                                    onClick={() => handleContact('email', teacher.email)}
                                    className="w-[40px] h-[40px] rounded-full bg-[#4D44B5] flex items-center justify-center hover:bg-[#3d3591] transition-colors"
                                >
                                    <FontAwesomeIcon icon={faEnvelope} className="text-white text-[16px]" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={teacherData.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}

export default TeacherComp;