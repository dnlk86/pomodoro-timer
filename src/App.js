import React from "react";
import { Pomodoro } from "./features/pomodoro/Pomodoro";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Pomodoro />
            <div id="signatureContainer">
                <a
                    href="https://github.com/dnlk86/pomodoro-timer"
                    target={"_blank"}
                >
                    dnlk86
                </a>
            </div>
        </div>
    );
}

export default App;
