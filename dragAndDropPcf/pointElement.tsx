import React = require("react")
interface PointElementProps{
    word: string
    setIsUserDraging: (isDragging: boolean) => void
    setIsReleasedOnButton: (isReleasedOnButton:boolean) => void
    setWordsTracked: (word: string) => void
}
export function PointElement({word, setIsUserDraging, setIsReleasedOnButton, setWordsTracked}: PointElementProps){
    const handleMouseDown = () => {
        setIsUserDraging(true);
        setWordsTracked(word)
    };

    const handleMouseUp = () => {
        setIsReleasedOnButton(true);
        setWordsTracked(word)
    };
    React.useEffect(
        () => {
            document.getElementById(`${word}Button`)
        }
    )
    return (
        <button 
            id = {`${word}Button`}
            onMouseDown={() => handleMouseDown()}
            onMouseUp={()=> handleMouseUp()}
            onTouchStart={() => handleMouseDown}
            onTouchEnd={()=> handleMouseUp}
            style={{
            width: 10,
            height:  10,
            borderRadius: '50%',
            backgroundColor: '#2196F3',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            flexShrink: 0,
            outline: 'none',
            }}
        >

        </button>)
}