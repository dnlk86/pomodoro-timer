import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timer: 25,
    pause: 5,
    status: "idle", // status: idle, started, paused
};

export const PomodoroSlice = createSlice({
    name: "pomodoro",
    initialState,
    reducers: {
        increment: (state, action) => {
            if (state[action.payload] < 60) {
                state[action.payload] += 1;
            }
        },
        decrement: (state, action) => {
            if (state[action.payload] > 1) {
                state[action.payload] -= 1;
            }
        },
    },
});

export const { increment, decrement } = PomodoroSlice.actions;

export const selectStatus = (state) => state.pomodoro.status;

export default PomodoroSlice.reducer;
