import { configureStore } from "@reduxjs/toolkit";
import studentsReducer    from "./slices/studentsSlice";
import teachersReducer    from "./slices/teachersSlice";
import financeReducer     from "./slices/financeSlice";
import attendanceReducer  from "./slices/attendanceSlice";
import authReducer        from "./slices/authSlice";
import eventsReducer      from "./slices/eventsSlice";
import activitiesReducer  from "./slices/activitiesSlice";

const store = configureStore({
    reducer: {
        students:   studentsReducer,
        teachers:   teachersReducer,
        finance:    financeReducer,
        attendance: attendanceReducer,
        auth:       authReducer,
        events:     eventsReducer,
        activities: activitiesReducer,
    },
});

export default store;
