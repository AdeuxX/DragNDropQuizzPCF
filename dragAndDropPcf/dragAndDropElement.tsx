import React = require("react");
import { ColumnElement } from "./columnElement";
import { ThreadElement } from "./threadElement";
import { StaticThreadElement } from "./staticThreadElement";
import { WordsList } from "./wordsList";
import './style.css'; // Importer le fichier CSS

interface DragAndDropProps {
  wordsList: string[][];
  allocatedWidth: number;
  allocatedHeight: number;
  EnableFinalCheck: boolean;
  setNbWrongAnswersOutput: (nbWrongAnswers: number) => void;
  undoButtonText: string;
  verifyButtonText: string;
}

interface WordsTracked {
  wordInit: string | null;
  wordFinal: string | null;
}

interface StaticThreadElementProps {
  wordInit: string;
  wordFinal: string;
  rightAnswer: boolean;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ wordsList, allocatedHeight, allocatedWidth, EnableFinalCheck, setNbWrongAnswersOutput: setNbWrongAnswersOutput, undoButtonText, verifyButtonText}) => {
  const [isUserDragging, setIsUserDragging] = React.useState<boolean>(false);
  const [isReleasedOnButton, setIsReleasedOnButton] = React.useState<boolean>(false);
  const [wordsTracked, setWordsTracked] = React.useState<WordsTracked>({ wordInit: null, wordFinal: null });
  const [staticsThreadsElements, setStaticsThreadsElements] = React.useState<StaticThreadElementProps[]>([]);
  const [nbWrongAnswers, setNbWrongAnswers] = React.useState<number>(0);
  const [containerRect, setContainerRect] = React.useState({ left: 0, top: 0 });


  const wordsListInstance = React.useMemo(() => new WordsList(wordsList), [wordsList]);

  const handleMouseUp = () => {
    setIsUserDragging(false);
    setWordsTracked({ wordInit: null, wordFinal: null });
  };

  React.useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  React.useEffect(() => {
    if (isReleasedOnButton) {
      if (wordsTracked.wordInit && wordsTracked.wordFinal) {
        if (!wordsListInstance.checkIfWordsSameSide({ wordInit: wordsTracked.wordInit, wordFinal: wordsTracked.wordFinal }) && !verifyNoExistingThreadFromPoint()) {
          const rightAnswer = wordsListInstance.checkIfCorrectAssociation({
            wordInit: wordsTracked.wordInit,
            wordFinal: wordsTracked.wordFinal,
          });
          setStaticsThreadsElements((prev) => [
            ...prev,
            { wordInit: wordsTracked.wordInit!, wordFinal: wordsTracked.wordFinal!, rightAnswer },
          ]);
        }
      }
      setIsReleasedOnButton(false);
      setWordsTracked({ wordInit: null, wordFinal: null });
    }
  }, [isReleasedOnButton, wordsTracked, wordsListInstance]);

  const verifyNoExistingThreadFromPoint = ():boolean => {
    return staticsThreadsElements.some((thread) => {
      return (
        thread.wordInit === wordsTracked.wordInit ||
        thread.wordFinal === wordsTracked.wordInit ||
        thread.wordInit === wordsTracked.wordFinal ||
        thread.wordFinal === wordsTracked.wordFinal
      );
    });
  }

  const checkAnswer = () => {
    const wrongAnswersCount = staticsThreadsElements.filter((thread) => !thread.rightAnswer).length;
    setNbWrongAnswers(wrongAnswersCount);
    setNbWrongAnswersOutput(wrongAnswersCount);
  }

  const appendWordsTracked = (word: string) => {
    setWordsTracked((prev) => {
      if (!prev.wordInit) {
        return { wordInit: word, wordFinal: null };
      } else if (!prev.wordFinal) {
        return { wordInit: prev.wordInit, wordFinal: word };
      }
      return prev;
    });
  };

  const removeLastStaticsThreadsElementsCoords = () => {
    setStaticsThreadsElements((prev) => prev.slice(0, -1));
  };

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
    <div id="dragAndDropContainer" style={{ height: `${allocatedHeight}px`, width: `${allocatedWidth}px` }}>
      <div className="columns-container">
        <ColumnElement
          side="left"
          words={wordsListInstance.getWords("left")}
          setIsUserDraging={setIsUserDragging}
          setIsReleasedOnButton={setIsReleasedOnButton}
          setWordsTracked={appendWordsTracked}
        />
        <div></div> {/* Empty div to create the 25% space between columns */}
        <ColumnElement
          side="right"
          words={wordsListInstance.getWords("right")}
          setIsUserDraging={setIsUserDragging}
          setIsReleasedOnButton={setIsReleasedOnButton}
          setWordsTracked={appendWordsTracked}
        />
      </div>

      <div className="buttons-container">
        <button
          className="button"
          onClick={removeLastStaticsThreadsElementsCoords}
          disabled={!(staticsThreadsElements.length > 0)}
        >
          {undoButtonText}
        </button>
        {EnableFinalCheck && (
          <button
            className="button"
            onClick={checkAnswer}
            disabled={!(staticsThreadsElements.length === wordsList.length)}
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
          wordInit={newStaticThread.wordInit}
          wordFinal={newStaticThread.wordFinal}
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
