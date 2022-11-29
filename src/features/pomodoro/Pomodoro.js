import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, selectStatus } from "./pomodoroSlice";
import styles from "./Pomodoro.module.css";

export function Pomodoro() {
    const count = useSelector(selectStatus);
    const dispatch = useDispatch();

    return (
        <div className={styles.pomodoroBody}>
            <div className={styles.leavesContainer}>
                <div className={styles.leafLeft}></div>
                <div className={styles.leafMiddle}></div>
                <div className={styles.leafRight}></div>
            </div>
            <div className={styles.pomodoroContainer}>
                <div className={styles.pomodoroLeft}></div>
                <div className={styles.pomodoroRight}></div>
            </div>
        </div>
    );
}
