import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faChevronDown,
    faPlus,
    faXmark,
    faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import {
    selectEventsByDate,
    addEvent,
    deleteEvent,
    TYPE_COLOR_MAP,
} from "../store/eventsSlice";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const pad = (n) => String(n).padStart(2, "0");

// Build ISO date string "YYYY-MM-DD" from year/month/day
const toISO = (year, month, day) => `${year}-${pad(month + 1)}-${pad(day)}`;

const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

const getFirstDayOfMonth = (month, year) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Mon=0 … Sun=6
};

const EVENT_TYPES = ["meeting", "holiday", "exam", "activity", "other"];

const TYPE_LABELS = {
    meeting:  "Meeting",
    holiday:  "Holiday",
    exam:     "Exam",
    activity: "Activity",
    other:    "Other",
};

// ─── Add Event Modal ──────────────────────────────────────────────────────────
function AddEventModal({ onClose, defaultDate }) {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        title:        "",
        date:         defaultDate ?? "",
        type:         "meeting",
        participants: "",
        description:  "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title.trim()) { setError("Title is required."); return; }
        if (!form.date)          { setError("Date is required.");  return; }

        dispatch(
            addEvent({
                title:        form.title.trim(),
                date:         form.date,
                type:         form.type,
                color:        TYPE_COLOR_MAP[form.type],
                participants: form.participants
                    ? form.participants.split(",").map((p) => p.trim()).filter(Boolean)
                    : [],
                description:  form.description.trim(),
            })
        );
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-[24px] w-full max-w-[480px] mx-[20px] shadow-2xl overflow-hidden">
                {/* Modal Header */}
                <div className="bg-[#4D44B5] text-white px-[30px] py-[18px] flex justify-between items-center">
                    <h2 className="text-[20px] font-[700] flex items-center gap-[10px]">
                        <FontAwesomeIcon icon={faCalendarDays} />
                        New Event
                    </h2>
                    <button onClick={onClose} className="hover:opacity-70 transition cursor-pointer">
                        <FontAwesomeIcon icon={faXmark} className="text-[20px]" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-[30px] flex flex-col gap-[18px]">
                    {error && (
                        <div className="bg-red-50 border border-red-300 text-red-600 text-sm px-4 py-2 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Title */}
                    <div>
                        <label className="block text-[#303972] text-[13px] font-[600] mb-[6px]">
                            Event Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="e.g. Parent Meeting"
                            className="w-full px-[16px] py-[10px] border border-[#E0E0E0] rounded-[10px] outline-none focus:border-[#4D44B5] text-[14px] text-[#303972] placeholder-[#A098AE]"
                        />
                    </div>

                    {/* Date & Type */}
                    <div className="grid grid-cols-2 gap-[15px]">
                        <div>
                            <label className="block text-[#303972] text-[13px] font-[600] mb-[6px]">
                                Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="w-full px-[16px] py-[10px] border border-[#E0E0E0] rounded-[10px] outline-none focus:border-[#4D44B5] text-[14px] text-[#303972]"
                            />
                        </div>
                        <div>
                            <label className="block text-[#303972] text-[13px] font-[600] mb-[6px]">
                                Type
                            </label>
                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className="w-full px-[16px] py-[10px] border border-[#E0E0E0] rounded-[10px] outline-none focus:border-[#4D44B5] text-[14px] text-[#303972] bg-white cursor-pointer"
                            >
                                {EVENT_TYPES.map((t) => (
                                    <option key={t} value={t}>{TYPE_LABELS[t]}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Color preview */}
                    <div className="flex items-center gap-[10px]">
                        <div
                            className="w-[18px] h-[18px] rounded-full flex-shrink-0"
                            style={{ backgroundColor: TYPE_COLOR_MAP[form.type] }}
                        />
                        <span className="text-[#A098AE] text-[12px]">
                            Color assigned automatically based on type
                        </span>
                    </div>

                    {/* Participants */}
                    <div>
                        <label className="block text-[#303972] text-[13px] font-[600] mb-[6px]">
                            Participants <span className="text-[#A098AE] font-[400]">(comma separated)</span>
                        </label>
                        <input
                            name="participants"
                            value={form.participants}
                            onChange={handleChange}
                            placeholder="e.g. Karen, Tony, VII A"
                            className="w-full px-[16px] py-[10px] border border-[#E0E0E0] rounded-[10px] outline-none focus:border-[#4D44B5] text-[14px] text-[#303972] placeholder-[#A098AE]"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-[#303972] text-[13px] font-[600] mb-[6px]">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Short description of the event..."
                            className="w-full px-[16px] py-[10px] border border-[#E0E0E0] rounded-[10px] outline-none focus:border-[#4D44B5] text-[14px] text-[#303972] placeholder-[#A098AE] resize-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-[12px] pt-[4px]">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-[24px] py-[10px] border border-[#E0E0E0] rounded-full text-[#A098AE] text-[14px] hover:border-[#4D44B5] hover:text-[#4D44B5] transition cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-[24px] py-[10px] bg-[#4D44B5] text-white rounded-full text-[14px] hover:bg-[#3d3591] transition cursor-pointer"
                        >
                            Add Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── Event Detail Popup ───────────────────────────────────────────────────────
function EventDetailPopup({ events, onClose, onDelete }) {
    return (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
            <div className="bg-white rounded-[20px] w-full max-w-[400px] mx-[20px] shadow-2xl overflow-hidden">
                <div className="bg-[#4D44B5] text-white px-[24px] py-[14px] flex justify-between items-center">
                    <h3 className="text-[16px] font-[700]">Events on this day</h3>
                    <button onClick={onClose} className="hover:opacity-70 transition cursor-pointer">
                        <FontAwesomeIcon icon={faXmark} className="text-[18px]" />
                    </button>
                </div>
                <div className="p-[20px] flex flex-col gap-[12px] max-h-[400px] overflow-y-auto">
                    {events.map((ev) => (
                        <div
                            key={ev.id}
                            className="flex items-start gap-[12px] p-[14px] rounded-[12px] bg-[#F3F4FF]"
                        >
                            <div
                                className="w-[12px] h-[12px] rounded-full mt-[4px] flex-shrink-0"
                                style={{ backgroundColor: ev.color }}
                            />
                            <div className="flex-1">
                                <p className="text-[#303972] font-[700] text-[14px]">{ev.title}</p>
                                <p className="text-[#A098AE] text-[12px] mt-[2px]">
                                    {TYPE_LABELS[ev.type]} · {ev.date}
                                </p>
                                {ev.participants?.length > 0 && (
                                    <p className="text-[#A098AE] text-[12px] mt-[2px]">
                                        👥 {ev.participants.join(", ")}
                                    </p>
                                )}
                                {ev.description && (
                                    <p className="text-[#A098AE] text-[12px] mt-[4px] leading-[16px]">
                                        {ev.description}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={() => onDelete(ev.id)}
                                className="text-[#FB4D4D] hover:opacity-70 transition cursor-pointer flex-shrink-0"
                                title="Delete event"
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const EventComp = () => {
    const dispatch = useDispatch();

    // ── Redux state ───────────────────────────────────────────────────────────
    // selectEventsByDate returns { "2026-02-10": [ev1, ev2], ... }
    const eventsByDate = useSelector(selectEventsByDate);
    // ── Local UI state ────────────────────────────────────────────────────────
    const currentDate = new Date();
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [selectedYear,  setSelectedYear]  = useState(currentDate.getFullYear());
    const [isMonthOpen,   setIsMonthOpen]   = useState(false);
    const [isYearOpen,    setIsYearOpen]    = useState(false);
    const [showAddModal,  setShowAddModal]  = useState(false);
    const [clickedDate,   setClickedDate]   = useState(null); // "YYYY-MM-DD"
    const [detailEvents,  setDetailEvents]  = useState(null); // array | null

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const currentYearValue = new Date().getFullYear();
    const years = Array.from({ length: 16 }, (_, i) => currentYearValue - 10 + i);

    // ── Calendar generation ────────────────────────────────────────────────────
    const generateCalendar = () => {
        const daysInMonth   = getDaysInMonth(selectedMonth, selectedYear);
        const firstDay      = getFirstDayOfMonth(selectedMonth, selectedYear);
        const daysInPrev    = getDaysInMonth(selectedMonth - 1, selectedYear);
        const calendar      = [];

        for (let i = firstDay - 1; i >= 0; i--) {
            calendar.push({ day: daysInPrev - i, isCurrentMonth: false });
        }
        for (let i = 1; i <= daysInMonth; i++) {
            calendar.push({ day: i, isCurrentMonth: true });
        }
        const remaining = 42 - calendar.length;
        for (let i = 1; i <= remaining; i++) {
            calendar.push({ day: i, isCurrentMonth: false });
        }
        return calendar;
    };

    const calendarDays = generateCalendar();
    const today = toISO(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
    );

    // ── Handlers ───────────────────────────────────────────────────────────────
    const handleDayClick = (dateObj) => {
        if (!dateObj.isCurrentMonth) return;
        const isoDate = toISO(selectedYear, selectedMonth, dateObj.day);
        const evs = eventsByDate[isoDate];
        if (evs?.length > 0) {
            setDetailEvents(evs);
        } else {
            setClickedDate(isoDate);
            setShowAddModal(true);
        }
    };

    const handleDeleteEvent = (id) => {
        dispatch(deleteEvent(id));
        setDetailEvents((prev) => {
            const updated = prev.filter((e) => e.id !== id);
            return updated.length > 0 ? updated : null;
        });
    };

    return (
        <div className="w-full h-[100vh] overflow-y-scroll bg-[#F3F4FF] p-[20px]">

            {/* Modals */}
            {showAddModal && (
                <AddEventModal
                    defaultDate={clickedDate}
                    onClose={() => { setShowAddModal(false); setClickedDate(null); }}
                />
            )}
            {detailEvents && (
                <EventDetailPopup
                    events={detailEvents}
                    onClose={() => setDetailEvents(null)}
                    onDelete={handleDeleteEvent}
                />
            )}

            {/* Page Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-[36px] font-[700] text-center p-[20px] text-[#4D44B5]">Events</h1>
                <div className="flex items-center bg-[#fff] rounded-full px-4 py-[10px] w-[300px]">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE] ml-[20px]" />
                    <input
                        type="text"
                        placeholder="Search here..."
                        className="outline-none ml-[10px] border-none w-full text-[#A098AE] placeholder-[#A098AE]"
                    />
                </div>
            </div>

            {/* Calendar Card */}
            <div className="bg-white rounded-[20px] shadow-sm p-[30px]">

                {/* Calendar Header */}
                <div className="flex justify-between items-center mb-[30px] flex-wrap gap-[10px]">
                    <h1 className="text-[28px] font-[700] text-[#303972]">
                        {months[selectedMonth]} {selectedYear}
                    </h1>

                    <div className="flex items-center gap-[12px] flex-wrap">

                        {/* Month Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => { setIsMonthOpen(!isMonthOpen); setIsYearOpen(false); }}
                                className="px-[18px] py-[10px] border-2 border-[#E5E5E5] rounded-[40px] text-[#4D44B5] font-[600] text-[14px] flex items-center gap-[8px] hover:border-[#4D44B5] transition cursor-pointer min-w-[130px]"
                            >
                                {months[selectedMonth]}
                                <FontAwesomeIcon icon={faChevronDown} className="text-[11px]" />
                            </button>
                            {isMonthOpen && (
                                <div className="absolute top-[48px] left-0 bg-white border-2 border-[#E5E5E5] rounded-[12px] shadow-lg z-10 max-h-[260px] overflow-y-auto w-[140px]">
                                    {months.map((m, i) => (
                                        <button
                                            key={m}
                                            onClick={() => { setSelectedMonth(i); setIsMonthOpen(false); }}
                                            className={`w-full text-left px-[18px] py-[10px] text-[13px] hover:bg-[#F3F4FF] transition cursor-pointer ${selectedMonth === i ? "text-[#4D44B5] font-[700] bg-[#EDECFB]" : "text-[#303972]"}`}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Year Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => { setIsYearOpen(!isYearOpen); setIsMonthOpen(false); }}
                                className="px-[18px] py-[10px] border-2 border-[#E5E5E5] rounded-[40px] text-[#4D44B5] font-[600] text-[14px] flex items-center gap-[8px] hover:border-[#4D44B5] transition cursor-pointer min-w-[100px]"
                            >
                                {selectedYear}
                                <FontAwesomeIcon icon={faChevronDown} className="text-[11px]" />
                            </button>
                            {isYearOpen && (
                                <div className="absolute top-[48px] left-0 bg-white border-2 border-[#E5E5E5] rounded-[12px] shadow-lg z-10 max-h-[260px] overflow-y-auto w-[110px]">
                                    {years.map((y) => (
                                        <button
                                            key={y}
                                            onClick={() => { setSelectedYear(y); setIsYearOpen(false); }}
                                            className={`w-full text-left px-[18px] py-[10px] text-[13px] hover:bg-[#F3F4FF] transition cursor-pointer ${selectedYear === y ? "text-[#4D44B5] font-[700] bg-[#EDECFB]" : "text-[#303972]"}`}
                                        >
                                            {y}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* New Event Button */}
                        <button
                            onClick={() => { setClickedDate(""); setShowAddModal(true); }}
                            className="px-[22px] py-[10px] bg-[#4D44B5] text-white rounded-[40px] font-[600] text-[14px] flex items-center gap-[8px] hover:bg-[#3d3591] transition cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faPlus} className="text-[12px]" />
                            New Event
                        </button>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex gap-[20px] mb-[20px] flex-wrap">
                    {EVENT_TYPES.map((t) => (
                        <div key={t} className="flex items-center gap-[6px]">
                            <div className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor: TYPE_COLOR_MAP[t] }} />
                            <span className="text-[#A098AE] text-[12px]">{TYPE_LABELS[t]}</span>
                        </div>
                    ))}
                </div>

                {/* Week Days Header */}
                <div className="grid grid-cols-7 gap-[8px] mb-[8px]">
                    {weekDays.map((d) => (
                        <div key={d} className="text-center text-[#A098AE] text-[12px] font-[600] py-[8px]">
                            {d}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-[8px]">
                    {calendarDays.map((dateObj, index) => {
                        const isoDate   = toISO(selectedYear, selectedMonth, dateObj.day);
                        const dayEvents = dateObj.isCurrentMonth ? (eventsByDate[isoDate] ?? []) : [];
                        const isToday   = isoDate === today && dateObj.isCurrentMonth;

                        return (
                            <div
                                key={index}
                                onClick={() => handleDayClick(dateObj)}
                                className={`
                                    aspect-square rounded-[10px] p-[8px] border-2 relative flex flex-col
                                    ${isToday
                                        ? "border-[#4D44B5] bg-[#EDECFB]"
                                        : "border-[#E5E5E5] bg-white"
                                    }
                                    ${!dateObj.isCurrentMonth ? "opacity-30" : "hover:border-[#4D44B5] cursor-pointer"}
                                    transition-all duration-150
                                `}
                            >
                                {/* Day number */}
                                <span className={`text-[14px] font-[700] ${isToday ? "text-[#4D44B5]" : "text-[#303972]"}`}>
                                    {dateObj.day}
                                </span>

                                {/* First event title */}
                                {dayEvents[0] && (
                                    <div
                                        className="mt-[4px] text-[9px] font-[600] text-white px-[4px] py-[2px] rounded-[4px] truncate"
                                        style={{ backgroundColor: dayEvents[0].color }}
                                    >
                                        {dayEvents[0].title}
                                    </div>
                                )}

                                {/* Dots for all events */}
                                {dayEvents.length > 0 && (
                                    <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 flex gap-[3px]">
                                        {dayEvents.slice(0, 3).map((ev, i) => (
                                            <div
                                                key={i}
                                                className="w-[6px] h-[6px] rounded-full"
                                                style={{ backgroundColor: ev.color }}
                                            />
                                        ))}
                                        {dayEvents.length > 3 && (
                                            <span className="text-[8px] text-[#A098AE] font-[700]">
                                                +{dayEvents.length - 3}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default EventComp;
