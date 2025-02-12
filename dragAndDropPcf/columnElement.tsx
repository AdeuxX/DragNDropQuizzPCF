import { useMemo } from "react"
import React = require("react");
import { ListElements } from "./listElements";
interface ColumnElementProps{
    side: "right"|"left"
    words: string[]
    setIsUserDraging: (isDragging: boolean) => void
    setIsReleasedOnButton: (isReleasedOnButton:boolean) => void
    setWordsTracked: (word: string) => void
}
export function ColumnElement({side, words, setIsUserDraging, setIsReleasedOnButton, setWordsTracked}: ColumnElementProps){
    return <div className="column-container">
        {words.map((word: string) => (
            <div key={word} className={side === "left" ? "word-container-left" : "word-container-right"}>
                <ListElements 
                    word={word} 
                    side={side} 
                    setIsUserDraging={setIsUserDraging} 
                    setIsReleasedOnButton={setIsReleasedOnButton} 
                    setWordsTracked={setWordsTracked} 
                />
            </div>
        ))}
    </div>
}
