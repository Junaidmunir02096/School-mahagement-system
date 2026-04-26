import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faMagnifyingGlass,
    faChevronDown,
    faCheck,
    faXmark,
    faClock,
    faChartBar,
    faPrint,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../../shared/components/Pagination";
import { studentAttendanceReport, classesData } from "../mock/attendanceData";

// ─── Month list ────────────────────────────────────────────────────────────────
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

// ─── % badge helper ────────────────────────────────────────────────────────────
const getPctBadge = (present, total) => {
    const pct = Math.round((present / total) * 100);
    if (pct >= 90) return { pct, style: "bg-[#E8F8F0] text-[#4CAF79]",  label: "Excellent" };
    if (pct >= 75) return { pct, style: "bg-[#FFF8E6] text-[#FCC43E]",  label: "Good"      };
    return              { pct, style: "bg-[#FFF0F0] text-[#FB4D4D]",  label: "At Risk"   };
};

// ─── Small Dropdown ────────────────────────────────────────────────────────────
const FilterDropdown = ({ label, value, options, onChange }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <p className="text-[#A098AE] text-[11px] font-[500] mb-[4px]">{label}</p>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-[10px] bg-[#F3F4FF] px-[16px] py-[9px] rounded-[12px] text-[13px] text-[#303972] font-[500] border-2 border-transparent hover:border-[#4D44B5] transition cursor-pointer min-w-[140px]"
            >
                <span className="flex-1 text-left">{value}</span>
                <FontAwesomeIcon icon={faChevronDown} className="text-[#A098AE] text-[10px]" />
            </button>
            {open && (
                <div className="absolute top-[64px] left-0 bg-white rounded-[12px] shadow-xl border border-[#E5E5E5] z-20 overflow-hidden max-h-[200px] overflow-y-auto min-w-[160px]">
                    {options.map((opt) => (
                        <div
                            key={opt}
                            onClick={() => { onChange(opt); setOpen(false); }}
                            className={`px-[16px] py-[10px] cursor-pointer text-[13px] hover:bg-[#F3F4FF] transition ${
                                value === opt ? "text-[#4D44B5] font-[700] bg-[#EDECFB]" : "text-[#303972]"
                            }`}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const AttendanceReport = () => {
    const navigate = useNavigate();

    const [searchQuery,    setSearchQuery]    = useState("");
    const [selectedClass,  setSelectedClass]  = useState("All Classes");
    const [selectedMonth,  setSelectedMonth]  = useState("February");
    const [currentPage,    setCurrentPage]    = useState(1);
    const itemsPerPage = 8;

    // ── Filtering ──────────────────────────────────────────────────────────────
    const filtered = studentAttendanceReport.filter((s) => {
        const matchClass  = selectedClass === "All Classes" || s.grade === selectedClass;
        const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            s.studentId.toLowerCase().includes(searchQuery.toLowerCase());
        return matchClass && matchSearch;
    });

    // ── Pagination ─────────────────────────────────────────────────────────────
    const totalPages    = Math.ceil(filtered.length / itemsPerPage);
    const startIdx      = (currentPage - 1) * itemsPerPage;
    const currentRows   = filtered.slice(startIdx, startIdx + itemsPerPage);

    const handlePageChange = (page) => setCurrentPage(page);

    // ── School-wide summary stats ──────────────────────────────────────────────
    const totalPresent  = filtered.reduce((s, r) => s + r.present, 0);
    const totalAbsent   = filtered.reduce((s, r) => s + r.absent,  0);
    const totalLate     = filtered.reduce((s, r) => s + r.late,    0);
    const totalDays     = filtered.reduce((s, r) => s + r.total,   0);
    const avgRate       = totalDays > 0 ? ((totalPresent / totalDays) * 100).toFixed(1) : "0.0";

    const perfectCount  = filtered.filter((r) => r.absent === 0 && r.late === 0).length;
    const atRiskCount   = filtered.filter((r) => Math.round((r.present / r.total) * 100) < 75).length;

    const classOptions  = ["All Classes", ...classesData.map((c) => c.name)];

    return (
        <div className="w-full h-[100vh] overflow-y-scroll bg-[#F3F4FF] p-[20px]">

            {/* ── Header ─────────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between mb-[6px]">
                <div className="flex items-center gap-[16px] p-[10px]">
                    <button
                        onClick={() => navigate("/attendance")}
                        className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center text-[#4D44B5] hover:bg-[#EDECFB] transition cursor-pointer shadow-sm"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="text-[14px]" />
                    </button>
                    <div>
                        <h1 className="text-[30px] font-[700] text-[#4D44B5]">Attendance Reports</h1>
                        <p className="text-[#A098AE] text-[13px]">Student-wise attendance overview</p>
                    </div>
                </div>

                {/* Print / Export button */}
                <button className="flex items-center gap-[8px] px-[20px] py-[10px] rounded-full border-2 border-[#4D44B5] text-[#4D44B5] text-[13px] font-[600] hover:bg-[#EDECFB] transition cursor-pointer mr-[10px]">
                    <FontAwesomeIcon icon={faPrint} className="text-[13px]" />
                    Export Report
                </button>
            </div>

            {/* ── Summary Stats ──────────────────────────────────────────────── */}
            <div className="grid grid-cols-4 gap-[16px] mb-[20px]">
                {[
                    { label: "Avg Attendance", value: `${avgRate}%`, icon: faChartBar, bg: "bg-[#EDECFB]", color: "text-[#4D44B5]" },
                    { label: "Perfect Attendance", value: perfectCount, icon: faCheck, bg: "bg-[#E8F8F0]", color: "text-[#4CAF79]" },
                    { label: "Total Absences", value: totalAbsent, icon: faXmark, bg: "bg-[#FFF0F0]", color: "text-[#FB4D4D]" },
                    { label: "At Risk Students", value: atRiskCount, icon: faClock, bg: "bg-[#FFF8E6]", color: "text-[#FCC43E]" },
                ].map((card) => (
                    <div key={card.label} className="bg-white rounded-[20px] p-[18px] flex items-center gap-[14px] shadow-sm">
                        <div className={`w-[46px] h-[46px] rounded-full ${card.bg} flex items-center justify-center`}>
                            <FontAwesomeIcon icon={card.icon} className={`${card.color} text-[18px]`} />
                        </div>
                        <div>
                            <p className="text-[#A098AE] text-[12px]">{card.label}</p>
                            <h3 className="text-[#303972] text-[24px] font-[700] leading-tight">{card.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Filters ────────────────────────────────────────────────────── */}
            <div className="bg-white rounded-[20px] p-[20px] mb-[20px]">
                <div className="flex items-end justify-between gap-[20px]">
                    <div className="flex gap-[16px] items-end">
                        <FilterDropdown
                            label="Class"
                            value={selectedClass}
                            options={classOptions}
                            onChange={(v) => { setSelectedClass(v); setCurrentPage(1); }}
                        />
                        <FilterDropdown
                            label="Month"
                            value={selectedMonth}
                            options={MONTHS}
                            onChange={(v) => { setSelectedMonth(v); setCurrentPage(1); }}
                        />
                    </div>

                    {/* Search */}
                    <div className="flex items-center bg-[#F3F4FF] rounded-[12px] px-[14px] py-[9px] w-[260px]">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE] text-[13px]" />
                        <input
                            type="text"
                            placeholder="Search student..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            className="outline-none ml-[10px] bg-transparent w-full text-[#303972] text-[13px] placeholder-[#A098AE]"
                        />
                    </div>
                </div>
            </div>

            {/* ── Table ──────────────────────────────────────────────────────── */}
            <div className="bg-white rounded-[20px] p-[20px]">
                <div className="flex justify-between items-center mb-[16px]">
                    <h2 className="text-[#303972] text-[16px] font-[700]">
                        Student Records — <span className="text-[#4D44B5]">{selectedMonth}</span>
                        <span className="text-[#A098AE] text-[13px] font-[400] ml-[8px]">
                            ({filtered.length} students)
                        </span>
                    </h2>

                    {/* Legend */}
                    <div className="flex gap-[14px]">
                        {[
                            { dot: "bg-[#4CAF79]", label: "≥ 90% Excellent"    },
                            { dot: "bg-[#FCC43E]", label: "75–89% Good"        },
                            { dot: "bg-[#FB4D4D]", label: "< 75% At Risk"      },
                        ].map((l) => (
                            <div key={l.label} className="flex items-center gap-[5px]">
                                <div className={`w-[8px] h-[8px] rounded-full ${l.dot}`}></div>
                                <span className="text-[#A098AE] text-[11px]">{l.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[#E5E5E5]">
                            {["#", "Student Name", "Student ID", "Class", "Present", "Absent", "Late", "Total Days", "Attendance %"].map((h) => (
                                <th key={h} className="text-left py-[14px] px-[12px] text-[#A098AE] font-[600] text-[13px]">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="py-[40px] text-center text-[#A098AE] text-[14px]">
                                    No students found matching your filters.
                                </td>
                            </tr>
                        ) : (
                            currentRows.map((student, idx) => {
                                const { pct, style, label } = getPctBadge(student.present, student.total);
                                return (
                                    <tr key={student.id} className="border-b border-[#E5E5E5] hover:bg-[#F9F9FF] transition-colors">

                                        {/* Row number */}
                                        <td className="py-[16px] px-[12px] text-[#A098AE] text-[13px]">
                                            {startIdx + idx + 1}
                                        </td>

                                        {/* Name + Avatar */}
                                        <td className="py-[16px] px-[12px]">
                                            <div className="flex items-center gap-[12px]">
                                                <div className={`w-[38px] h-[38px] rounded-full ${student.avatarColor} flex items-center justify-center text-[#4D44B5] font-[700] text-[13px]`}>
                                                    {student.avatar}
                                                </div>
                                                <span className="text-[#303972] font-[600] text-[13px]">{student.name}</span>
                                            </div>
                                        </td>

                                        {/* Student ID */}
                                        <td className="py-[16px] px-[12px] text-[#4D44B5] font-[600] text-[13px]">
                                            {student.studentId}
                                        </td>

                                        {/* Class */}
                                        <td className="py-[16px] px-[12px]">
                                            <span className="bg-[#EDECFB] text-[#4D44B5] px-[10px] py-[3px] rounded-full text-[12px] font-[600]">
                                                {student.grade}
                                            </span>
                                        </td>

                                        {/* Present */}
                                        <td className="py-[16px] px-[12px]">
                                            <div className="flex items-center gap-[6px]">
                                                <div className="w-[7px] h-[7px] rounded-full bg-[#4CAF79]"></div>
                                                <span className="text-[#303972] font-[600] text-[13px]">{student.present}</span>
                                            </div>
                                        </td>

                                        {/* Absent */}
                                        <td className="py-[16px] px-[12px]">
                                            <div className="flex items-center gap-[6px]">
                                                <div className="w-[7px] h-[7px] rounded-full bg-[#FB4D4D]"></div>
                                                <span className="text-[#303972] font-[600] text-[13px]">{student.absent}</span>
                                            </div>
                                        </td>

                                        {/* Late */}
                                        <td className="py-[16px] px-[12px]">
                                            <div className="flex items-center gap-[6px]">
                                                <div className="w-[7px] h-[7px] rounded-full bg-[#FCC43E]"></div>
                                                <span className="text-[#303972] font-[600] text-[13px]">{student.late}</span>
                                            </div>
                                        </td>

                                        {/* Total */}
                                        <td className="py-[16px] px-[12px] text-[#A098AE] text-[13px]">
                                            {student.total}
                                        </td>

                                        {/* Percentage + progress bar */}
                                        <td className="py-[16px] px-[12px]">
                                            <div className="flex items-center gap-[10px]">
                                                {/* Progress bar */}
                                                <div className="w-[60px] h-[6px] bg-[#F3F4FF] rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${
                                                            pct >= 90 ? "bg-[#4CAF79]" :
                                                            pct >= 75 ? "bg-[#FCC43E]" : "bg-[#FB4D4D]"
                                                        }`}
                                                        style={{ width: `${pct}%` }}
                                                    ></div>
                                                </div>
                                                {/* Badge */}
                                                <span className={`px-[10px] py-[3px] rounded-full text-[12px] font-[700] ${style}`}>
                                                    {pct}%
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>

                {/* Footer summary row */}
                {filtered.length > 0 && (
                    <div className="mt-[12px] pt-[12px] border-t border-[#E5E5E5] flex gap-[24px]">
                        <span className="text-[#A098AE] text-[12px]">
                            Total Present: <strong className="text-[#4CAF79]">{totalPresent}</strong>
                        </span>
                        <span className="text-[#A098AE] text-[12px]">
                            Total Absent: <strong className="text-[#FB4D4D]">{totalAbsent}</strong>
                        </span>
                        <span className="text-[#A098AE] text-[12px]">
                            Total Late: <strong className="text-[#FCC43E]">{totalLate}</strong>
                        </span>
                        <span className="text-[#A098AE] text-[12px]">
                            School Avg: <strong className="text-[#4D44B5]">{avgRate}%</strong>
                        </span>
                    </div>
                )}

                {/* Pagination */}
                {filtered.length > itemsPerPage && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={filtered.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>

        </div>
    );
};

export default AttendanceReport;
