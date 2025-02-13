import { useMemo } from "react"
import React = require("react");
import { ListElements } from "./listElements";
interface ColumnElementProps{
    side: "right"|"left"
    words: string[]
    setIsUserDraging: (isDragging: boolean) => void
    setIsReleasedOnButton: (isReleasedOnButton:boolean) => void
    setWordsTracked: (word: string) => void
    isUserDragging : boolean
}
export function ColumnElement({side, words, setIsUserDraging, setIsReleasedOnButton, setWordsTracked, isUserDragging}: ColumnElementProps){
    return <div className="column-container" role="region" aria-label={`${side} column`}>
        {words.map((word: string) => (
            <div key={word} className={side === "left" ? "word-container-left" : "word-container-right"}>
                <ListElements 
                    word={word} 
                    side={side} 
                    setIsUserDraging={setIsUserDraging} 
                    setIsReleasedOnButton={setIsReleasedOnButton} 
                    setWordsTracked={setWordsTracked} 
                    isUserDragging = {isUserDragging}
                />
            </div>
        ))}
    </div>
}
