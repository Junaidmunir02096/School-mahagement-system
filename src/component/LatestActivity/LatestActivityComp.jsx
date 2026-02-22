
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const activityData = {
    Today: [
        {
            id: 1,
            date: "Monday, June 31 2020",
            type: "task_created",
            content: [
                { text: "Karen Hope", bold: true },
                { text: " has created new task at " },
                { text: "History Lesson", color: "#FB7D5B" },
            ],
        },
        {
            id: 2,
            date: "Monday, June 31 2020",
            type: "reminder",
            content: [
                { text: "[REMINDER]", color: "#FB7D5B", bold: true },
                { text: " Due date or " },
                { text: "Science Homework", color: "#FB7D5B" },
                { text: " task will be coming" },
            ],
        },
        {
            id: 3,
            date: "Monday, June 31 2020",
            type: "comment",
            content: [
                { text: "Tony Soap", bold: true },
                { text: " commented at " },
                { text: "Science Homework", color: "#FB7D5B" },
            ],
        },
        {
            id: 4,
            date: "Monday, June 31 2020",
            type: "files",
            content: [
                { text: "Samantha William", bold: true },
                { text: " add 4 files on " },
                { text: "Art Class", color: "#4D44B5" },
            ],
            images: [1, 2, 3, 4],
        },
        {
            id: 5,
            date: "Monday, June 31 2020",
            type: "moved",
            content: [
                { text: "You", bold: true },
                { text: " has moved " },
                { text: '"Biology Homework"', color: "#4D44B5" },
                { text: " task to " },
                { text: "Done", bold: true },
            ],
        },
    ],
    Yesterday: [
        {
            id: 6,
            date: "Sunday, June 30 2020",
            type: "mention",
            content: [
                { text: "Johnny Ahmad", bold: true },
                { text: " mentioned you at " },
                { text: "Art Class", color: "#FCC43E" },
                { text: "  Homework", color: "#FCC43E" },
            ],
        },
        {
            id: 7,
            date: "Sunday, June 30 2020",
            type: "mention",
            content: [
                { text: "Nadila Adja", bold: true },
                { text: " mentioned you at " },
                { text: "Programming Homework", color: "#4D44B5" },
            ],
        },
    ],
};

const LatestActivityComp = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const renderContent = (content) =>
        content.map((part, i) => (
            <span
                key={i}
                style={{ color: part.color || "inherit" }}
                className={part.bold ? "font-[700]" : ""}
            >
                {part.text}
            </span>
        ));

    const filterActivities = (activities) => {
        if (!searchQuery.trim()) return activities;
        return activities.filter((item) =>
            item.content.some((part) =>
                part.text.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    };

    return (
        <div className="w-full h-[100vh] overflow-y-scroll bg-[#F3F4FF] p-[20px]">
            {/* Top Nav */}
            <div className="flex justify-between items-center mb-[30px]">
                <h1 className="text-[36px] font-[700] p-[20px] text-[#4D44B5]">
                    Notification &amp; Latest Activity
                </h1>
                <div className="flex items-center bg-[#fff] rounded-full px-4 py-[10px] w-[300px]">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE] ml-[20px]" />
                    <input
                        type="text"
                        placeholder="Search here..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="outline-none ml-[10px] border-none w-full text-[#A098AE] placeholder-[#A098AE]"
                    />
                </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-[20px] p-[40px] shadow-sm">
                {Object.entries(activityData).map(([group, items]) => {
                    const filtered = filterActivities(items);
                    if (filtered.length === 0) return null;
                    return (
                        <div key={group} className="mb-[40px]">
                            {/* Group Label */}
                            <h2 className="text-[#303972] text-[22px] font-[700] mb-[25px]">
                                {group}
                            </h2>

                            {/* Timeline */}
                            <div className="relative">
                                {/* Vertical line */}
                                <div className="absolute left-[10px] top-0 bottom-0 w-[2px] bg-[#E8E9FD]"></div>

                                <div className="flex flex-col gap-[28px]">
                                    {filtered.map((item) => (
                                        <div key={item.id} className="flex gap-[25px]">
                                            {/* Dot */}
                                            <div className="flex-shrink-0 w-[22px] h-[22px] mt-[2px] z-10">
                                                <div className="w-[22px] h-[22px] rounded-full bg-[#4D44B5] border-[3px] border-white shadow-[0_0_0_2px_#4D44B5]"></div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 pb-[4px]">
                                                <p className="text-[#A098AE] text-[13px] mb-[6px]">
                                                    {item.date}
                                                </p>
                                                <p className="text-[#303972] text-[15px] leading-relaxed">
                                                    {renderContent(item.content)}
                                                </p>

                                                {/* File thumbnails */}
                                                {item.images && (
                                                    <div className="flex gap-[15px] mt-[15px] flex-wrap">
                                                        {item.images.map((_, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="w-[175px] h-[110px] bg-[#C1BBEB] rounded-[12px] cursor-pointer hover:opacity-80 transition-opacity"
                                                            ></div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Empty state */}
                {Object.values(activityData).every(
                    (items) => filterActivities(items).length === 0
                ) && (
                    <div className="text-center py-[60px]">
                        <p className="text-[#A098AE] text-[16px]">No activities found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default LatestActivityComp;
