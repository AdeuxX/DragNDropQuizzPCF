import React = require("react")
interface PointElementProps {
    element: { type: 'text' | 'image', value: string };
    setIsUserDragging: (isDragging: boolean) => void;
    setIsReleasedOnButton: (isReleasedOnButton: boolean) => void;
    setElementsTracked: (element: string) => void;
    isUserDragging: boolean;
}

export function PointElement({ element, setIsUserDragging, setIsReleasedOnButton, setElementsTracked, isUserDragging }: PointElementProps) {
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
            id={`${element.value}Button`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            onClick={handleClick}
            style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "#2196f3",
                border: "none",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                flexShrink: 0,
                outline: "none",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2196F3'}
            aria-label={`Select ${element.value}`}
        >
        </button>
    );
}
