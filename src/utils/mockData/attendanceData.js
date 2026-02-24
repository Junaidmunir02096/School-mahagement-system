// ─── Classes ────────────────────────────────────────────────────────────────
export const classesData = [
    { id: "C001", name: "VII A",  grade: 7, section: "A", totalStudents: 35, classTeacher: "Dimitres Viga"   },
    { id: "C002", name: "VII B",  grade: 7, section: "B", totalStudents: 32, classTeacher: "Dana Benevista"  },
    { id: "C003", name: "VIII A", grade: 8, section: "A", totalStudents: 38, classTeacher: "Tom Housenburg"  },
    { id: "C004", name: "VIII B", grade: 8, section: "B", totalStudents: 30, classTeacher: "Maria Historia"  },
    { id: "C005", name: "IX A",   grade: 9, section: "A", totalStudents: 33, classTeacher: "Jack Sally"      },
    { id: "C006", name: "IX B",   grade: 9, section: "B", totalStudents: 31, classTeacher: "Robert Johnson"  },
];

// ─── Subjects ────────────────────────────────────────────────────────────────
export const subjectsData = [
    "Mathematics", "Science", "English", "History",
    "Physics", "Chemistry", "Biology", "Art",
    "Computer Science", "Geography",
];

// ─── Today's Class-wise Attendance (for Overview page) ───────────────────────
export const todayClassAttendance = [
    { id: "C001", class: "VII A",  teacher: "Dimitres Viga",   subject: "Mathematics", totalStudents: 35, present: 30, absent: 3, late: 2, status: "Completed" },
    { id: "C002", class: "VII B",  teacher: "Dana Benevista",  subject: "Science",     totalStudents: 32, present: 28, absent: 2, late: 2, status: "Completed" },
    { id: "C003", class: "VIII A", teacher: "Tom Housenburg",  subject: "History",     totalStudents: 38, present: 35, absent: 2, late: 1, status: "Completed" },
    { id: "C004", class: "VIII B", teacher: "Maria Historia",  subject: "English",     totalStudents: 30, present: 25, absent: 4, late: 1, status: "Pending"   },
    { id: "C005", class: "IX A",   teacher: "Jack Sally",      subject: "Physics",     totalStudents: 33, present: 30, absent: 2, late: 1, status: "Pending"   },
    { id: "C006", class: "IX B",   teacher: "Robert Johnson",  subject: "Chemistry",   totalStudents: 31, present: 28, absent: 3, late: 0, status: "Completed" },
];

// ─── Students list for Mark Attendance page ───────────────────────────────────
export const classStudentsForAttendance = [
    { id: 1,  name: "Samanta William", studentId: "#STU001", avatar: "SW", avatarColor: "bg-[#C1BBEB]" },
    { id: 2,  name: "Tony Soap",       studentId: "#STU002", avatar: "TS", avatarColor: "bg-[#FB7D5B]" },
    { id: 3,  name: "Karen Hope",      studentId: "#STU003", avatar: "KH", avatarColor: "bg-[#4D44B5]" },
    { id: 4,  name: "Jordan Nico",     studentId: "#STU004", avatar: "JN", avatarColor: "bg-[#FCC43E]" },
    { id: 5,  name: "Nadila Adja",     studentId: "#STU005", avatar: "NA", avatarColor: "bg-[#C1BBEB]" },
    { id: 6,  name: "Johnny Ahmad",    studentId: "#STU006", avatar: "JA", avatarColor: "bg-[#FB7D5B]" },
    { id: 7,  name: "Alice Smith",     studentId: "#STU007", avatar: "AS", avatarColor: "bg-[#4D44B5]" },
    { id: 8,  name: "Bob Johnson",     studentId: "#STU008", avatar: "BJ", avatarColor: "bg-[#FCC43E]" },
    { id: 9,  name: "Clara White",     studentId: "#STU009", avatar: "CW", avatarColor: "bg-[#C1BBEB]" },
    { id: 10, name: "David Lee",       studentId: "#STU010", avatar: "DL", avatarColor: "bg-[#FB7D5B]" },
    { id: 11, name: "Emma Wilson",     studentId: "#STU011", avatar: "EW", avatarColor: "bg-[#4D44B5]" },
    { id: 12, name: "Frank Davis",     studentId: "#STU012", avatar: "FD", avatarColor: "bg-[#FCC43E]" },
];

// ─── Student Attendance Report data ───────────────────────────────────────────
export const studentAttendanceReport = [
    { id: 1,  name: "Samanta William", studentId: "#STU001", avatar: "SW", grade: "VII A",  present: 18, absent: 2, late: 1, total: 21, avatarColor: "bg-[#C1BBEB]" },
    { id: 2,  name: "Tony Soap",       studentId: "#STU002", avatar: "TS", grade: "VII B",  present: 20, absent: 1, late: 0, total: 21, avatarColor: "bg-[#FB7D5B]" },
    { id: 3,  name: "Karen Hope",      studentId: "#STU003", avatar: "KH", grade: "VII A",  present: 15, absent: 5, late: 1, total: 21, avatarColor: "bg-[#4D44B5]" },
    { id: 4,  name: "Jordan Nico",     studentId: "#STU004", avatar: "JN", grade: "VIII A", present: 21, absent: 0, late: 0, total: 21, avatarColor: "bg-[#FCC43E]" },
    { id: 5,  name: "Nadila Adja",     studentId: "#STU005", avatar: "NA", grade: "VIII B", present: 19, absent: 1, late: 1, total: 21, avatarColor: "bg-[#C1BBEB]" },
    { id: 6,  name: "Johnny Ahmad",    studentId: "#STU006", avatar: "JA", grade: "IX A",   present: 16, absent: 3, late: 2, total: 21, avatarColor: "bg-[#FB7D5B]" },
    { id: 7,  name: "Alice Smith",     studentId: "#STU007", avatar: "AS", grade: "VII A",  present: 21, absent: 0, late: 0, total: 21, avatarColor: "bg-[#4D44B5]" },
    { id: 8,  name: "Bob Johnson",     studentId: "#STU008", avatar: "BJ", grade: "IX B",   present: 14, absent: 6, late: 1, total: 21, avatarColor: "bg-[#FCC43E]" },
    { id: 9,  name: "Clara White",     studentId: "#STU009", avatar: "CW", grade: "VII B",  present: 20, absent: 0, late: 1, total: 21, avatarColor: "bg-[#C1BBEB]" },
    { id: 10, name: "David Lee",       studentId: "#STU010", avatar: "DL", grade: "VIII A", present: 17, absent: 3, late: 1, total: 21, avatarColor: "bg-[#FB7D5B]" },
    { id: 11, name: "Emma Wilson",     studentId: "#STU011", avatar: "EW", grade: "IX A",   present: 19, absent: 2, late: 0, total: 21, avatarColor: "bg-[#4D44B5]" },
    { id: 12, name: "Frank Davis",     studentId: "#STU012", avatar: "FD", grade: "VIII B", present: 13, absent: 7, late: 1, total: 21, avatarColor: "bg-[#FCC43E]" },
];

// ─── Weekly Attendance Summary (for bar chart) ─────────────────────────────
export const weeklyAttendanceSummary = [
    { day: "Mon", present: 285, absent: 22, late: 11 },
    { day: "Tue", present: 290, absent: 18, late: 10 },
    { day: "Wed", present: 275, absent: 30, late: 13 },
    { day: "Thu", present: 288, absent: 20, late: 10 },
    { day: "Fri", present: 270, absent: 35, late: 13 },
];

// ─── Monthly Attendance Trend ──────────────────────────────────────────────
export const monthlyAttendanceTrend = [
    { month: "Aug", present: 88, absent: 8,  late: 4 },
    { month: "Sep", present: 85, absent: 11, late: 4 },
    { month: "Oct", present: 90, absent: 6,  late: 4 },
    { month: "Nov", present: 82, absent: 14, late: 4 },
    { month: "Dec", present: 87, absent: 9,  late: 4 },
    { month: "Jan", present: 91, absent: 6,  late: 3 },
    { month: "Feb", present: 89, absent: 7,  late: 4 },
];
