import { createSlice } from "@reduxjs/toolkit";
import { addStudent, deleteStudent } from "./studentsSlice";
import { addTeacher, deleteTeacher } from "./teachersSlice";
import { submitAttendance } from "./attendanceSlice";
import { markAsPaid } from "./financeSlice";
import { addEvent, deleteEvent } from "./eventsSlice";

// ── Activity type display config ──────────────────────────────────────────────
export const ACTIVITY_CONFIG = {
    student_added:        { label: "Student Enrolled",     color: "#4D44B5", bg: "#EEEDFA" },
    student_deleted:      { label: "Student Removed",      color: "#FB7D5B", bg: "#FFF0EC" },
    teacher_added:        { label: "Teacher Joined",       color: "#4CAF79", bg: "#EBF7F1" },
    teacher_deleted:      { label: "Teacher Removed",      color: "#FB7D5B", bg: "#FFF0EC" },
    attendance_submitted: { label: "Attendance Submitted", color: "#FCC43E", bg: "#FFF8E6" },
    payment_received:     { label: "Payment Received",     color: "#4CAF79", bg: "#EBF7F1" },
    event_created:        { label: "Event Scheduled",      color: "#4D44B5", bg: "#EEEDFA" },
    event_deleted:        { label: "Event Cancelled",      color: "#FB7D5B", bg: "#FFF0EC" },
};

// ── ID counter (module-level, stable per session) ─────────────────────────────
let _nextId = 200;
const nextId = () => ++_nextId;

// ── Seed timestamps relative to now so grouping always works ─────────────────
const now = Date.now();
const hoursAgo = (h) => new Date(now - h * 3_600_000).toISOString();

// ── Seed data — mirrors real actions that already happened in the app ─────────
const seedActivities = [
    // ── Today ──────────────────────────────────────────────────────────────────
    {
        id: 1,
        type: "attendance_submitted",
        timestamp: hoursAgo(1),
        actor: "Mr. James Carter",
        subject: "VII A – Mathematics",
        meta: "28 present · 2 absent · 1 late",
        message: [
            { text: "Mr. James Carter", bold: true },
            { text: " submitted attendance for " },
            { text: "VII A – Mathematics", highlight: true },
        ],
    },
    {
        id: 2,
        type: "student_added",
        timestamp: hoursAgo(2),
        actor: "Admin",
        subject: "Samanta William",
        meta: "Grade VII A",
        message: [
            { text: "Admin", bold: true },
            { text: " enrolled new student " },
            { text: "Samanta William", highlight: true },
            { text: " in class VII A" },
        ],
    },
    {
        id: 3,
        type: "payment_received",
        timestamp: hoursAgo(4),
        actor: "Finance",
        subject: "Tony Soap",
        meta: "$50,036 · Class VII A",
        message: [
            { text: "Finance", bold: true },
            { text: " recorded payment of $50,036 from " },
            { text: "Tony Soap", highlight: true },
        ],
    },
    {
        id: 4,
        type: "event_created",
        timestamp: hoursAgo(6),
        actor: "Admin",
        subject: "Staff Meeting",
        meta: "Feb 24 · Meeting",
        message: [
            { text: "Admin", bold: true },
            { text: " scheduled event " },
            { text: "Staff Meeting", highlight: true },
            { text: " for Feb 24, 2026" },
        ],
    },

    // ── Yesterday ──────────────────────────────────────────────────────────────
    {
        id: 5,
        type: "teacher_added",
        timestamp: hoursAgo(26),
        actor: "Admin",
        subject: "Ms. Rachel Green",
        meta: "Subject: Biology",
        message: [
            { text: "Admin", bold: true },
            { text: " added new teacher " },
            { text: "Ms. Rachel Green", highlight: true },
            { text: " for Biology" },
        ],
    },
    {
        id: 6,
        type: "attendance_submitted",
        timestamp: hoursAgo(28),
        actor: "Ms. Rachel Green",
        subject: "VIII A – Biology",
        meta: "30 present · 1 absent",
        message: [
            { text: "Ms. Rachel Green", bold: true },
            { text: " submitted attendance for " },
            { text: "VIII A – Biology", highlight: true },
        ],
    },
    {
        id: 7,
        type: "student_added",
        timestamp: hoursAgo(30),
        actor: "Admin",
        subject: "Jordan Nico",
        meta: "Grade VII A",
        message: [
            { text: "Admin", bold: true },
            { text: " enrolled new student " },
            { text: "Jordan Nico", highlight: true },
            { text: " in class VII A" },
        ],
    },

    // ── This Week ──────────────────────────────────────────────────────────────
    {
        id: 8,
        type: "payment_received",
        timestamp: hoursAgo(52),
        actor: "Finance",
        subject: "Karen Hope",
        meta: "$50,036 · Class VII A",
        message: [
            { text: "Finance", bold: true },
            { text: " recorded payment of $50,036 from " },
            { text: "Karen Hope", highlight: true },
        ],
    },
    {
        id: 9,
        type: "event_created",
        timestamp: hoursAgo(54),
        actor: "Admin",
        subject: "Mid-term Exams",
        meta: "Feb 15 · Exam · Classes VII A, VII B, VIII A",
        message: [
            { text: "Admin", bold: true },
            { text: " scheduled " },
            { text: "Mid-term Exams", highlight: true },
            { text: " for classes VII A, VII B, VIII A" },
        ],
    },
    {
        id: 10,
        type: "student_deleted",
        timestamp: hoursAgo(56),
        actor: "Admin",
        subject: "Chris Nolan",
        meta: "Grade VIII B",
        message: [
            { text: "Admin", bold: true },
            { text: " removed student " },
            { text: "Chris Nolan", highlight: true },
            { text: " from class VIII B" },
        ],
    },
];

// ── Slice ─────────────────────────────────────────────────────────────────────
const activitiesSlice = createSlice({
    name: "activities",
    initialState: { activities: seedActivities },
    reducers: {
        // Manual log — for any custom activity not covered by extraReducers
        logActivity: (state, action) => {
            state.activities.unshift({
                id: nextId(),
                timestamp: new Date().toISOString(),
                ...action.payload,
            });
        },
    },

    // ── Auto-log when other slices dispatch their actions ──────────────────────
    extraReducers: (builder) => {

        // Student enrolled
        builder.addCase(addStudent, (state, action) => {
            const { firstName, lastName, grade } = action.payload;
            const name = `${firstName} ${lastName}`.trim();
            state.activities.unshift({
                id: nextId(),
                type: "student_added",
                timestamp: new Date().toISOString(),
                actor: "Admin",
                subject: name,
                meta: `Grade ${grade ?? ""}`,
                message: [
                    { text: "Admin", bold: true },
                    { text: " enrolled new student " },
                    { text: name, highlight: true },
                    { text: grade ? ` in class ${grade}` : "" },
                ],
            });
        });

        // Student removed
        builder.addCase(deleteStudent, (state) => {
            state.activities.unshift({
                id: nextId(),
                type: "student_deleted",
                timestamp: new Date().toISOString(),
                actor: "Admin",
                subject: "Student",
                meta: "",
                message: [
                    { text: "Admin", bold: true },
                    { text: " removed a student from the system" },
                ],
            });
        });

        // Teacher joined
        builder.addCase(addTeacher, (state, action) => {
            const { firstName, lastName, subject } = action.payload;
            const name = `${firstName} ${lastName}`.trim();
            state.activities.unshift({
                id: nextId(),
                type: "teacher_added",
                timestamp: new Date().toISOString(),
                actor: "Admin",
                subject: name,
                meta: `Subject: ${subject ?? "General"}`,
                message: [
                    { text: "Admin", bold: true },
                    { text: " added new teacher " },
                    { text: name, highlight: true },
                    { text: subject ? ` for ${subject}` : "" },
                ],
            });
        });

        // Teacher removed
        builder.addCase(deleteTeacher, (state) => {
            state.activities.unshift({
                id: nextId(),
                type: "teacher_deleted",
                timestamp: new Date().toISOString(),
                actor: "Admin",
                subject: "Teacher",
                meta: "",
                message: [
                    { text: "Admin", bold: true },
                    { text: " removed a teacher from the system" },
                ],
            });
        });

        // Attendance submitted (records array from the action payload)
        builder.addCase(submitAttendance, (state, action) => {
            const { className, subject, records = [] } = action.payload;
            const counts = records.reduce(
                (acc, r) => { acc[r.status] = (acc[r.status] || 0) + 1; return acc; },
                { present: 0, absent: 0, late: 0 }
            );
            state.activities.unshift({
                id: nextId(),
                type: "attendance_submitted",
                timestamp: new Date().toISOString(),
                actor: "Teacher",
                subject: `${className} – ${subject}`,
                meta: `${counts.present} present · ${counts.absent} absent · ${counts.late} late`,
                message: [
                    { text: "Teacher", bold: true },
                    { text: " submitted attendance for " },
                    { text: `${className} – ${subject}`, highlight: true },
                ],
            });
        });

        // Payment marked as received (payload = student id only)
        builder.addCase(markAsPaid, (state) => {
            state.activities.unshift({
                id: nextId(),
                type: "payment_received",
                timestamp: new Date().toISOString(),
                actor: "Finance",
                subject: "Student",
                meta: "Payment cleared",
                message: [
                    { text: "Finance", bold: true },
                    { text: " marked a student payment as received" },
                ],
            });
        });

        // Event created
        builder.addCase(addEvent, (state, action) => {
            const { title, date, type: evType } = action.payload;
            state.activities.unshift({
                id: nextId(),
                type: "event_created",
                timestamp: new Date().toISOString(),
                actor: "Admin",
                subject: title,
                meta: `${date ?? ""} · ${evType ?? "event"}`,
                message: [
                    { text: "Admin", bold: true },
                    { text: " scheduled event " },
                    { text: title, highlight: true },
                ],
            });
        });

        // Event cancelled
        builder.addCase(deleteEvent, (state) => {
            state.activities.unshift({
                id: nextId(),
                type: "event_deleted",
                timestamp: new Date().toISOString(),
                actor: "Admin",
                subject: "Event",
                meta: "",
                message: [
                    { text: "Admin", bold: true },
                    { text: " cancelled an event" },
                ],
            });
        });
    },
});

export const { logActivity } = activitiesSlice.actions;
export const selectActivities = (state) => state.activities.activities;
export default activitiesSlice.reducer;
