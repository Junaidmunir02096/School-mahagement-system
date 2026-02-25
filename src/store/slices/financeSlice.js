import { createSlice } from "@reduxjs/toolkit";

// ── Initial unpaid students list (sourced from UnpaidStudents component) ──────
const initialUnpaidStudents = [
    { id: 1,  name: "Samantha William", studentId: "123456789", class: "VII A",  amount: 50036, status: "unpaid" },
    { id: 2,  name: "Tony Soap",        studentId: "123456789", class: "VII A",  amount: 50036, status: "unpaid" },
    { id: 3,  name: "Jordan Nico",      studentId: "123456789", class: "VII A",  amount: 50036, status: "unpaid" },
    { id: 4,  name: "Karen Hope",       studentId: "123456789", class: "VII A",  amount: 50036, status: "unpaid" },
    { id: 5,  name: "Nadila Adja",      studentId: "123456789", class: "VII A",  amount: 50036, status: "unpaid" },
    { id: 6,  name: "Alex John",        studentId: "123456789", class: "VIII A", amount: 50036, status: "unpaid" },
    { id: 7,  name: "Chris Nolan",      studentId: "123456789", class: "VIII B", amount: 50036, status: "unpaid" },
    { id: 8,  name: "Sara Khan",        studentId: "123456789", class: "IX A",   amount: 50036, status: "unpaid" },
];

// ── Weekly income data (sourced from SchoolFinanceChart component) ────────────
const initialWeeklyIncome = [
    { day: "Mon", thisWeek: 75, lastWeek: 95 },
    { day: "Tue", thisWeek: 50, lastWeek: 40 },
    { day: "Wed", thisWeek: 65, lastWeek: 70 },
    { day: "Thu", thisWeek: 40, lastWeek: 45 },
    { day: "Fri", thisWeek: 25, lastWeek: 20 },
    { day: "Sat", thisWeek: 90, lastWeek: 80 },
    { day: "Sun", thisWeek: 70, lastWeek: 60 },
];

const calculateTotal = (data, key) =>
    data.reduce((sum, d) => sum + d[key], 0);

const financeSlice = createSlice({
    name: "finance",
    initialState: {
        unpaidStudents: initialUnpaidStudents,
        weeklyIncome: initialWeeklyIncome,
        totalThisWeek: calculateTotal(initialWeeklyIncome, "thisWeek"),
        totalLastWeek: calculateTotal(initialWeeklyIncome, "lastWeek"),
    },
    reducers: {
        markAsPaid: (state, action) => {
            // action.payload = student id
            state.unpaidStudents = state.unpaidStudents.filter(
                (s) => s.id !== action.payload
            );
        },

        addPayment: (state, action) => {
            // action.payload = { day, thisWeek, lastWeek }
            const index = state.weeklyIncome.findIndex(
                (d) => d.day === action.payload.day
            );
            if (index !== -1) {
                state.weeklyIncome[index] = {
                    ...state.weeklyIncome[index],
                    ...action.payload,
                };
            } else {
                state.weeklyIncome.push(action.payload);
            }
            state.totalThisWeek = calculateTotal(state.weeklyIncome, "thisWeek");
            state.totalLastWeek = calculateTotal(state.weeklyIncome, "lastWeek");
        },
    },
});

export const { markAsPaid, addPayment } = financeSlice.actions;

// ── Selectors ─────────────────────────────────────────────────────────────────
export const selectUnpaidStudents = (state) => state.finance.unpaidStudents;
export const selectWeeklyIncome   = (state) => state.finance.weeklyIncome;
export const selectTotalThisWeek  = (state) => state.finance.totalThisWeek;
export const selectTotalLastWeek  = (state) => state.finance.totalLastWeek;

export default financeSlice.reducer;
