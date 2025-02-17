import React = require("react");

export function CongratulationsMessage({ congratulationMessage }: { congratulationMessage: string }) {
    return (
        <div className="congratulations-message" >
            <img src="path/to/correct-logo.png" alt="Correct" className="correct-logo" style={{ marginRight: '10px' }} />
            <h1 className="congratulations-title">{congratulationMessage}</h1>
        </div>
    );
}

export function IncorrectMessage({ incorrectMessage }: { incorrectMessage: string }) {
    return (
        <div className="incorrect-message">
            <img src="path/to/incorrect-logo.png" alt="Incorrect" className="incorrect-logo" />
            <h1 className="incorrect-title">{incorrectMessage}</h1>
        </div>
    );
}

