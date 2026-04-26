import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faMagnifyingGlass, faPlus, faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import AddTeacher from "../../features/teachers/components/AddTeacher";
import AddStudent from "../../features/students/components/AddStudent";
import { useNavigate } from "react-router-dom";

const SearchHeader = ({ title }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Newest");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const options = ["Newest", "Oldest", "A–Z", "Z–A"];

    const renderModalContent = () => {
        if (title === "Add Teacher") {
            return <AddTeacher />;
        } else if (title === "Add Student") {
            return <AddStudent />;
        }
        return null;
    };

    return (
        <div>
            <div className="flex flex-wrap justify-between items-center gap-[15px]">
                <div className="flex items-center bg-[#fff] rounded-full px-4 py-[10px] w-full md:w-[300px]">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE] ml-[20px]" />
                    <input type="text" placeholder="Search here..." className="outline-none ml-[10px] border-none ml-2 w-full text-[#A098AE] placeholder-[#A098AE]" />
                </div>
                <div className="flex gap-[20px] items-center w-full md:w-auto justify-between md:justify-end">
                    <div className="relative">
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex bg-transparent text-[16px] font-[500] cursor-pointer items-center gap-[10px] px-[30px] py-[8px] rounded-full border-2 border-[#5B5BE0] text-[#5B5BE0] font-medium hover:bg-[#5B5BE0]/10 transition"
                        >
                            {selected}
                            <FontAwesomeIcon icon={faChevronDown} className="text-[12px]" />
                        </button>
                        {open && (
                            <div className="absolute top-14 left-0 bg-white rounded-xl shadow-lg overflow-hidden w-full z-10">
                                {options.map((opt) => (
                                    <div
                                        key={opt}
                                        onClick={() => {
                                            setSelected(opt);
                                            setOpen(false);
                                        }}
                                        className="px-5 py-3 hover:bg-gray-100 cursor-pointer text-sm"
                                    >
                                        {opt}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => {
                            if (title === "Add Teacher") {
                                navigate("/teachers/add-teacher");
                            } else if (title === "Add Student") {
                                navigate("/students/add-student");
                            }
                        }}
                        className="flex cursor-pointer items-center gap-[10px] px-[20px] py-[8px] rounded-full bg-[#5B5BE0] text-[#fff] text-[16px] font-[500] "
                    >
                        <FontAwesomeIcon className="text-[12px] font-[800]" icon={faPlus} />
                        {title}
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-[20px] p-[30px] max-w-[600px] w-full mx-[20px] relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-[20px] right-[20px] w-[35px] h-[35px] rounded-full bg-[#F3F4FF] flex items-center justify-center hover:bg-[#E8E9FD] transition-colors"
                        >
                            <FontAwesomeIcon icon={faTimes} className="text-[#4D44B5] text-[16px]" />
                        </button>

                        {renderModalContent()}
                    </div>
                </div>
            )}
        </div>
    )
}
export default SearchHeader;