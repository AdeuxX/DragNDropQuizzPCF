import React = require("react");

interface ThreadElementProps {
    elementInit: string | null;
}

export interface CoordsThreadProps {
    xinit: number;
    yinit: number;
    xfinal: number;
    yfinal: number;
}

export function ThreadElement({ elementInit }: ThreadElementProps) {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const [initialPosition, setInitialPosition ] = React.useState<{ x: number; y: number } | null>(null);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    const getOffsetRelativeToAncestor = (element: HTMLElement, ancestorLevel: number | null = null) => {
        let ancestor: HTMLElement | null = element;
        if (ancestorLevel) {
            for (let i = 0; i < ancestorLevel && ancestor?.parentElement; i++) {
                ancestor = ancestor.parentElement;
            }

            if (!ancestor) {
                console.warn("Aucun ancêtre valide trouvé pour le niveau donné.");
                return { x: 0, y: 0 };
            }
        } else {
            ancestor = document.getElementById("dragAndDropContainer")!;
        }
        const boundingRect = element.getBoundingClientRect();
        const ancestorRect = ancestor.getBoundingClientRect();

        const transformX = element.clientWidth / boundingRect.width;
        const transformY = element.clientHeight / boundingRect.height;

        return {
            x: (boundingRect.left - ancestorRect.left) * transformX,
            y: (boundingRect.top - ancestorRect.top) * transformY,
        };
    };

    const handleMouseMove = (event: MouseEvent) => {
        const boundingRect = (event.currentTarget as HTMLElement).getBoundingClientRect();

        const transformX = (event.currentTarget as HTMLElement).clientWidth / boundingRect.width;
        const transformY = (event.currentTarget as HTMLElement).clientHeight / boundingRect.height;

        const X = (event.clientX - boundingRect.left) * transformX;
        const Y = (event.clientY - boundingRect.top) * transformY;

        setMousePosition({ x: X, y: Y });
    };

    const updateInitialPosition = () => {
        console.log("iciii")
        if (elementInit) {
            const initElem = document.getElementById(`${elementInit}Button`);
            if (initElem) {
                const initCoords = getOffsetRelativeToAncestor(initElem);
                setInitialPosition({
                    x: initCoords.x + initElem.offsetWidth / 2,
                    y: initCoords.y + initElem.offsetHeight / 2,
                });
            }
        }
    };

    React.useEffect(() => {
        const container = document.getElementById("dragAndDropContainer");
        if (container) {
            containerRef.current = container as HTMLDivElement;
            container.addEventListener("mousemove", handleMouseMove);
            container.addEventListener("scroll", updateInitialPosition);
        }
        updateInitialPosition();
        return () => {
            container?.removeEventListener("mousemove", handleMouseMove);
            container?.removeEventListener("scroll", updateInitialPosition);
        };
    }, []);
    console.log("elementInit", elementInit);
    return (
        <line
            x1={initialPosition ? initialPosition.x : 0}
            y1={initialPosition ? initialPosition.y : 0}
            x2={mousePosition.x}
            y2={mousePosition.y}
            className="dynamic-thread-line"
        />
    );
}
