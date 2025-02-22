import React = require('react');

export function CongratulationsMessage({
  congratulationMessage,
}: {
  congratulationMessage: string;
}) {
  return (
    <div className="congratulations-message">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1024px-Eo_circle_green_checkmark.svg.png"
        alt="Correct"
        className="correct-logo"
      />
      <h1 className="congratulations-title">{congratulationMessage}</h1>
    </div>
  );
}

export function IncorrectMessage({
  incorrectMessage,
}: {
  incorrectMessage: string;
}) {
  return (
    <div className="incorrect-message">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cross_red_circle.svg/2048px-Cross_red_circle.svg.png"
        alt="Incorrect"
        className="incorrect-logo"
      />
      <h1 className="incorrect-title">{incorrectMessage}</h1>
    </div>
  );
}
