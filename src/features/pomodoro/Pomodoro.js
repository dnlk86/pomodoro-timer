import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    changeStatus,
    changeIsPaused,
    decrement,
    increment,
    countdown,
    selectTimer,
    selectBreak,
    selectStatus,
    selectRemainingTime,
    selectIsPaused,
} from "./pomodoroSlice";
import styles from "./Pomodoro.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRotate } from "@fortawesome/free-solid-svg-icons";
import alarm from "../../audio/clock-alarm.mp3";

export function Pomodoro() {
    const dispatch = useDispatch();

    const status = useSelector(selectStatus);
    const timerLenght = useSelector(selectTimer);
    const breakLenght = useSelector(selectBreak);
    const remainingTime = useSelector(selectRemainingTime);
    const isPaused = useSelector(selectIsPaused);

    const handleTime = () => {
        let docstyle = document.documentElement.style;
        if (remainingTime <= 10) {
            docstyle.setProperty(
                "--background-animation-gradient",
                "conic-gradient(#ED0000 90deg, #FF7575 180deg, white 360deg)"
            );
        }
        if (remainingTime === 0) {
            document.getElementById("beep").play();
        } else if (remainingTime < 0) {
            stopCounting();
            if (status === "session") {
                dispatch(changeStatus("break"));
                startCounting();
                docstyle.setProperty(
                    "--background-animation-gradient",
                    "conic-gradient(#219ebc 90deg, #8ecae6 180deg, white 360deg)"
                );
            } else if (status === "break") {
                dispatch(changeStatus("session"));
            }
        }

        let min = "00" + Math.floor(remainingTime / 60).toString();
        min = min.substring(min.length - 2);

        let sec = "00" + (remainingTime % 60).toString();
        sec = sec.substring(sec.length - 2);

        return `${min}:${sec}`;
    };

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
        let docstyle = document.documentElement.style;
        if (isPaused) {
            dispatch(changeIsPaused(false));
            startCounting();
            docstyle.setProperty("--background-animation-state", "running");
            docstyle.setProperty(
                "--background-animation-gradient",
                "conic-gradient(#219ebc 90deg, #8ecae6 180deg, white 360deg)"
            );
        } else {
            dispatch(changeIsPaused(true));
            stopCounting();
            docstyle.setProperty("--background-animation-state", "paused");
            docstyle.setProperty(
                "--background-animation-gradient",
                "conic-gradient(#ED7600 90deg, #FFBA75 180deg, white 360deg)"
            );
        }
    };

    return (
        <div className={styles.pomodoroBackground}>
            {/* POMODORO */}
            <div className={styles.pomodoroBody}>
                <div className={styles.leavesContainer}>
                    <div className={styles.leafLeft}></div>
                    <div className={styles.leafMiddle}></div>
                    <div className={styles.leafRight}></div>
                </div>
                <div className={styles.pomodoroLeft}></div>
                <div className={styles.pomodoroRight}></div>
                <h1 id="timer-logo">PomoTimer</h1>
                <div className={styles.timerDisplay}>
                    <div id="time-left">{handleTime()}</div>
                    <div id="timer-label">{status.toUpperCase()}</div>
                </div>
            </div>
            {/* CONTROLS */}
            <div className={styles.controls}>
                {/* SESSION */}
                <div className={styles.sessionContainer}>
                    <h3 id="session-label">SESSION</h3>
                    <h4 id="session-length">{timerLenght}</h4>
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
                    <h3 id="break-label">BREAK</h3>
                    <h4 id="break-length">{breakLenght}</h4>
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
                    {isPaused ? (
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
                        stopCounting();
                        dispatch(changeStatus("session"));
                        let sound = document.getElementById("beep");
                        sound.pause();
                        sound.currentTime = 0;
                    }}
                >
                    <FontAwesomeIcon icon={faRotate} />
                </div>
                {/* AUDIO */}
                <audio id="beep" src={alarm} preload="auto"></audio>
            </div>
        </div>
    );
}
