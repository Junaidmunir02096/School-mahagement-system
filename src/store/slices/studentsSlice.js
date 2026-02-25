import { createSlice } from "@reduxjs/toolkit";
import { studentsData } from "../../utils/mockData/studentsData";

const GRADE_COLORS = [
    "bg-[#FB7D5B]",
    "bg-[#FCC43E]",
    "bg-[#4D44B5]",
    "bg-[#4CAF79]",
    "bg-[#A098AE]",
];

const studentsSlice = createSlice({
    name: "students",
    initialState: {
        students: studentsData,
        searchQuery: "",
        filterGrade: "All",
    },
    reducers: {
        addStudent: (state, action) => {
            const { firstName, lastName, email, phone, parentName, grade, city, address, paymentStatus } = action.payload;
            const name = `${firstName} ${lastName}`.trim();
            const avatar = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
            const newId = state.students.length > 0
                ? Math.max(...state.students.map((s) => s.id)) + 1
                : 1;
            const gradeColor = GRADE_COLORS[newId % GRADE_COLORS.length];
            const studentId = `#${String(100000000 + newId).padStart(9, "0")}`;

            state.students.push({
                id: newId,
                name,
                studentId,
                date: new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
                parentName: parentName ?? "",
                city: city ?? "",
                phone: phone ?? "",
                email: email ?? "",
                grade: grade ?? "VII A",
                gradeColor,
                avatar,
                address: address ?? "",
                paymentStatus: paymentStatus ?? "unpaid",
            });
        },

        deleteStudent: (state, action) => {
            state.students = state.students.filter((s) => s.id !== action.payload);
        },

        updateStudent: (state, action) => {
            const index = state.students.findIndex((s) => s.id === action.payload.id);
            if (index !== -1) {
                state.students[index] = { ...state.students[index], ...action.payload };
            }
        },

        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },

        setFilterGrade: (state, action) => {
            state.filterGrade = action.payload;
        },
    },
});

export const { addStudent, deleteStudent, updateStudent, setSearchQuery, setFilterGrade } =
    studentsSlice.actions;

// ── Selectors ─────────────────────────────────────────────────────────────────
export const selectAllStudents     = (state) => state.students.students;
export const selectStudentCount    = (state) => state.students.students.length;
export const selectSearchQuery     = (state) => state.students.searchQuery;
export const selectFilterGrade     = (state) => state.students.filterGrade;
export const selectUnpaidStudents  = (state) =>
    state.students.students.filter((s) => s.paymentStatus === "unpaid");

export default studentsSlice.reducer;
