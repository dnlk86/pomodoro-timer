import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timer: 25,
    break: 5,
    status: "idle", // status: idle, started, paused
};

export const PomodoroSlice = createSlice({
    name: "pomodoro",
    initialState,
    reducers: {
        changeStatus: (state, action) => {
            state.status = action.payload;
            switch (action.payload) {
                case "idle":
                    state.timer = 25;
                    state.break = 5;
                    console.log("idle");
                    break;
                case "started":
                    console.log("started");
                    break;
                case "paused":
                    console.log("paused");
                    break;
            }
        },
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

export const { changeStatus, increment, decrement } = PomodoroSlice.actions;

export const selectTimer = (state) => state.pomodoro.timer;
export const selectBreak = (state) => state.pomodoro.break;
export const selectStatus = (state) => state.pomodoro.status;

export default PomodoroSlice.reducer;
