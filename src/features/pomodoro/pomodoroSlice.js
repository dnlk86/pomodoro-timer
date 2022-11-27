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
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
    },
});

export const { increment, decrement } = PomodoroSlice.actions;

export const selectCount = (state) => state.counter.value;

export default PomodoroSlice.reducer;
