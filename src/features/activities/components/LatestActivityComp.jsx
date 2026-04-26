
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faUserPlus,
    faUserMinus,
    faChalkboardUser,
    faClipboardCheck,
    faDollarSign,
    faCalendarDays,
    faCalendarMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectActivities, ACTIVITY_CONFIG } from "../store/activitiesSlice";

// ── Icon per activity type ────────────────────────────────────────────────────
const ACTIVITY_ICONS = {
    student_added:        faUserPlus,
    student_deleted:      faUserMinus,
    teacher_added:        faChalkboardUser,
    teacher_deleted:      faUserMinus,
    attendance_submitted: faClipboardCheck,
    payment_received:     faDollarSign,
    event_created:        faCalendarDays,
    event_deleted:        faCalendarMinus,
};

// ── Filter tabs ───────────────────────────────────────────────────────────────
const FILTERS = [
    { key: "all",        label: "All" },
    { key: "students",   label: "Students",   types: ["student_added",   "student_deleted"] },
    { key: "teachers",   label: "Teachers",   types: ["teacher_added",   "teacher_deleted"] },
    { key: "attendance", label: "Attendance", types: ["attendance_submitted"] },
    { key: "finance",    label: "Finance",    types: ["payment_received"] },
    { key: "events",     label: "Events",     types: ["event_created",   "event_deleted"] },
];

// ── Time grouping helpers ─────────────────────────────────────────────────────
const GROUP_ORDER = ["Today", "Yesterday", "This Week", "Earlier"];

const getGroup = (timestamp) => {
    const diffHours = (Date.now() - new Date(timestamp).getTime()) / 3_600_000;
    if (diffHours < 24)  return "Today";
    if (diffHours < 48)  return "Yesterday";
    if (diffHours < 168) return "This Week";
    return "Earlier";
};

const formatTime = (ts) =>
    new Date(ts).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

const formatDate = (ts) =>
    new Date(ts).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

// ── Component ─────────────────────────────────────────────────────────────────
const LatestActivityComp = () => {
    const activities    = useSelector(selectActivities);
    const [search,    setSearch]    = useState("");
    const [activeTab, setActiveTab] = useState("all");

    // 1. Sort newest first, 2. filter by tab, 3. filter by search
    const filtered = useMemo(() => {
        let list = [...activities].sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        if (activeTab !== "all") {
            const types = FILTERS.find((f) => f.key === activeTab)?.types ?? [];
            list = list.filter((a) => types.includes(a.type));
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(
                (a) =>
                    a.subject?.toLowerCase().includes(q) ||
                    a.actor?.toLowerCase().includes(q)   ||
                    a.meta?.toLowerCase().includes(q)    ||
                    a.message?.some((p) => p.text?.toLowerCase().includes(q))
            );
        }

        return list;
    }, [activities, activeTab, search]);

    // Group filtered list by time period
    const grouped = useMemo(() => {
        const g = {};
        filtered.forEach((item) => {
            const key = getGroup(item.timestamp);
            if (!g[key]) g[key] = [];
            g[key].push(item);
        });
        return g;
    }, [filtered]);

    const renderMessage = (message) =>
        message.map((part, i) => (
            <span
                key={i}
                className={part.bold ? "font-[700] text-[#303972]" : "text-[#A098AE]"}
                style={part.highlight ? { color: "#4D44B5", fontWeight: 600 } : {}}
            >
                {part.text}
            </span>
        ));

    return (
        <div className="w-full h-[100vh] overflow-y-scroll bg-[#F3F4FF] p-[20px]">

            {/* ── Header ── */}
            <div className="flex justify-between items-center mb-[20px]">
                <h1 className="text-[36px] font-[700] p-[20px] text-[#4D44B5]">
                    Latest Activity
                </h1>
                <div className="flex items-center bg-white rounded-full px-4 py-[10px] w-[300px] shadow-sm">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE]" />
                    <input
                        type="text"
                        placeholder="Search activities..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="outline-none ml-[10px] border-none w-full text-[#303972] placeholder-[#A098AE] text-[14px]"
                    />
                </div>
            </div>

            {/* ── Filter tabs ── */}
            <div className="flex gap-[8px] mb-[25px] px-[20px] flex-wrap">
                {FILTERS.map((f) => (
                    <button
                        key={f.key}
                        onClick={() => setActiveTab(f.key)}
                        className={`px-[18px] py-[8px] rounded-full text-[14px] font-[600] transition-all cursor-pointer ${
                            activeTab === f.key
                                ? "bg-[#4D44B5] text-white shadow"
                                : "bg-white text-[#A098AE] hover:bg-[#EEEDFA] hover:text-[#4D44B5]"
                        }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* ── Activity feed ── */}
            <div className="bg-white rounded-[20px] p-[40px] shadow-sm">
                {filtered.length === 0 ? (
                    <div className="text-center py-[60px]">
                        <p className="text-[#A098AE] text-[16px]">No activities found.</p>
                    </div>
                ) : (
                    GROUP_ORDER.filter((g) => grouped[g]).map((group) => (
                        <div key={group} className="mb-[40px]">

                            {/* Group label */}
                            <div className="flex items-center gap-[10px] mb-[25px]">
                                <h2 className="text-[#303972] text-[20px] font-[700]">
                                    {group}
                                </h2>
                                <span className="text-[12px] font-[500] text-[#A098AE] bg-[#F3F4FF] px-[10px] py-[2px] rounded-full">
                                    {grouped[group].length}{" "}
                                    {grouped[group].length === 1 ? "event" : "events"}
                                </span>
                            </div>

                            {/* Timeline */}
                            <div className="relative">
                                {/* Vertical connector line */}
                                <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-[#E8E9FD]" />

                                <div className="flex flex-col gap-[24px]">
                                    {grouped[group].map((item) => {
                                        const cfg  = ACTIVITY_CONFIG[item.type] ?? { color: "#A098AE", bg: "#F3F4FF", label: item.type };
                                        const icon = ACTIVITY_ICONS[item.type];

                                        return (
                                            <div key={item.id} className="flex gap-[20px] items-start">

                                                {/* ── Icon badge (sits on the timeline line) ── */}
                                                <div
                                                    className="flex-shrink-0 w-[40px] h-[40px] rounded-full flex items-center justify-center z-10 shadow-sm"
                                                    style={{ backgroundColor: cfg.bg }}
                                                >
                                                    {icon && (
                                                        <FontAwesomeIcon
                                                            icon={icon}
                                                            style={{ color: cfg.color }}
                                                            className="text-[15px]"
                                                        />
                                                    )}
                                                </div>

                                                {/* ── Content card ── */}
                                                <div className="flex-1 bg-[#FAFBFF] rounded-[12px] p-[16px] border border-[#E8E9FD]">

                                                    {/* Type badge + timestamp */}
                                                    <div className="flex items-center justify-between mb-[8px]">
                                                        <span
                                                            className="text-[11px] font-[700] px-[10px] py-[3px] rounded-full uppercase tracking-wide"
                                                            style={{ color: cfg.color, backgroundColor: cfg.bg }}
                                                        >
                                                            {cfg.label}
                                                        </span>
                                                        <span className="text-[12px] text-[#A098AE]">
                                                            {group === "Today"
                                                                ? formatTime(item.timestamp)
                                                                : formatDate(item.timestamp)}
                                                        </span>
                                                    </div>

                                                    {/* Message */}
                                                    <p className="text-[14px] leading-relaxed">
                                                        {renderMessage(item.message)}
                                                    </p>

                                                    {/* Meta pill */}
                                                    {item.meta && (
                                                        <span className="mt-[8px] inline-block text-[12px] text-[#A098AE] bg-[#F3F4FF] px-[10px] py-[3px] rounded-full">
                                                            {item.meta}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default LatestActivityComp;

