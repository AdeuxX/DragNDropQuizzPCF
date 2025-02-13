import React = require("react")
interface PointElementProps{
    word: string
    setIsUserDraging: (isDragging: boolean) => void
    setIsReleasedOnButton: (isReleasedOnButton:boolean) => void
    setWordsTracked: (word: string) => void
    isUserDragging: boolean
}
export function PointElement({word, setIsUserDraging, setIsReleasedOnButton, setWordsTracked, isUserDragging}: PointElementProps){
    const handleMouseDown = () => {
        setIsUserDraging(true);
        setWordsTracked(word)
    };

    const handleMouseUp = () => {
        setIsReleasedOnButton(true);
        setIsUserDraging(false)
        setWordsTracked(word)
    };

    const handleClick = () => {
        if ( !isUserDragging) {
          handleMouseDown();
        }
        if ( isUserDragging) {
            handleMouseUp();
          }
      };
      console.log(isUserDragging)
    return (
        <button 
            id = {`${word}Button`}
            onMouseDown={() => handleMouseDown()}
            onMouseUp={()=> handleMouseUp()}
            onTouchStart={() => handleMouseDown}
            onTouchEnd={()=> handleMouseUp}
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
            aria-label={`Select ${word}`}

        >

        </button>)
}