import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, selectStatus } from "./pomodoroSlice";
import styles from "./Pomodoro.module.css";

export function Pomodoro() {
    const count = useSelector(selectStatus);
    const dispatch = useDispatch();

    return (
        <div className={styles.pomodoroBackground}>
            {/* CONTROLS */}
            <div className={styles.controls}>
                {/* SESSION */}
                <div className={styles.sessionContainer}>
                    <h3 id="session-label">Timer</h3>
                    <h4 id="session-length">25</h4>
                    <div id="session-increment" className={styles.buttons}>
                        <span>+</span>
                    </div>
                    <div id="session-decrement" className={styles.buttons}>
                        <span>-</span>
                    </div>
                </div>
                {/* BREAK */}
                <div className={styles.breakContainer}>
                    <h3 id="break-label">Break</h3>
                    <h4 id="break-length">5</h4>
                    <div id="break-increment" className={styles.buttons}>
                        <span>+</span>
                    </div>
                    <div id="break-decrement" className={styles.buttons}>
                        <span>-</span>
                    </div>
                </div>
            </div>

            {/* POMODORO */}
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
