import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    changeStatus,
    decrement,
    increment,
    countdown,
    selectTimer,
    selectBreak,
    selectStatus,
} from "./pomodoroSlice";
import styles from "./Pomodoro.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRotate } from "@fortawesome/free-solid-svg-icons";

export function Pomodoro() {
    const status = useSelector(selectStatus);
    const timer = useSelector(selectTimer);
    const pause = useSelector(selectBreak);
    const dispatch = useDispatch();

    var interval = useRef();

    function startCounting() {
        interval.current = setInterval(() => {
            dispatch(countdown());
        }, 1000);
    }

    function stopCounting() {
        clearInterval(interval.current);
    }

    const handleClick = () => {
        if (status === "idle" || status === "pause") {
            dispatch(changeStatus("start"));
            startCounting();
        } else {
            dispatch(changeStatus("pause"));
            stopCounting();
        }
    };

    return (
        <div className={styles.pomodoroBackground}>
            {/* CONTROLS */}
            <div className={styles.controls}>
                {/* SESSION */}
                <div className={styles.sessionContainer}>
                    <h3 id="session-label">Timer</h3>
                    <h4 id="session-length">{timer}</h4>
                    <div
                        id="session-increment"
                        className={styles.buttons}
                        onClick={() => dispatch(increment("timer"))}
                    >
                        <div>+</div>
                    </div>
                    <div
                        id="session-decrement"
                        className={styles.buttons}
                        onClick={() => dispatch(decrement("timer"))}
                    >
                        <div>-</div>
                    </div>
                </div>
                {/* BREAK */}
                <div className={styles.breakContainer}>
                    <h3 id="break-label">Break</h3>
                    <h4 id="break-length">{pause}</h4>
                    <div
                        id="break-increment"
                        className={styles.buttons}
                        onClick={() => dispatch(increment("break"))}
                    >
                        <div>+</div>
                    </div>
                    <div
                        id="break-decrement"
                        className={styles.buttons}
                        onClick={() => dispatch(decrement("break"))}
                    >
                        <div>-</div>
                    </div>
                </div>
                {/* START / STOP */}
                <div
                    id="start_stop"
                    className={styles.start}
                    onClick={handleClick}
                >
                    {status === "idle" || status === "pause" ? (
                        <FontAwesomeIcon icon={faPlay} />
                    ) : (
                        <FontAwesomeIcon icon={faPause} />
                    )}
                </div>
                {/* RESET */}
                <div
                    id="reset"
                    className={styles.reset}
                    onClick={() => {
                        stopCounting(interval);
                        dispatch(changeStatus("idle"));
                    }}
                >
                    <FontAwesomeIcon icon={faRotate} />
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
                <h1 id="timer-label">PomoTimer</h1>
                <div id="time-left" className={styles.timerDisplay}>
                    30:59
                </div>
            </div>
        </div>
    );
}
