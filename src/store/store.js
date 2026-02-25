import { configureStore } from "@reduxjs/toolkit";
import studentsReducer  from "./slices/studentsSlice";
import teachersReducer  from "./slices/teachersSlice";
import financeReducer   from "./slices/financeSlice";
import attendanceReducer from "./slices/attendanceSlice";
import authReducer      from "./slices/authSlice";

const store = configureStore({
    reducer: {
        students:   studentsReducer,
        teachers:   teachersReducer,
        finance:    financeReducer,
        attendance: attendanceReducer,
        auth:       authReducer,
    },
});

export default store;
