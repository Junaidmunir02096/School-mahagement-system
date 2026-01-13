import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faMagnifyingGlass, faPlus, faChevronDown } from "@fortawesome/free-solid-svg-icons";
const SearchHeader = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Newest");

    const options = ["Newest", "Oldest", "A–Z", "Z–A"];
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex items-center   bg-[#fff] rounded-full px-4 py-[10px] w-[300px]">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE] ml-[20px]" />
                    <input type="text" placeholder="Search here..." className="outline-none ml-[10px] border-none ml-2 w-full text-[#A098AE] placeholder-[#A098AE]" />
                </div>
                <div className="flex gap-[20px] items-center">
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
                        onClick={() => alert("Open Add Student Modal")}
                        className="flex cursor-pointer items-center gap-[10px] px-[20px] py-[8px] rounded-full bg-[#5B5BE0] text-[#fff] text-[16px] font-[500] "
                    >
                        <FontAwesomeIcon className="text-[12px] font-[800]" icon={faPlus} />
                        New Student
                    </button>
                </div>
            </div>
        </>
    )
}
export default SearchHeader;