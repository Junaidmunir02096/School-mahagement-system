import { createSlice } from "@reduxjs/toolkit";
import {
    todayClassAttendance,
    studentAttendanceReport,
    weeklyAttendanceSummary,
    monthlyAttendanceTrend,
} from "../mock/attendanceData";

const attendanceSlice = createSlice({
    name: "attendance",
    initialState: {
        // Overview page — class-wise today's data
        classAttendance: todayClassAttendance,

        // Report page — per-student monthly summary
        studentRecords: studentAttendanceReport,

        // Mark attendance page — keyed by classId
        // { "C001": { 1: "present", 2: "absent", ... } }
        markedAttendance: {},

        // Submitted session records (for history)
        // [{ classId, className, subject, date, counts, records }]
        submittedSessions: [],

        // Charts
        weeklyStats:    weeklyAttendanceSummary,
        monthlyTrend:   monthlyAttendanceTrend,
    },
    reducers: {
        // Called on every status toggle in MarkAttendance page
        markStudentStatus: (state, action) => {
            const { classId, studentId, status } = action.payload;
            if (!state.markedAttendance[classId]) {
                state.markedAttendance[classId] = {};
            }
            state.markedAttendance[classId][studentId] = status;
        },

        // Called when teacher clicks "Submit" on MarkAttendance page
        submitAttendance: (state, action) => {
            const { classId, className, subject, date, records } = action.payload;

            const counts = records.reduce(
                (acc, r) => {
                    acc[r.status] = (acc[r.status] || 0) + 1;
                    return acc;
                },
                { present: 0, absent: 0, late: 0, excused: 0 }
            );

            // Push to submitted sessions history
            state.submittedSessions.push({
                id: Date.now(),
                classId,
                className,
                subject,
                date,
                counts,
                records,
            });

            // Update classAttendance overview row for this class
            const idx = state.classAttendance.findIndex((c) => c.id === classId);
            if (idx !== -1) {
                state.classAttendance[idx] = {
                    ...state.classAttendance[idx],
                    present: counts.present,
                    absent:  counts.absent,
                    late:    counts.late,
                    status:  "Completed",
                };
            }

            // Update monthly trend for current month
            const currentMonth = new Date(date).toLocaleString("en-US", { month: "short" });
            const totalInSession = records.length;
            const presentPct = Math.round((counts.present / totalInSession) * 100);
            const absentPct  = Math.round((counts.absent  / totalInSession) * 100);

            const trendIdx = state.monthlyTrend.findIndex((m) => m.month === currentMonth);
            if (trendIdx !== -1) {
                // Blend new session into existing monthly average
                state.monthlyTrend[trendIdx] = {
                    ...state.monthlyTrend[trendIdx],
                    present: Math.round((state.monthlyTrend[trendIdx].present + presentPct) / 2),
                    absent:  Math.round((state.monthlyTrend[trendIdx].absent  + absentPct)  / 2),
                };
            }

            // Clear mark-in-progress for this class
            delete state.markedAttendance[classId];
        },

        // Update a student's full attendance record (for report edits)
        updateStudentRecord: (state, action) => {
            const index = state.studentRecords.findIndex((r) => r.id === action.payload.id);
            if (index !== -1) {
                state.studentRecords[index] = {
                    ...state.studentRecords[index],
                    ...action.payload,
                };
            }
        },
    },
});

export const { markStudentStatus, submitAttendance, updateStudentRecord } =
    attendanceSlice.actions;

// ── Selectors ─────────────────────────────────────────────────────────────────
export const selectClassAttendance    = (state) => state.attendance.classAttendance;
export const selectStudentRecords     = (state) => state.attendance.studentRecords;
export const selectMarkedAttendance   = (state) => state.attendance.markedAttendance;
export const selectSubmittedSessions  = (state) => state.attendance.submittedSessions;
export const selectWeeklyStats        = (state) => state.attendance.weeklyStats;
export const selectMonthlyTrend       = (state) => state.attendance.monthlyTrend;

export default attendanceSlice.reducer;
