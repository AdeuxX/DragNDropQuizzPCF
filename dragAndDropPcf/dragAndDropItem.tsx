import React = require("react");
import { ColumnElement } from "./columnItem";
import { ThreadElement } from "./threadItem";
import { StaticThreadElement } from "./staticThreadItem";
import { ElementsList } from "./elementsList";
import './style.css'; // Importer le fichier CSS
import { CongratulationsMessage, IncorrectMessage } from "./congratulationsIncorrectMessageElement";

interface DragAndDropProps {
  elementsList: string[][];
  allocatedWidth: number;
  allocatedHeight: number;
  EnableFinalCheck: boolean;
  setNbWrongAnswersOutput: (nbWrongAnswers: number) => void;
  undoButtonText: string;
  verifyButtonText: string;
  incorrectMessage: string;
  congratulationsMessage: string;
}

interface elementsTracked {
  elementInit: string | null;
  elementFinal: string | null;
}

interface StaticThreadElementProps {
  elementInit: string;
  elementFinal: string;
  rightAnswer: boolean;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ elementsList, allocatedHeight, allocatedWidth, EnableFinalCheck, setNbWrongAnswersOutput: setNbWrongAnswersOutput, undoButtonText, verifyButtonText, incorrectMessage, congratulationsMessage }) => {
  const [isUserDragging, setIsUserDragging] = React.useState<boolean>(false);
  const [isReleasedOnButton, setIsReleasedOnButton] = React.useState<boolean>(false);
  const [elementsTracked, setelementsTracked] = React.useState<elementsTracked>({ elementInit: null, elementFinal: null });
  const [staticsThreadsElements, setStaticsThreadsElements] = React.useState<StaticThreadElementProps[]>([]);
  const [nbWrongAnswers, setNbWrongAnswers] = React.useState<number>(0);
  const [containerRect, setContainerRect] = React.useState({ left: 0, top: 0 });
  const [hasVerifyButtonBeenPressed, setHasVerifyButtonBeenPressed] = React.useState<boolean>(false);

  const elementsListInstance = React.useMemo(() => new ElementsList(elementsList), [elementsList]);

  const handleMouseUp = () => {
    setIsUserDragging(false);
    setelementsTracked({ elementInit: null, elementFinal: null });
  };

  React.useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  React.useEffect(() => {
    if (isReleasedOnButton) {
      if (elementsTracked.elementInit && elementsTracked.elementFinal) {
        if (!elementsListInstance.checkIfElementsSameSide({ elementInit: elementsTracked.elementInit, elementFinal: elementsTracked.elementFinal }) && !verifyNoExistingThreadFromPoint()) {
          const rightAnswer = elementsListInstance.checkIfCorrectAssociation({
            elementInit: elementsTracked.elementInit,
            elementFinal: elementsTracked.elementFinal,
          });
          setStaticsThreadsElements((prev) => [
            ...prev,
            { elementInit: elementsTracked.elementInit!, elementFinal: elementsTracked.elementFinal!, rightAnswer },
          ]);
        }
      }
      setIsReleasedOnButton(false);
      setelementsTracked({ elementInit: null, elementFinal: null });
    }
  }, [isReleasedOnButton, elementsTracked, elementsListInstance]);

  const verifyNoExistingThreadFromPoint = ():boolean => {
    return staticsThreadsElements.some((thread) => {
      return (
        thread.elementInit === elementsTracked.elementInit ||
        thread.elementFinal === elementsTracked.elementInit ||
        thread.elementInit === elementsTracked.elementFinal ||
        thread.elementFinal === elementsTracked.elementFinal
      );
    });
  }

  const checkAnswer = () => {
    const wrongAnswersCount = staticsThreadsElements.filter((thread) => !thread.rightAnswer).length;
    setNbWrongAnswers(wrongAnswersCount);
    setNbWrongAnswersOutput(wrongAnswersCount);
    setHasVerifyButtonBeenPressed(true);
  }

  const appendelementsTracked = (word: string) => {
    setelementsTracked((prev) => {
      if (!prev.elementInit) {
        return { elementInit: word, elementFinal: null };
      } else if (!prev.elementFinal) {
        return { elementInit: prev.elementInit, elementFinal: word };
      }
      return prev;
    });
  };

  const removeLastStaticsThreadsElementsCoords = () => {
    setStaticsThreadsElements((prev) => prev.slice(0, -1));
  };

  const areAllAnswersRight = ()=>{
    return nbWrongAnswers === 0
  }

  React.useEffect(() => {
    const updateContainerRect = () => {
      const rect = document.getElementById('dragAndDropContainer')?.getBoundingClientRect();
      if (rect) {
        setContainerRect({ left: rect.left, top: rect.top });
      }
    };

    updateContainerRect();
    window.addEventListener('resize', updateContainerRect);

    return () => {
      window.removeEventListener('resize', updateContainerRect);
    };
  }, []);

  return (
    <div
    id="dragAndDropContainer"
    role="application"
    aria-label="Drag and drop word matching game"
    style={{ height: `${allocatedHeight}px`, width: `${allocatedWidth}px` }}
    tabIndex = {0}
  >
      <div className="columns-container">
        <ColumnElement
          side="left"
          elements={elementsListInstance.getElements("left")}
          setIsUserDragging={setIsUserDragging}
          setIsReleasedOnButton={setIsReleasedOnButton}
          setElementsTracked={appendelementsTracked}
          isUserDragging= {isUserDragging}
        />
        <div></div> {/* Empty div to create the 25% space between columns */}
        <ColumnElement
          side="right"
          elements={elementsListInstance.getElements("right")}
          setIsUserDragging={setIsUserDragging}
          setIsReleasedOnButton={setIsReleasedOnButton}
          setElementsTracked={appendelementsTracked}
          isUserDragging= {isUserDragging}
        />
      </div>
      <div>
        { hasVerifyButtonBeenPressed?  areAllAnswersRight() ? <CongratulationsMessage congratulationMessage={congratulationsMessage} /> : <IncorrectMessage incorrectMessage={incorrectMessage} /> : null }
      </div>
      <div className="buttons-container">
        <button
          className="button"
          onClick={removeLastStaticsThreadsElementsCoords}
          disabled={!(staticsThreadsElements.length > 0)}
          aria-disabled={!(staticsThreadsElements.length > 0)}
        >
          {undoButtonText}
        </button>
        {EnableFinalCheck && (
          <button
            className="button"
            onClick={checkAnswer}
            disabled={!(staticsThreadsElements.length === elementsList.length)}
            aria-disabled={!(staticsThreadsElements.length === elementsList.length)}

          >
            {verifyButtonText} {nbWrongAnswers}
          </button>
        )}
      </div>

      <svg className="svg-overlay">
    <defs>
      <clipPath id="clipPathWithOffset">
        <rect x={containerRect.left} y={containerRect.top} width={allocatedWidth} height={allocatedHeight} />
        </clipPath>
    </defs>
    <g clipPath="url(#clipPathWithOffset)">
      {isUserDragging && <ThreadElement />}
      {staticsThreadsElements.map((newStaticThread, index) => (
        <StaticThreadElement
          key={index}
          elementInit={newStaticThread.elementInit}
          elementFinal={newStaticThread.elementFinal}
          rightAnswer={newStaticThread.rightAnswer}
          EnableFinalCheck={EnableFinalCheck}
        />
      ))}
    </g>
  </svg>
    </div>
  );
};

export default DragAndDrop;
