import SearchHeader from "../../../shared/components/SearchHeader";
import Pagination from "../../../shared/components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllStudents } from "../store/studentsSlice";

const StudentComp = () => {
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Read from Redux store instead of static mockData
    const allStudents = useSelector(selectAllStudents);

    // Pagination logic
    const totalPages = Math.ceil(allStudents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentStudents = allStudents.slice(startIndex, endIndex);

    // Handle checkbox selection
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedStudents(currentStudents.map(student => student.id));
        } else {
            setSelectedStudents([]);
        }
    };

    const handleSelectStudent = (studentId) => {
        if (selectedStudents.includes(studentId)) {
            setSelectedStudents(selectedStudents.filter(id => id !== studentId));
        } else {
            setSelectedStudents([...selectedStudents, studentId]);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setSelectedStudents([]);
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
            <h1 className="text-[36px] font-[700] p-[20px] text-[#4D44B5]">Student</h1>
            <SearchHeader title={'Add Student'} />

            <div className="bg-white rounded-[20px] mt-[20px] p-[20px]">
                <div className="overflow-x-auto">
                <table className="w-full min-w-[945px]">
                    <thead>
                        <tr className="border-b border-[#E5E5E5]">
                            <th className="text-left py-[20px] px-[15px] w-[50px]">
                                <input
                                    type="checkbox"
                                    checked={selectedStudents.length === currentStudents.length}
                                    onChange={handleSelectAll}
                                    className="w-[18px] h-[18px] cursor-pointer accent-[#4D44B5]"
                                />
                            </th>
                            <th className="text-left py-[20px] px-[15px] text-[#A098AE] font-[600] text-[14px]">Name</th>
                            <th className="text-left py-[20px] px-[15px] text-[#A098AE] font-[600] text-[14px]">ID</th>
                            <th className="text-left py-[20px] px-[15px] text-[#A098AE] font-[600] text-[14px]">Date</th>
                            <th className="text-left py-[20px] px-[15px] text-[#A098AE] font-[600] text-[14px]">Parent Name</th>
                            <th className="text-left py-[20px] px-[15px] text-[#A098AE] font-[600] text-[14px]">City</th>
                            <th className="text-left py-[20px] px-[15px] text-[#A098AE] font-[600] text-[14px]">Contact</th>
                            <th className="text-left py-[20px] px-[15px] text-[#A098AE] font-[600] text-[14px]">Grade</th>
                            <th className="text-left py-[20px] px-[15px] text-[#A098AE] font-[600] text-[14px]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents.map((student) => (
                            <tr key={student.id} className="border-b border-[#E5E5E5] hover:bg-[#F9F9FF] transition-colors">
                                <td className="py-[20px] px-[15px]">
                                    <input
                                        type="checkbox"
                                        checked={selectedStudents.includes(student.id)}
                                        onChange={() => handleSelectStudent(student.id)}
                                        className="w-[18px] h-[18px] cursor-pointer accent-[#4D44B5]"
                                    />
                                </td>
                                <td className="py-[20px] px-[15px]">
                                    <div className="flex items-center gap-[12px]">
                                        <div className="w-[40px] h-[40px] rounded-full bg-[#C1BBEB] flex items-center justify-center text-[#4D44B5] font-[600] text-[14px]">
                                            {student.avatar}
                                        </div>
                                        <span className="text-[#303972] font-[600] text-[14px]">{student.name}</span>
                                    </div>
                                </td>
                                <td className="py-[20px] px-[15px] text-[#4D44B5] font-[600] text-[14px]">{student.studentId}</td>
                                <td className="py-[20px] px-[15px] text-[#A098AE] text-[14px]">{student.date}</td>
                                <td className="py-[20px] px-[15px] text-[#A098AE] text-[14px]">{student.parentName}</td>
                                <td className="py-[20px] px-[15px] text-[#A098AE] text-[14px]">{student.city}</td>
                                <td className="py-[20px] px-[15px]">
                                    <div className="flex gap-[12px]">
                                        <button
                                            onClick={() => handleContact('phone', student.phone)}
                                            className="w-[32px] h-[32px] rounded-full bg-[#4D44B5] flex items-center justify-center text-white hover:bg-[#3d3595] transition-colors cursor-pointer"
                                        >
                                            <FontAwesomeIcon icon={faPhone} className="text-[12px]" />
                                        </button>
                                        <button
                                            onClick={() => handleContact('email', student.email)}
                                            className="w-[32px] h-[32px] rounded-full bg-[#4D44B5] flex items-center justify-center text-white hover:bg-[#3d3595] transition-colors cursor-pointer"
                                        >
                                            <FontAwesomeIcon icon={faEnvelope} className="text-[12px]" />
                                        </button>
                                    </div>
                                </td>
                                <td className="py-[20px] px-[15px]">
                                    <span className={`${student.gradeColor} text-white px-[16px] py-[6px] rounded-full text-[12px] font-[600]`}>
                                        {student.grade}
                                    </span>
                                </td>
                                <td className="py-[20px] px-[15px]">
                                    <button className="text-[#A098AE] hover:text-[#4D44B5] transition-colors">
                                        <FontAwesomeIcon icon={faEllipsis} className="text-[18px]" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={allStudents.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}

export default StudentComp;
