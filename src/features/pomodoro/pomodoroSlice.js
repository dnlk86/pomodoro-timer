import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timer: 25,
    break: 5,
    status: "idle", // status: idle, session, pause, break, end
    remainingTime: 1500, // seconds
    paused: false,
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
                    state.remainingTime = state.timer * 60;
                    console.log("idle");
                    break;
                case "session":
                    console.log("session");
                    break;
                case "pause":
                    console.log("pause");
                    break;
                case "break":
                    state.remainingTime = state.break * 60;
                    console.log("break");
                    break;
                case "end":
                    console.log("time is up!");
                    break;
                default:
                    break;
            }
        },
        increment: (state, action) => {
            if (state[action.payload] < 60) {
                state[action.payload] += 1;
                state.remainingTime = state.timer * 60;
            }
        },
        decrement: (state, action) => {
            if (state[action.payload] > 1) {
                state[action.payload] -= 1;
                state.remainingTime = state.timer * 60;
            }
        },
        countdown: (state) => {
            if (state.remainingTime > 0) {
                state.remainingTime -= 1;
                console.log(state.remainingTime);
            }
        },
    },
});

export const { changeStatus, increment, decrement, countdown } =
    PomodoroSlice.actions;

export const selectTimer = (state) => state.pomodoro.timer;
export const selectBreak = (state) => state.pomodoro.break;
export const selectStatus = (state) => state.pomodoro.status;
export const selectRemainingTime = (state) => state.pomodoro.remainingTime;

export default PomodoroSlice.reducer;
