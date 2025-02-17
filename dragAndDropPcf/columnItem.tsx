import { useMemo } from "react"
import React = require("react");
import { ListElements } from "./listItem";
interface ColumnElementProps {
    side: "right" | "left";
    elements: { type: 'text' | 'image', value: string }[];
    setIsUserDragging: (isDragging: boolean) => void;
    setIsReleasedOnButton: (isReleasedOnButton: boolean) => void;
    setElementsTracked: (element: string) => void;
    isUserDragging: boolean;
}

export function ColumnElement({ side, elements, setIsUserDragging, setIsReleasedOnButton, setElementsTracked, isUserDragging }: ColumnElementProps) {
    return (
        <div className="column-container" role="region" aria-label={`${side} column`}>
            {elements.map((element, index) => (
                <div
                    key={index}
                    className={side === "left" ? "word-container-left" : "word-container-right"}
                >
                    <ListElements
                        element={element}
                        side={side}
                        setIsUserDragging={setIsUserDragging}
                        setIsReleasedOnButton={setIsReleasedOnButton}
                        setElementsTracked={setElementsTracked}
                        isUserDragging={isUserDragging}
                    />
                </div>
            ))}
        </div>
    );
}