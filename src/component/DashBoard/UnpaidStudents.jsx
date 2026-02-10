import { useState } from "react";
import {FaEllipsisH } from "react-icons/fa";
import UserIcon from "../../assets/SideBarIcone/User.png";
import PrintIcon from "../../assets/SideBarIcone/print.png"
import Pagination from "../commonComponent/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const studentsData = [
    { name: "Samantha William", id: "123456789", class: "VII A", amount: 50036 },
    { name: "Tony Soap", id: "123456789", class: "VII A", amount: 50036 },
    { name: "Jordan Nico", id: "123456789", class: "VII A", amount: 50036 },
    { name: "Karen Hope", id: "123456789", class: "VII A", amount: 50036 },
    { name: "Nadila Adja", id: "123456789", class: "VII A", amount: 50036 },
    { name: "Alex John", id: "123456789", class: "VII A", amount: 50036 },
    { name: "Chris Nolan", id: "123456789", class: "VII A", amount: 50036 },
    { name: "Sara Khan", id: "123456789", class: "VII A", amount: 50036 },
];

export default function UnpaidStudents() {
    const [page, setPage] = useState(1);
    const perPage = 5;

    // const 
    const start = (page - 1) * perPage;
    const currentData = studentsData.slice(start, start + perPage);
    const totalPages = Math.ceil(studentsData.length / perPage);

    return (
        <div className="bg-[#fff] rounded-[20px] p-[2vw] mt-[20px] shadow-sm">

            {/* Header */}
            <h2 className="text-xl font-bold text-[#303972] mb-[3vh]">
                Unpaid Student Intuition
            </h2>

            {/* List */}
            <div className="flex flex-col gap-[1vh]">
                {currentData.map((student, index) => (
                    <div
                        key={index}
                        className="flex items-center p-[10px] justify-between"
                    >
                        {/* Name Section */}
                        <div className="flex items-center gap-[15px] w-[25%]">
                            <span className="h-[40px] w-[40px] rounded-full bg-[#C1BBEB]"></span>
                             {/* Avatar Placeholder */}
                            <p className="font-bold text-[#303972] text-[15px]">
                                {student.name}
                            </p>
                        </div>

                        {/* ID Section */}
                        <div className="w-[20%] text-left">
                            <p className="font-bold text-[#4D44B5]">
                                ID {student.id}
                            </p>
                        </div>

                        {/* Class Section */}
                        <div className="flex items-center gap-[15px] w-[15%]">
                            <div className="w-[40px] h-[40px] bg-[#FB7D5B] rounded-full flex items-center justify-center text-white text-lg">
                                <img src={UserIcon} alt="UserIcon" className="w-[25px] brightness-0 invert h-[25px]" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[13px] text-[#A098AE]">Class</p>
                                <p className="font-[600] text-[#303972]">
                                    {student.class}
                                </p>
                            </div>
                        </div>

                        {/* Amount Section */}
                        <div className="w-[15%] font-[600] text-[#303972]">
                            $ {student.amount.toLocaleString()}
                        </div>

                        {/* Actions Section */}
                        <div className="flex items-center justify-evenly gap-6 text-[#A098AE] w-[10%] pr-4">
                            <img src={PrintIcon} alt="PrintIcon" className="cursor-pointer hover:text-[#303972]" />
                            <FaEllipsisH className="text-[20px] cursor-pointer hover:text-[#303972]" />
                        </div>
                    </div>
                ))}
            </div>

                {/* Pagination */}
                <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        totalItems={studentsData.length}
                        itemsPerPage={perPage}
                        onPageChange={setPage}
                    />
        </div>
    );
}
