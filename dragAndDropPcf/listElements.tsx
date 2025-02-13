/**
 * ListElements est un composant React qui représente un élément de la colomne dans le contrôle de glisser-déposer.
 * Ce composant affiche un mot et un bouton associé, permettant à l'utilisateur de faire créer un fil drag'n drop depuis le bouton pour
 * créer une connexion avec un autre élément.
 * 
 * Props:
 * - word: Le mot à afficher.
 * - side: Indique si l'élément est sur le côté gauche ou droit de la liste ("left" ou "right").
 * - setIsUserDraging: Fonction pour mettre à jour l'état de glisser-déposer de l'utilisateur.
 * - setIsReleasedOnButton: Fonction pour mettre à jour l'état de relâchement du bouton de la souris.
 * - setWordsTracked: Fonction pour mettre à jour les mots suivis lors du glisser-déposer.
 */

import React = require("react")
import { PointElement } from "./pointElement"

interface ListElementsProps {
    word: string
    side: "left"|"right"
    setIsUserDraging: (isDragging: boolean) => void
    setIsReleasedOnButton: (isReleasedOnButton:boolean) => void
    setWordsTracked: (word: string) => void
    isUserDragging: boolean
}

export function ListElements({ word, side, setIsUserDraging, setIsReleasedOnButton, setWordsTracked, isUserDragging}: ListElementsProps){
    return (
        <li className="list-element" role="listitem">
          {side === "left" ? (
            <>
              <WordElement word={word} side={side} />
              <PointElement word={word} setIsUserDraging={setIsUserDraging} setIsReleasedOnButton={setIsReleasedOnButton} setWordsTracked={setWordsTracked} isUserDragging={isUserDragging}/>
            </>
          ) : (
            <>
              <PointElement word={word} setIsUserDraging={setIsUserDraging} setIsReleasedOnButton={setIsReleasedOnButton} setWordsTracked={setWordsTracked} isUserDragging={isUserDragging}/>
              <WordElement word={word} side={side} />
            </>
          )}
        </li>
      );
}

function WordElement({word, side }: { word: string, side: "left"|"right" }){ 
    return  <p id={`${word}Text`} className={`word-element ${side}`} role="text">
        {word}
        </p>
}
