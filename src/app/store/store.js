import { configureStore } from "@reduxjs/toolkit";
import studentsReducer    from "../../features/students/store/studentsSlice";
import teachersReducer    from "../../features/teachers/store/teachersSlice";
import financeReducer     from "../../features/finance/store/financeSlice";
import attendanceReducer  from "../../features/attendance/store/attendanceSlice";
import authReducer        from "../../features/auth/store/authSlice";
import eventsReducer      from "../../features/events/store/eventsSlice";
import activitiesReducer  from "../../features/activities/store/activitiesSlice";

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
