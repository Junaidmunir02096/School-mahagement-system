import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faCheck,
    faXmark,
    faClock,
    faUserShield,
    faChevronDown,
    faCalendarDays,
    faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import { classesData, subjectsData, classStudentsForAttendance } from "../../utils/mockData/attendanceData";

// ─── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
    present: {
        label: "Present",
        short: "P",
        icon: faCheck,
        activeBg:   "bg-[#4CAF79]",
        activeText: "text-white",
        inactiveBg: "bg-transparent",
        inactiveText: "text-[#4CAF79]",
        border: "border-[#4CAF79]",
    },
    absent: {
        label: "Absent",
        short: "A",
        icon: faXmark,
        activeBg:   "bg-[#FB4D4D]",
        activeText: "text-white",
        inactiveBg: "bg-transparent",
        inactiveText: "text-[#FB4D4D]",
        border: "border-[#FB4D4D]",
    },
    late: {
        label: "Late",
        short: "L",
        icon: faClock,
        activeBg:   "bg-[#FCC43E]",
        activeText: "text-white",
        inactiveBg: "bg-transparent",
        inactiveText: "text-[#FCC43E]",
        border: "border-[#FCC43E]",
    },
    excused: {
        label: "Excused",
        short: "E",
        icon: faUserShield,
        activeBg:   "bg-[#A098AE]",
        activeText: "text-white",
        inactiveBg: "bg-transparent",
        inactiveText: "text-[#A098AE]",
        border: "border-[#A098AE]",
    },
};

// ─── Custom Select Dropdown ────────────────────────────────────────────────────
const SelectDropdown = ({ label, value, options, onChange }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative flex-1">
            <p className="text-[#A098AE] text-[12px] font-[500] mb-[6px]">{label}</p>
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between bg-[#F3F4FF] rounded-[12px] px-[16px] py-[12px] text-[14px] text-[#303972] font-[500] cursor-pointer border-2 border-transparent hover:border-[#4D44B5] transition"
            >
                <span>{value || `Select ${label}`}</span>
                <FontAwesomeIcon icon={faChevronDown} className="text-[#A098AE] text-[11px]" />
            </button>
            {open && (
                <div className="absolute top-[74px] left-0 bg-white rounded-[12px] shadow-xl border border-[#E5E5E5] w-full z-20 overflow-hidden max-h-[220px] overflow-y-auto">
                    {options.map((opt) => (
                        <div
                            key={opt}
                            onClick={() => { onChange(opt); setOpen(false); }}
                            className={`px-[16px] py-[11px] cursor-pointer text-[13px] hover:bg-[#F3F4FF] transition ${
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
const MarkAttendance = () => {
    const navigate = useNavigate();

    const [selectedClass,   setSelectedClass]   = useState(classesData[0].name);
    const [selectedSubject, setSelectedSubject] = useState(subjectsData[0]);
    const [selectedDate,    setSelectedDate]    = useState(
        new Date().toISOString().split("T")[0]
    );

    // Initialise all students as "present"
    const [records, setRecords] = useState(
        classStudentsForAttendance.map((s) => ({ ...s, status: "present" }))
    );

    const [submitted, setSubmitted] = useState(false);

    // ── Derived counts ─────────────────────────────────────────────────────────
    const counts = {
        present: records.filter((r) => r.status === "present").length,
        absent:  records.filter((r) => r.status === "absent").length,
        late:    records.filter((r) => r.status === "late").length,
        excused: records.filter((r) => r.status === "excused").length,
    };

    // ── Handlers ───────────────────────────────────────────────────────────────
    const handleStatusChange = (id, status) =>
        setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));

    const handleMarkAll = (status) =>
        setRecords((prev) => prev.map((r) => ({ ...r, status })));

    const handleSubmit = () => {
        // TODO: connect to Firebase / API in backend phase
        setSubmitted(true);
    };

    // ── Success Screen ─────────────────────────────────────────────────────────
    if (submitted) {
        return (
            <div className="w-full h-[100vh] bg-[#F3F4FF] flex items-center justify-center">
                <div className="bg-white rounded-[24px] p-[50px] flex flex-col items-center max-w-[460px] w-full shadow-lg">
                    <div className="w-[80px] h-[80px] rounded-full bg-[#E8F8F0] flex items-center justify-center mb-[20px]">
                        <FontAwesomeIcon icon={faClipboardCheck} className="text-[#4CAF79] text-[36px]" />
                    </div>
                    <h2 className="text-[#303972] text-[24px] font-[700] mb-[8px]">Attendance Saved!</h2>
                    <p className="text-[#A098AE] text-[14px] text-center mb-[8px]">
                        <strong className="text-[#4D44B5]">{selectedClass}</strong> — {selectedSubject}
                    </p>
                    <p className="text-[#A098AE] text-[13px] text-center mb-[30px]">
                        {new Date(selectedDate).toLocaleDateString("en-US", {
                            weekday: "long", year: "numeric", month: "long", day: "numeric",
                        })}
                    </p>

                    {/* Summary pills */}
                    <div className="flex gap-[12px] flex-wrap justify-center mb-[32px]">
                        {Object.entries(counts).map(([key, val]) => {
                            const cfg = STATUS_CONFIG[key];
                            return (
                                <div key={key} className={`px-[20px] py-[8px] rounded-full ${cfg.activeBg} ${cfg.activeText} text-[13px] font-[600]`}>
                                    {val} {cfg.label}
                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => navigate("/attendance")}
                        className="w-full py-[14px] rounded-full bg-[#4D44B5] text-white font-[600] text-[15px] hover:bg-[#3d3595] transition cursor-pointer"
                    >
                        Back to Attendance
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-[100vh] overflow-y-scroll bg-[#F3F4FF] p-[20px]">

            {/* ── Header ─────────────────────────────────────────────────────── */}
            <div className="flex items-center gap-[16px] p-[10px] mb-[6px]">
                <button
                    onClick={() => navigate("/attendance")}
                    className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center text-[#4D44B5] hover:bg-[#EDECFB] transition cursor-pointer shadow-sm"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="text-[14px]" />
                </button>
                <div>
                    <h1 className="text-[30px] font-[700] text-[#4D44B5]">Mark Attendance</h1>
                    <p className="text-[#A098AE] text-[13px]">Mark daily attendance for a class</p>
                </div>
            </div>

            {/* ── Filters Card ───────────────────────────────────────────────── */}
            <div className="bg-white rounded-[20px] p-[24px] mb-[20px]">
                <div className="flex gap-[20px] items-end">
                    {/* Class */}
                    <SelectDropdown
                        label="Class"
                        value={selectedClass}
                        options={classesData.map((c) => c.name)}
                        onChange={setSelectedClass}
                    />

                    {/* Subject */}
                    <SelectDropdown
                        label="Subject"
                        value={selectedSubject}
                        options={subjectsData}
                        onChange={setSelectedSubject}
                    />

                    {/* Date */}
                    <div className="flex-1">
                        <p className="text-[#A098AE] text-[12px] font-[500] mb-[6px]">Date</p>
                        <div className="relative">
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full bg-[#F3F4FF] rounded-[12px] px-[16px] py-[12px] text-[14px] text-[#303972] font-[500] outline-none border-2 border-transparent focus:border-[#4D44B5] transition cursor-pointer"
                            />
                            <FontAwesomeIcon
                                icon={faCalendarDays}
                                className="absolute right-[14px] top-[50%] -translate-y-[50%] text-[#A098AE] text-[14px] pointer-events-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Live Summary + Bulk Actions ────────────────────────────────── */}
            <div className="bg-white rounded-[20px] p-[20px] mb-[20px] flex justify-between items-center">
                {/* Live count pills */}
                <div className="flex gap-[10px] flex-wrap">
                    {Object.entries(counts).map(([key, val]) => {
                        const cfg = STATUS_CONFIG[key];
                        return (
                            <div
                                key={key}
                                className={`flex items-center gap-[7px] px-[16px] py-[7px] rounded-full border-2 ${cfg.border}`}
                            >
                                <FontAwesomeIcon icon={cfg.icon} className={`${cfg.inactiveText} text-[11px]`} />
                                <span className={`${cfg.inactiveText} text-[13px] font-[600]`}>
                                    {val} {cfg.label}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Bulk actions */}
                <div className="flex gap-[10px]">
                    <button
                        onClick={() => handleMarkAll("present")}
                        className="px-[16px] py-[8px] rounded-full bg-[#E8F8F0] text-[#4CAF79] text-[13px] font-[600] hover:bg-[#4CAF79] hover:text-white transition cursor-pointer"
                    >
                        Mark All Present
                    </button>
                    <button
                        onClick={() => handleMarkAll("absent")}
                        className="px-[16px] py-[8px] rounded-full bg-[#FFF0F0] text-[#FB4D4D] text-[13px] font-[600] hover:bg-[#FB4D4D] hover:text-white transition cursor-pointer"
                    >
                        Mark All Absent
                    </button>
                </div>
            </div>

            {/* ── Students List ──────────────────────────────────────────────── */}
            <div className="bg-white rounded-[20px] p-[20px]">
                <div className="flex justify-between items-center mb-[16px]">
                    <h2 className="text-[#303972] text-[16px] font-[700]">
                        Students — <span className="text-[#4D44B5]">{selectedClass}</span>
                        <span className="text-[#A098AE] text-[13px] font-[400] ml-[8px]">
                            ({records.length} students)
                        </span>
                    </h2>

                    {/* Legend */}
                    <div className="flex gap-[12px]">
                        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                            <div key={key} className="flex items-center gap-[5px]">
                                <div className={`w-[8px] h-[8px] rounded-full ${cfg.activeBg}`}></div>
                                <span className="text-[#A098AE] text-[11px]">{cfg.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="border-b border-[#E5E5E5] mb-[4px]"></div>

                {/* Student rows */}
                <div className="flex flex-col gap-[2px]">
                    {records.map((student, idx) => (
                        <div
                            key={student.id}
                            className="flex items-center justify-between py-[14px] px-[8px] border-b border-[#F3F4FF] hover:bg-[#F9F9FF] rounded-[12px] transition"
                        >
                            {/* Left: number + avatar + name */}
                            <div className="flex items-center gap-[14px]">
                                <span className="text-[#A098AE] text-[13px] font-[500] w-[24px] text-center">
                                    {idx + 1}
                                </span>
                                <div className={`w-[42px] h-[42px] rounded-full ${student.avatarColor} flex items-center justify-center text-[#4D44B5] font-[700] text-[14px]`}>
                                    {student.avatar}
                                </div>
                                <div>
                                    <p className="text-[#303972] font-[600] text-[14px]">{student.name}</p>
                                    <p className="text-[#A098AE] text-[12px]">{student.studentId}</p>
                                </div>
                            </div>

                            {/* Right: status toggle buttons */}
                            <div className="flex gap-[8px]">
                                {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
                                    const isActive = student.status === key;
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => handleStatusChange(student.id, key)}
                                            title={cfg.label}
                                            className={`
                                                w-[40px] h-[40px] rounded-full border-2 ${cfg.border}
                                                flex items-center justify-center text-[12px] font-[800]
                                                transition-all duration-150 cursor-pointer
                                                ${isActive
                                                    ? `${cfg.activeBg} ${cfg.activeText} shadow-sm scale-110`
                                                    : `${cfg.inactiveBg} ${cfg.inactiveText} hover:opacity-70`
                                                }
                                            `}
                                        >
                                            {cfg.short}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Footer Actions ────────────────────────────────────────── */}
                <div className="flex justify-end gap-[14px] mt-[24px] pt-[20px] border-t border-[#E5E5E5]">
                    <button
                        onClick={() => navigate("/attendance")}
                        className="px-[32px] py-[12px] rounded-full border-2 border-[#E5E5E5] text-[#A098AE] text-[14px] font-[600] hover:border-[#4D44B5] hover:text-[#4D44B5] transition cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-[10px] px-[36px] py-[12px] rounded-full bg-[#4D44B5] text-white text-[14px] font-[600] hover:bg-[#3d3595] transition cursor-pointer shadow-sm"
                    >
                        <FontAwesomeIcon icon={faClipboardCheck} className="text-[14px]" />
                        Save Attendance
                    </button>
                </div>
            </div>

        </div>
    );
};

export default MarkAttendance;
