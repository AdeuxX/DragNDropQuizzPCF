/**
 * StaticThreadElement est un composant React qui dessine une ligne SVG fixe entre deux boutons
 * identifiés par leurs mots associés. Ce composant est utilisé pour visualiser les connexions
 * correctes ou incorrectes après que l'utilisateur a effectué un glisser-déposer.
 * Les coordonnées des éléments sont mises à jour en fonction de leur position dans le DOM.
 */ 

import React = require("react");

interface StaticThreadElementProps {
  wordInit: string;
  wordFinal: string;
  rightAnswer: boolean;
  EnableFinalCheck: boolean;
}

export function StaticThreadElement({ wordInit, wordFinal, rightAnswer, EnableFinalCheck }: StaticThreadElementProps) {
  const wordInitRef = React.useRef<HTMLElement | null>(null);
  const wordFinalRef = React.useRef<HTMLElement | null>(null);
  const [coords, setCoords] = React.useState({ xinit: 0, yinit: 0, xfinal: 0, yfinal: 0 });

  // Fonction pour calculer les coordonnées par rapport à un parent

  const getOffsetRelativeToAncestor = (element: HTMLElement, ancestorLevel: number|null = null ) => {
    let ancestor: HTMLElement | null = element;
    if(ancestorLevel){for (let i = 0; i < ancestorLevel && ancestor?.parentElement; i++) {
      ancestor = ancestor.parentElement;
    }

    if (!ancestor) {
      console.warn("Aucun ancêtre valide trouvé pour le niveau donné.");
      return { x: 0, y: 0 };

    }}
    else{ancestor = document.getElementById("dragAndDropContainer")!}
    const boundingRect = element.getBoundingClientRect();
    const ancestorRect = ancestor.getBoundingClientRect();
  
    const transformX = element.clientWidth / boundingRect.width;
    const transformY = element.clientHeight / boundingRect.height;
  
    return {
      x: (boundingRect.left - ancestorRect.left) * transformX + window.scrollX,
      y: (boundingRect.top - ancestorRect.top) * transformY + window.scrollY,

    };
  };

  const updateCoords = () => {
    const initElem = document.getElementById(`${wordInit}Button`);
    const finalElem = document.getElementById(`${wordFinal}Button`);

    if (initElem && finalElem) {
      const initCoords = getOffsetRelativeToAncestor(initElem);
      const finalCoords = getOffsetRelativeToAncestor(finalElem);

      // const newCoords = {
      //   xinit: initCoords.x + initElem.offsetWidth / 2 + window.scrollX,
      //   yinit: initCoords.y + initElem.offsetHeight / 2 + window.scrollY, 
      //   xfinal: finalCoords.x + finalElem.offsetWidth / 2 + window.scrollX,
      //   yfinal: finalCoords.y + finalElem.offsetHeight / 2 + window.scrollX,
      // };
      //TODO: UNCOMMENT THIS WHEN YOU ARE TESTING OUT POWER APPS
      const rectInit = initElem.getBoundingClientRect();
      const rectFinal = finalElem.getBoundingClientRect();
      const newCoords = {
          xinit: rectInit.left + rectInit.width / 2 + window.scrollX,
          yinit: rectInit.top + rectInit.height / 2 + window.scrollY,
          xfinal: rectFinal.left + rectFinal.width / 2 + window.scrollX,
          yfinal: rectFinal.top + rectFinal.height / 2 + window.scrollY,
        };

      setCoords((prevCoords) =>
        JSON.stringify(prevCoords) !== JSON.stringify(newCoords) ? newCoords : prevCoords
      );

      // Mettre à jour les refs
      wordInitRef.current = initElem;
      wordFinalRef.current = finalElem;
    }
  };

  React.useEffect(() => {
    updateCoords();
  });

  React.useEffect(() => {
    const observer = new MutationObserver(updateCoords);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
      <line
        x1={coords.xinit}
        y1={coords.yinit}
        x2={coords.xfinal}
        y2={coords.yfinal}
        stroke={EnableFinalCheck ? "black" : rightAnswer ? "#4CAF50" : "#F44336"}
        strokeWidth={3}
        strokeLinecap="round"
        style={{ filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))" }}
      />
  );
}