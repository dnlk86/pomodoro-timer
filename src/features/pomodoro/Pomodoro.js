import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, selectStatus } from "./pomodoroSlice";
import styles from "./Pomodoro.module.css";

export function Pomodoro() {
    const count = useSelector(selectStatus);
    const dispatch = useDispatch();

    return (
        <div className={styles.pomodoroBackground}>
            <div className={styles.pomodoroBody}>
                <div className={styles.leavesContainer}>
                    <div className={styles.leafLeft}></div>
                    <div className={styles.leafMiddle}></div>
                    <div className={styles.leafRight}></div>
                </div>
                <div className={styles.pomodoroLeft}></div>
                <div className={styles.pomodoroRight}></div>
                <div className={styles.timerDisplay}>
                    <div className={styles.minutes}>30</div>
                    <div className={styles.seconds}>59</div>
                </div>
            </div>
        </div>
    );
}
