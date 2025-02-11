/**
 * ThreadElement est un composant React qui dessine une ligne SVG entre la position initiale de la souris
 * et sa position actuelle. Ce composant est utilisé pour visualiser le mouvement de glisser-déposer
 * d'un élément. La position initiale est capturée lors du premier mouvement de la souris et la ligne
 * est mise à jour en temps réel en fonction des mouvements de la souris.
 */

import React = require("react")
export interface CoordsThreadProps{
    xinit: number
    yinit: number
    xfinal: number
    yfinal: number
}
export function ThreadElement() {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const initialPosition = React.useRef<{ x: number; y: number } | null>(null);

    React.useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const boundingRect = (event.currentTarget as HTMLElement).getBoundingClientRect();
 
            const transformX = (event.currentTarget as HTMLElement).clientWidth / boundingRect.width;
            const transformY = (event.currentTarget as HTMLElement).clientHeight / boundingRect.height;
            
            const X = (event.clientX - boundingRect.left)* transformX;
            const Y = (event.clientY - boundingRect.top) * transformY;
            setMousePosition({ 
                x: X , 
                y: Y 
            });

            if (initialPosition.current === null) {
                initialPosition.current = { x: X, y: Y };
            }
        };
        const container = document.getElementById("dragAndDropContainer");
        if (container) {
        container.addEventListener("mousemove", handleMouseMove);
        }


        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);
    return (
        <line
            x1={initialPosition.current ? initialPosition.current.x : 0}
            y1={initialPosition.current ? initialPosition.current.y : 0}
            x2={mousePosition.x}
            y2={mousePosition.y}
            stroke="black"
            strokeWidth={3}
            strokeLinecap="round"
            style={{ filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))" }}
        />
    );
}

