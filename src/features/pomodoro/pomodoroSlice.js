import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timer: 25,
    break: 5,
    status: "session", // status: session, break
    remainingTime: 1500, // seconds
    timerOn: false,
    isPaused: true,
};

export const PomodoroSlice = createSlice({
    name: "pomodoro",
    initialState,
    reducers: {
        changeStatus: (state, action) => {
            state.status = action.payload;
            switch (action.payload) {
                case "session":
                    state.timer = initialState.timer;
                    state.break = initialState.break;
                    state.remainingTime = initialState.remainingTime;
                    state.timerOn = initialState.timerOn;
                    state.isPaused = initialState.isPaused;
                    let docstyle = document.documentElement.style;
                    docstyle.setProperty(
                        "--background-animation-state",
                        "running"
                    );
                    docstyle.setProperty(
                        "--background-animation-gradient",
                        "conic-gradient(#656565 90deg, #b3b3b3 180deg, white 360deg)"
                    );
                    console.log("session");
                    break;
                case "break":
                    state.remainingTime = state.break * 60;
                    console.log("break");
                    break;
                default:
                    break;
            }
        },
        changeIsPaused: (state, action) => {
            state.isPaused = action.payload;
            console.log(`pause: ${state.isPaused}`);
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
            if (state.remainingTime >= 0) {
                state.remainingTime -= 1;
                console.log(state.remainingTime);
            }
        },
    },
});

export const { changeStatus, increment, decrement, countdown, changeIsPaused } =
    PomodoroSlice.actions;

export const selectTimer = (state) => state.pomodoro.timer;
export const selectBreak = (state) => state.pomodoro.break;
export const selectStatus = (state) => state.pomodoro.status;
export const selectRemainingTime = (state) => state.pomodoro.remainingTime;
export const selectIsPaused = (state) => state.pomodoro.isPaused;

export default PomodoroSlice.reducer;
