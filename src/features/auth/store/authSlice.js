import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../services/firebase";

// ── Async Thunks ──────────────────────────────────────────────────────────────

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            return {
                uid:         user.uid,
                email:       user.email,
                displayName: user.displayName ?? email.split("@")[0],
                photoURL:    user.photoURL ?? null,
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async ({ email, password, name }, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            return {
                uid:         user.uid,
                email:       user.email,
                displayName: name ?? email.split("@")[0],
                photoURL:    null,
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const loginWithGoogle = createAsyncThunk(
    "auth/loginWithGoogle",
    async (_, { rejectWithValue }) => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            return {
                uid:         user.uid,
                email:       user.email,
                displayName: user.displayName,
                photoURL:    user.photoURL,
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// ── Slice ─────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user:            null,   // { uid, email, displayName, photoURL }
        isAuthenticated: false,
        role:            null,   // "admin" | "teacher" | null
        loading:         false,
        error:           null,
    },
    reducers: {
        // Called by Firebase's onAuthStateChanged listener in main.jsx/App.jsx
        setUser: (state, action) => {
            state.user            = action.payload;
            state.isAuthenticated = !!action.payload;
            state.error           = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
    },
    extraReducers: (builder) => {
        // ── loginUser ──────────────────────────────────────────────────────────
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error   = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading        = false;
                state.user           = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error   = action.payload;
            });

        // ── signupUser ─────────────────────────────────────────────────────────
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error   = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading        = false;
                state.user           = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error   = action.payload;
            });

        // ── loginWithGoogle ────────────────────────────────────────────────────
        builder
            .addCase(loginWithGoogle.pending, (state) => {
                state.loading = true;
                state.error   = null;
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.loading        = false;
                state.user           = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.loading = false;
                state.error   = action.payload;
            });

        // ── logoutUser ─────────────────────────────────────────────────────────
        builder
            .addCase(logoutUser.fulfilled, (state) => {
                state.user           = null;
                state.isAuthenticated = false;
                state.role           = null;
                state.loading        = false;
                state.error          = null;
            });
    },
});

export const { setUser, clearError, setRole } = authSlice.actions;

// ── Selectors ─────────────────────────────────────────────────────────────────
export const selectUser            = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading     = (state) => state.auth.loading;
export const selectAuthError       = (state) => state.auth.error;
export const selectRole            = (state) => state.auth.role;

export default authSlice.reducer;
