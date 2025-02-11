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
    return <div style={{ flex: 1, height: "100%", width:"100%", flexDirection: 'column', display: 'flex' }}>
        {words.map((word: string) => (
            <div key={word} style={{ flex: 1, display: 'flex' }}>
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
