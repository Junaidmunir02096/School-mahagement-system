import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faCheck,
    faXmark,
    faClock,
    faChartBar,
    faClipboardList,
    faArrowRight,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import { todayClassAttendance, weeklyAttendanceSummary } from "../../utils/mockData/attendanceData";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-[12px] rounded-[12px] shadow-lg border border-[#E5E5E5]">
                <p className="text-[#303972] font-[600] mb-[6px] text-[13px]">{label}</p>
                {payload.map((entry, i) => (
                    <p key={i} style={{ color: entry.color }} className="text-[12px] mb-[2px]">
                        {entry.name}: <strong>{entry.value}</strong>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const getPctStyle = (present, total) => {
    const pct = Math.round((present / total) * 100);
    if (pct >= 90) return { pct, color: "bg-[#E8F8F0] text-[#4CAF79]" };
    if (pct >= 75) return { pct, color: "bg-[#FFF8E6] text-[#FCC43E]" };
    return { pct, color: "bg-[#FFF0F0] text-[#FB4D4D]" };
};

const AttendancePage = () => {
    const navigate = useNavigate();
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("All Classes");

    const totalPresent     = todayClassAttendance.reduce((s, c) => s + c.present, 0);
    const totalAbsent      = todayClassAttendance.reduce((s, c) => s + c.absent,  0);
    const totalLate        = todayClassAttendance.reduce((s, c) => s + c.late,    0);
    const totalStudents    = todayClassAttendance.reduce((s, c) => s + c.totalStudents, 0);
    const attendanceRate   = ((totalPresent / totalStudents) * 100).toFixed(1);

    const filterOptions = ["All Classes", "VII A", "VII B", "VIII A", "VIII B", "IX A", "IX B"];

    const filteredClasses =
        selectedFilter === "All Classes"
            ? todayClassAttendance
            : todayClassAttendance.filter((c) => c.class === selectedFilter);

    // ── Stats cards data ──────────────────────────────────────────────────────
    const statsCards = [
        {
            label: "Present Today",
            value: totalPresent,
            icon: faCheck,
            bgIcon: "bg-[#E8F8F0]",
            iconColor: "text-[#4CAF79]",
            border: "border-l-4 border-[#4CAF79]",
        },
        {
            label: "Absent Today",
            value: totalAbsent,
            icon: faXmark,
            bgIcon: "bg-[#FFF0F0]",
            iconColor: "text-[#FB4D4D]",
            border: "border-l-4 border-[#FB4D4D]",
        },
        {
            label: "Late Today",
            value: totalLate,
            icon: faClock,
            bgIcon: "bg-[#FFF8E6]",
            iconColor: "text-[#FCC43E]",
            border: "border-l-4 border-[#FCC43E]",
        },
        {
            label: "Attendance Rate",
            value: `${attendanceRate}%`,
            icon: faChartBar,
            bgIcon: "bg-[#EDECFB]",
            iconColor: "text-[#4D44B5]",
            border: "border-l-4 border-[#4D44B5]",
        },
    ];

    return (
        <div className="w-full h-[100vh] overflow-y-scroll bg-[#F3F4FF] p-[20px]">

            {/* ── Header ─────────────────────────────────────────────────────── */}
            <div className="flex justify-between items-center">
                <h1 className="text-[36px] font-[700] p-[20px] text-[#4D44B5]">Attendance</h1>
                <div className="flex items-center bg-[#fff] rounded-full px-4 py-[10px] w-[300px]">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE] ml-[20px]" />
                    <input
                        type="text"
                        placeholder="Search here..."
                        className="outline-none ml-[10px] border-none w-full text-[#A098AE] placeholder-[#A098AE]"
                    />
                </div>
            </div>

            {/* ── Stats Cards ────────────────────────────────────────────────── */}
            <div className="grid grid-cols-4 gap-[20px] mt-[10px]">
                {statsCards.map((card) => (
                    <div
                        key={card.label}
                        className={`bg-white rounded-[20px] p-[20px] flex items-center gap-[16px] ${card.border} shadow-sm`}
                    >
                        <div className={`w-[50px] h-[50px] rounded-full ${card.bgIcon} flex items-center justify-center`}>
                            <FontAwesomeIcon icon={card.icon} className={`${card.iconColor} text-[20px]`} />
                        </div>
                        <div>
                            <p className="text-[#A098AE] text-[13px] font-[400]">{card.label}</p>
                            <h2 className="text-[#303972] text-[28px] font-[700] leading-tight">{card.value}</h2>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Today's Class Attendance Table ─────────────────────────────── */}
            <div className="bg-white rounded-[20px] mt-[20px] p-[20px]">
                {/* Table header row */}
                <div className="flex justify-between items-center mb-[20px]">
                    <div className="flex items-center gap-[10px]">
                        <FontAwesomeIcon icon={faClipboardList} className="text-[#4D44B5] text-[18px]" />
                        <h2 className="text-[#303972] text-[18px] font-[700]">
                            Today's Attendance
                            <span className="text-[#A098AE] text-[14px] font-[400] ml-[10px]">
                                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                            </span>
                        </h2>
                    </div>

                    <div className="flex gap-[12px] items-center">
                        {/* Filter dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setFilterOpen(!filterOpen)}
                                className="flex items-center gap-[8px] px-[16px] py-[8px] rounded-full border-2 border-[#5B5BE0] text-[#5B5BE0] text-[14px] font-[500] hover:bg-[#5B5BE0]/10 transition cursor-pointer"
                            >
                                {selectedFilter}
                                <FontAwesomeIcon icon={faChevronDown} className="text-[11px]" />
                            </button>
                            {filterOpen && (
                                <div className="absolute top-[46px] right-0 bg-white rounded-[12px] shadow-lg overflow-hidden w-[160px] z-10 border border-[#E5E5E5]">
                                    {filterOptions.map((opt) => (
                                        <div
                                            key={opt}
                                            onClick={() => { setSelectedFilter(opt); setFilterOpen(false); }}
                                            className={`px-[16px] py-[10px] cursor-pointer text-[13px] hover:bg-[#F3F4FF] transition ${selectedFilter === opt ? "text-[#4D44B5] font-[600]" : "text-[#303972]"}`}
                                        >
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mark Attendance button */}
                        <button
                            onClick={() => navigate("/attendance/mark")}
                            className="flex items-center gap-[8px] px-[20px] py-[8px] rounded-full bg-[#4D44B5] text-white text-[14px] font-[500] hover:bg-[#3d3595] transition cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faClipboardList} className="text-[12px]" />
                            Mark Attendance
                        </button>

                        {/* Reports button */}
                        <button
                            onClick={() => navigate("/attendance/report")}
                            className="flex items-center gap-[8px] px-[20px] py-[8px] rounded-full border-2 border-[#4D44B5] text-[#4D44B5] text-[14px] font-[500] hover:bg-[#4D44B5]/10 transition cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faChartBar} className="text-[12px]" />
                            Reports
                        </button>
                    </div>
                </div>

                {/* Table */}
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[#E5E5E5]">
                            {["Class", "Class Teacher", "Subject", "Total", "Present", "Absent", "Late", "Rate", "Status", "Action"].map((h) => (
                                <th key={h} className="text-left py-[16px] px-[12px] text-[#A098AE] font-[600] text-[13px]">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClasses.map((row) => {
                            const { pct, color } = getPctStyle(row.present, row.totalStudents);
                            return (
                                <tr key={row.id} className="border-b border-[#E5E5E5] hover:bg-[#F9F9FF] transition-colors">
                                    <td className="py-[16px] px-[12px]">
                                        <span className="bg-[#EDECFB] text-[#4D44B5] px-[12px] py-[4px] rounded-full text-[13px] font-[700]">
                                            {row.class}
                                        </span>
                                    </td>
                                    <td className="py-[16px] px-[12px] text-[#303972] font-[500] text-[13px]">{row.teacher}</td>
                                    <td className="py-[16px] px-[12px] text-[#A098AE] text-[13px]">{row.subject}</td>
                                    <td className="py-[16px] px-[12px] text-[#303972] font-[600] text-[13px]">{row.totalStudents}</td>

                                    {/* Present */}
                                    <td className="py-[16px] px-[12px]">
                                        <div className="flex items-center gap-[6px]">
                                            <div className="w-[8px] h-[8px] rounded-full bg-[#4CAF79]"></div>
                                            <span className="text-[#303972] font-[600] text-[13px]">{row.present}</span>
                                        </div>
                                    </td>

                                    {/* Absent */}
                                    <td className="py-[16px] px-[12px]">
                                        <div className="flex items-center gap-[6px]">
                                            <div className="w-[8px] h-[8px] rounded-full bg-[#FB4D4D]"></div>
                                            <span className="text-[#303972] font-[600] text-[13px]">{row.absent}</span>
                                        </div>
                                    </td>

                                    {/* Late */}
                                    <td className="py-[16px] px-[12px]">
                                        <div className="flex items-center gap-[6px]">
                                            <div className="w-[8px] h-[8px] rounded-full bg-[#FCC43E]"></div>
                                            <span className="text-[#303972] font-[600] text-[13px]">{row.late}</span>
                                        </div>
                                    </td>

                                    {/* Rate badge */}
                                    <td className="py-[16px] px-[12px]">
                                        <span className={`px-[12px] py-[4px] rounded-full text-[12px] font-[700] ${color}`}>
                                            {pct}%
                                        </span>
                                    </td>

                                    {/* Status badge */}
                                    <td className="py-[16px] px-[12px]">
                                        <span className={`px-[12px] py-[4px] rounded-full text-[12px] font-[600] ${
                                            row.status === "Completed"
                                                ? "bg-[#E8F8F0] text-[#4CAF79]"
                                                : "bg-[#FFF8E6] text-[#FCC43E]"
                                        }`}>
                                            {row.status}
                                        </span>
                                    </td>

                                    {/* Action */}
                                    <td className="py-[16px] px-[12px]">
                                        <button
                                            onClick={() => navigate("/attendance/mark")}
                                            className="flex items-center gap-[5px] text-[#4D44B5] text-[12px] font-[600] hover:underline cursor-pointer"
                                        >
                                            {row.status === "Pending" ? "Mark" : "View"}
                                            <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Table footer summary */}
                <div className="mt-[16px] pt-[16px] border-t border-[#E5E5E5] flex justify-between items-center">
                    <p className="text-[#A098AE] text-[13px]">
                        Showing {filteredClasses.length} of {todayClassAttendance.length} classes
                    </p>
                    <div className="flex gap-[24px]">
                        <div className="flex items-center gap-[6px]">
                            <div className="w-[10px] h-[10px] rounded-full bg-[#4CAF79]"></div>
                            <span className="text-[#A098AE] text-[12px]">Present: <strong className="text-[#303972]">{totalPresent}</strong></span>
                        </div>
                        <div className="flex items-center gap-[6px]">
                            <div className="w-[10px] h-[10px] rounded-full bg-[#FB4D4D]"></div>
                            <span className="text-[#A098AE] text-[12px]">Absent: <strong className="text-[#303972]">{totalAbsent}</strong></span>
                        </div>
                        <div className="flex items-center gap-[6px]">
                            <div className="w-[10px] h-[10px] rounded-full bg-[#FCC43E]"></div>
                            <span className="text-[#A098AE] text-[12px]">Late: <strong className="text-[#303972]">{totalLate}</strong></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Weekly Trend Chart ──────────────────────────────────────────── */}
            <div className="bg-white rounded-[20px] mt-[20px] p-[20px] pb-[30px]">
                <div className="flex justify-between items-center mb-[20px]">
                    <div>
                        <h2 className="text-[#303972] text-[18px] font-[700]">Weekly Attendance Trend</h2>
                        <p className="text-[#A098AE] text-[13px] mt-[2px]">This week's school-wide attendance overview</p>
                    </div>
                    <div className="flex gap-[16px]">
                        <div className="flex items-center gap-[6px]">
                            <div className="w-[12px] h-[12px] rounded-[3px] bg-[#4D44B5]"></div>
                            <span className="text-[#A098AE] text-[12px]">Present</span>
                        </div>
                        <div className="flex items-center gap-[6px]">
                            <div className="w-[12px] h-[12px] rounded-[3px] bg-[#FB4D4D]"></div>
                            <span className="text-[#A098AE] text-[12px]">Absent</span>
                        </div>
                        <div className="flex items-center gap-[6px]">
                            <div className="w-[12px] h-[12px] rounded-[3px] bg-[#FCC43E]"></div>
                            <span className="text-[#A098AE] text-[12px]">Late</span>
                        </div>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={weeklyAttendanceSummary} barCategoryGap="30%" barGap={4}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#A098AE", fontSize: 13 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#A098AE", fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F3F4FF" }} />
                        <Bar dataKey="present" name="Present" fill="#4D44B5" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="absent"  name="Absent"  fill="#FB4D4D" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="late"    name="Late"    fill="#FCC43E" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default AttendancePage;
