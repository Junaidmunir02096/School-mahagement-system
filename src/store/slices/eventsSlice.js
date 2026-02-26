import { createSlice } from "@reduxjs/toolkit";

const TYPE_COLORS = {
    meeting:  "#4D44B5",
    holiday:  "#FB7D5B",
    exam:     "#FCC43E",
    activity: "#4CAF79",
    other:    "#A098AE",
};

const initialEvents = [
    {
        id: 1,
        title: "Parent Meeting",
        date: "2026-02-06",
        color: "#4D44B5",
        type: "meeting",
        participants: ["Karen", "Tony"],
        description: "Monthly parent-teacher meeting",
    },
    {
        id: 2,
        title: "Science Fair",
        date: "2026-02-10",
        color: "#FB7D5B",
        type: "activity",
        participants: ["All Students"],
        description: "Annual science exhibition",
    },
    {
        id: 3,
        title: "Mid-term Exams",
        date: "2026-02-15",
        color: "#FCC43E",
        type: "exam",
        participants: ["VII A", "VII B", "VIII A"],
        description: "Mid-term examination week begins",
    },
    {
        id: 4,
        title: "Sports Day",
        date: "2026-02-20",
        color: "#4CAF79",
        type: "activity",
        participants: ["All Students"],
        description: "Annual sports and athletics day",
    },
    {
        id: 5,
        title: "Staff Meeting",
        date: "2026-02-24",
        color: "#4D44B5",
        type: "meeting",
        participants: ["All Teachers"],
        description: "Monthly staff coordination meeting",
    },
];

const eventsSlice = createSlice({
    name: "events",
    initialState: {
        events: initialEvents,
        selectedEventId: null,
    },
    reducers: {
        addEvent: (state, action) => {
            const newId =
                state.events.length > 0
                    ? Math.max(...state.events.map((e) => e.id)) + 1
                    : 1;
            state.events.push({
                id: newId,
                ...action.payload,
                color: action.payload.color ?? TYPE_COLORS[action.payload.type] ?? TYPE_COLORS.other,
            });
        },

        deleteEvent: (state, action) => {
            state.events = state.events.filter((e) => e.id !== action.payload);
        },

        updateEvent: (state, action) => {
            const index = state.events.findIndex((e) => e.id === action.payload.id);
            if (index !== -1) {
                state.events[index] = { ...state.events[index], ...action.payload };
            }
        },

        setSelectedEvent: (state, action) => {
            state.selectedEventId = action.payload;
        },
    },
});

export const { addEvent, deleteEvent, updateEvent, setSelectedEvent } =
    eventsSlice.actions;

// ── Selectors ─────────────────────────────────────────────────────────────────
export const selectAllEvents     = (state) => state.events.events;
export const selectEventCount    = (state) => state.events.events.length;
export const selectSelectedEvent = (state) =>
    state.events.events.find((e) => e.id === state.events.selectedEventId) ?? null;

// Returns a map: { "2026-02-10": [event, ...], ... }
export const selectEventsByDate = (state) => {
    const map = {};
    state.events.events.forEach((event) => {
        if (!map[event.date]) map[event.date] = [];
        map[event.date].push(event);
    });
    return map;
};

export const TYPE_COLOR_MAP = TYPE_COLORS;

export default eventsSlice.reducer;
