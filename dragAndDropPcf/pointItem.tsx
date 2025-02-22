import React = require('react');
interface PointElementProps {
  element: { type: 'text' | 'image'; value: string };
  setIsUserDragging: (isDragging: boolean) => void;
  setIsReleasedOnButton: (isReleasedOnButton: boolean) => void;
  setElementsTracked: (element: string) => void;
  isUserDragging: boolean;
}

export function PointElement({
  element,
  setIsUserDragging,
  setIsReleasedOnButton,
  setElementsTracked,
  isUserDragging,
}: PointElementProps) {
  const handleMouseDown = () => {
    setIsUserDragging(true);
    setElementsTracked(element.value);
  };

  const handleMouseUp = () => {
    setIsReleasedOnButton(true);
    setIsUserDragging(false);
    setElementsTracked(element.value);
  };

  const handleClick = () => {
    if (!isUserDragging) {
      handleMouseDown();
    }
    if (isUserDragging) {
      handleMouseUp();
    }
  };

  return (
    <button
      className="point-element"
      id={`${element.value}Button`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onClick={handleClick}
      aria-label={`Select ${element.value}`}
    ></button>
  );
}
