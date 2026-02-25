import { createSlice } from "@reduxjs/toolkit";
import { teacherData } from "../../utils/mockData/teacherData";

const AVATAR_COLORS = [
    "bg-[#C1BBEB]",
    "bg-[#FB7D5B]",
    "bg-[#FCC43E]",
    "bg-[#4D44B5]",
    "bg-[#4CAF79]",
];

const teachersSlice = createSlice({
    name: "teachers",
    initialState: {
        teachers: teacherData,
        searchQuery: "",
        filterSubject: "All",
    },
    reducers: {
        addTeacher: (state, action) => {
            const {
                firstName, lastName, email, phone,
                subject, dateOfBirth, placeOfBirth,
                address, university, degree, city,
            } = action.payload;

            const name = `${firstName} ${lastName}`.trim();
            const avatar = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
            const newId = state.teachers.length > 0
                ? Math.max(...state.teachers.map((t) => t.id)) + 1
                : 1;
            const avatarColor = AVATAR_COLORS[newId % AVATAR_COLORS.length];

            state.teachers.push({
                id: newId,
                name,
                subject: subject ?? "General",
                phone: phone ?? "",
                email: email ?? "",
                avatar,
                avatarColor,
                dateOfBirth: dateOfBirth ?? "",
                placeOfBirth: placeOfBirth ?? "",
                address: address ?? "",
                university: university ?? "",
                degree: degree ?? "",
                city: city ?? "",
                joinedDate: new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
            });
        },

        deleteTeacher: (state, action) => {
            state.teachers = state.teachers.filter((t) => t.id !== action.payload);
        },

        updateTeacher: (state, action) => {
            const index = state.teachers.findIndex((t) => t.id === action.payload.id);
            if (index !== -1) {
                state.teachers[index] = { ...state.teachers[index], ...action.payload };
            }
        },

        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },

        setFilterSubject: (state, action) => {
            state.filterSubject = action.payload;
        },
    },
});

export const { addTeacher, deleteTeacher, updateTeacher, setSearchQuery, setFilterSubject } =
    teachersSlice.actions;

// ── Selectors ─────────────────────────────────────────────────────────────────
export const selectAllTeachers  = (state) => state.teachers.teachers;
export const selectTeacherCount = (state) => state.teachers.teachers.length;
export const selectTeacherSearch = (state) => state.teachers.searchQuery;
export const selectTeacherFilter = (state) => state.teachers.filterSubject;

export default teachersSlice.reducer;
