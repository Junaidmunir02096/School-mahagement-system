import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";

const EventComp = () => {
    const currentDate = new Date();
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Generate year range (10 years back to 5 years forward)
    const currentYearValue = new Date().getFullYear();
    const years = Array.from({ length: 16 }, (_, i) => currentYearValue - 10 + i);

    // Sample events data
    const events = {
        "2-0-2021": { dots: ["bg-[#FCC43E]", "bg-[#FB7D5B]", "bg-[#C1BBEB]"] },
        "6-0-2021": {
            highlight: "bg-[#FB7D5B]",
            hasIndicator: true,
            indicatorCount: 24
        },
        "10-0-2021": {
            highlight: "bg-[#4D44B5]",
            text: "Karen, 2+",
            textColor: "text-white"
        },
        "15-0-2021": {
            dots: ["bg-[#C1BBEB]", "bg-[#C1BBEB]"],
            hasIndicator: true,
            indicatorCount: 24
        },
        "18-0-2021": {
            text: "Tony, 2+",
            textColor: "text-[#303972]",
            border: "border-[#E5E5E5]"
        },
        "20-0-2021": {
            border: "border-[#FCC43E] border-2",
            dots: ["bg-[#4D44B5]", "bg-[#FB7D5B]", "bg-[#FCC43E]"]
        },
        "24-0-2021": {
            dots: ["bg-[#4D44B5]", "bg-[#FCC43E]", "bg-[#FB7D5B]"]
        },
        "29-0-2021": {
            text: "Johnny",
            textColor: "text-[#303972]",
            leftBorder: "border-l-4 border-l-[#FCC43E]"
        }
    };

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
        const day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1; // Convert Sunday (0) to 6, and shift others
    };

    const generateCalendar = () => {
        const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
        const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
        const daysInPrevMonth = getDaysInMonth(selectedMonth - 1, selectedYear);

        const calendar = [];

        // Previous month days
        for (let i = firstDay - 1; i >= 0; i--) {
            calendar.push({
                day: daysInPrevMonth - i,
                isCurrentMonth: false,
                isPrevMonth: true
            });
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            calendar.push({
                day: i,
                isCurrentMonth: true,
                isPrevMonth: false
            });
        }

        // Next month days to fill the grid
        const remainingDays = 42 - calendar.length; // 6 rows * 7 days
        for (let i = 1; i <= remainingDays; i++) {
            calendar.push({
                day: i,
                isCurrentMonth: false,
                isPrevMonth: false
            });
        }

        return calendar;
    };

    const getEventKey = (day) => {
        return `${day}-${selectedMonth}-${selectedYear}`;
    };

    const calendarDays = generateCalendar();

    return (
        <div className="w-full h-[100vh] overflow-y-scroll bg-[#F3F4FF] p-[20px]">
            <div className="flex justify-between items-center">
                <h1 className="text-[36px] font-[700] text-center p-[20px] text-[#4D44B5]">Events</h1>
                <div className="flex items-center   bg-[#fff] rounded-full px-4 py-[10px] w-[300px]">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE] ml-[20px]" />
                    <input type="text" placeholder="Search here..." className="outline-none ml-[10px] border-none ml-2 w-full text-[#A098AE] placeholder-[#A098AE]" />
                </div>
            </div>
            <div className="bg-[#9191912b] rounded-[5px] shadow-md p-[30px] max-w-[1200px]">
                {/* Header */}
                <div className="flex justify-between items-center mb-[30px]">
                    <h1 className="text-[32px] font-[700] text-[#303972]">Calendar</h1>

                    <div className="flex items-center gap-[15px]">
                        {/* Month Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsMonthDropdownOpen(!isMonthDropdownOpen);
                                    setIsYearDropdownOpen(false);
                                }}
                                className="px-[20px] py-[12px] border-2 border-[#E5E5E5] rounded-[40px] text-[#4D44B5] font-[600] text-[14px] flex items-center gap-[10px] hover:border-[#4D44B5] transition-colors min-w-[130px]"
                            >
                                {months[selectedMonth]}
                                <FontAwesomeIcon icon={faChevronDown} className="text-[12px]" />
                            </button>

                            {isMonthDropdownOpen && (
                                <div className="absolute top-[50px] left-0 bg-white border-2 border-[#E5E5E5] rounded-[10px] shadow-lg z-10 max-h-[300px] overflow-y-auto w-[130px]">
                                    {months.map((month, index) => (
                                        <button
                                            key={month}
                                            onClick={() => {
                                                setSelectedMonth(index);
                                                setIsMonthDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-[20px] py-[10px] hover:bg-[#F3F4FF] transition-colors ${selectedMonth === index ? "bg-[#F3F4FF] text-[#4D44B5] font-[600]" : "text-[#303972]"
                                                }`}
                                        >
                                            {month}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Year Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsYearDropdownOpen(!isYearDropdownOpen);
                                    setIsMonthDropdownOpen(false);
                                }}
                                className="px-[20px] py-[12px] border-2 border-[#E5E5E5] rounded-[40px] text-[#4D44B5] font-[600] text-[14px] flex items-center gap-[10px] hover:border-[#4D44B5] transition-colors min-w-[110px]"
                            >
                                {selectedYear}
                                <FontAwesomeIcon icon={faChevronDown} className="text-[12px]" />
                            </button>

                            {isYearDropdownOpen && (
                                <div className="absolute top-[50px] left-0 bg-white border-2 border-[#E5E5E5] rounded-[10px] shadow-lg z-10 max-h-[300px] overflow-y-auto w-[110px]">
                                    {years.map((year) => (
                                        <button
                                            key={year}
                                            onClick={() => {
                                                setSelectedYear(year);
                                                setIsYearDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-[20px] py-[10px] hover:bg-[#F3F4FF] transition-colors ${selectedYear === year ? "bg-[#F3F4FF] text-[#4D44B5] font-[600]" : "text-[#303972]"
                                                }`}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* New Student Button */}
                        <button className="px-[25px] py-[12px] bg-[#4D44B5] text-white rounded-[40px] font-[600] text-[14px] flex items-center gap-[8px] hover:bg-[#3d3591] transition-colors">
                            <FontAwesomeIcon icon={faPlus} className="text-[12px]" />
                            New Student
                        </button>
                    </div>
                </div>

                {/* Week Days Header */}
                <div className="grid grid-cols-7 gap-[10px] mb-[10px]">
                    {weekDays.map((day) => (
                        <div key={day} className="text-center text-[#A098AE] text-[12px] font-[600] py-[10px]">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-[10px]">
                    {calendarDays.map((dateObj, index) => {
                        const eventKey = getEventKey(dateObj.day);
                        const event = dateObj.isCurrentMonth ? events[eventKey] : null;

                        return (
                            <div
                                key={index}
                                className={`
                                    aspect-square rounded-[10px] p-[10px] border-2 relative
                                    ${event?.highlight ? event.highlight : "bg-white"}
                                    ${event?.border ? event.border : "border-[#E5E5E5]"}
                                    ${event?.leftBorder ? event.leftBorder : ""}
                                    ${!dateObj.isCurrentMonth ? "opacity-40" : ""}
                                    ${dateObj.isCurrentMonth && !event?.highlight ? "hover:border-[#4D44B5] cursor-pointer" : ""}
                                    transition-all duration-200
                                `}
                            >
                                {/* Day Number */}
                                <div className={`text-[18px] font-[600] ${event?.textColor === "text-white" ? "text-white" : "text-[#303972]"
                                    }`}>
                                    {dateObj.day}
                                </div>

                                {/* Event Text */}
                                {event?.text && (
                                    <div className={`text-[10px] font-[500] mt-[5px] ${event.textColor}`}>
                                        {event.text}
                                    </div>
                                )}

                                {/* Indicator Badge */}
                                {event?.hasIndicator && (
                                    <div className="absolute top-[10px] right-[10px] bg-white text-[#4D44B5] text-[10px] font-[700] w-[24px] h-[24px] rounded-full flex items-center justify-center border-2 border-[#4D44B5]">
                                        {event.indicatorCount}
                                    </div>
                                )}

                                {/* Colored Dots */}
                                {event?.dots && (
                                    <div className="absolute bottom-[10px] left-1/2 transform -translate-x-1/2 flex gap-[4px]">
                                        {event.dots.map((color, i) => (
                                            <div
                                                key={i}
                                                className={`w-[8px] h-[8px] rounded-full ${color}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default EventComp;   