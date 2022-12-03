import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timer: 25,
    break: 5,
    status: "idle", // status: idle, start, pause, break, end
    remainingTime: 1500, // seconds
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
                case "start":
                    console.log("start");

                    break;
                case "pause":
                    console.log("pause");
                    break;
                case "break":
                    state.remainingTime = state.break * 60;
                    state.status = "break";
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
        countdown: (state) => {
            state.remainingTime -= 1;
            console.log(state.remainingTime);
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
