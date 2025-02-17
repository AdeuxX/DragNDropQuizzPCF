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
import { PointElement } from "./pointItem"

interface ListElementsProps {
  element: { type: 'text' | 'image', value: string };
  side: "left" | "right";
  setIsUserDragging: (isDragging: boolean) => void;
  setIsReleasedOnButton: (isReleasedOnButton: boolean) => void;
  setElementsTracked: (element: string) => void;
  isUserDragging: boolean;
}

export function ListElements({ element, side, setIsUserDragging, setIsReleasedOnButton, setElementsTracked, isUserDragging }: ListElementsProps) {
  return (
      <li className="list-element" role="listitem">
          {side === "left" ? (
              <>
                  <ElementDisplay element={element} side={side} />
                  <PointElement
                      element={element}
                      setIsUserDragging={setIsUserDragging}
                      setIsReleasedOnButton={setIsReleasedOnButton}
                      setElementsTracked={setElementsTracked}
                      isUserDragging={isUserDragging}
                  />
              </>
          ) : (
              <>
                  <PointElement
                      element={element}
                      setIsUserDragging={setIsUserDragging}
                      setIsReleasedOnButton={setIsReleasedOnButton}
                      setElementsTracked={setElementsTracked}
                      isUserDragging={isUserDragging}
                  />
                  <ElementDisplay element={element} side={side} />
              </>
          )}
      </li>
  );
}

function ElementDisplay({ element, side }: { element: { type: 'text' | 'image', value: string }, side: "left" | "right" }) {
  return (
      <div id={`${element.value}Display`} className={`element-display ${side}`} role="presentation">
          {element.type === 'text' ? (
              <p className="word-element">{element.value}</p>
          ) : (
              <img src={element.value} alt="Element" className="image-element" />
          )}
      </div>
  );
}

