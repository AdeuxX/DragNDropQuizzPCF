import React = require("react");
import { ColumnElement } from "./columnElement";
import { ThreadElement } from "./threadElement";
import { StaticThreadElement } from "./staticThreadElement";
import { WordsList } from "./wordsList";

interface DragAndDropProps {
  wordsList: string[][];
  allocatedWidth: number;
  allocatedHeight: number;
  EnableFinalCheck: boolean;
  setNbWrongAnswersOutput: (nbWrongAnswers: number) => void;
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

const DragAndDrop: React.FC<DragAndDropProps> = ({ wordsList, allocatedHeight, allocatedWidth, EnableFinalCheck, setNbWrongAnswersOutput: setNbWrongAnswersOutput}) => {
  // Déclaration des états avec React.usState
  const [isUserDragging, setIsUserDragging] = React.useState<boolean>(false);
  const [isReleasedOnButton, setIsReleasedOnButton] = React.useState<boolean>(false);
  const [wordsTracked, setWordsTracked] = React.useState<WordsTracked>({ wordInit: null, wordFinal: null });
  const [staticsThreadsElements, setStaticsThreadsElements] = React.useState<StaticThreadElementProps[]>([]);
  const [nbWrongAnswers, setNbWrongAnswers] = React.useState<number>(0);

  // Création de l'instance WordsList (mise en cache via useMemo)
  const wordsListInstance = React.useMemo(() => new WordsList(wordsList), [wordsList]);

  // Gestion de l'événement "mouseup"
  const handleMouseUp = () => {
    setIsUserDragging(false);
    // Réinitialise les mots traqués
    setWordsTracked({ wordInit: null, wordFinal: null });
  };

  React.useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Effet pour simuler le componentDidUpdate (pour isReleasedOnButton et wordsTracked)
  React.useEffect(() => {
    if (isReleasedOnButton) {
      if (wordsTracked.wordInit && wordsTracked.wordFinal) {
        // Si les mots ne se trouvent pas du même côté, on ajoute le thread statique
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
      // Réinitialisation des états concernés
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
  // Fonction pour ajouter un mot aux mots traqués
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



  // Fonction pour supprimer le dernier élément statique
  const removeLastStaticsThreadsElementsCoords = () => {
    setStaticsThreadsElements((prev) => prev.slice(0, -1));
  };

  return (

    <div id="dragAndDropContainer"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: `${allocatedHeight}px`,
        width: `${allocatedWidth}px`,
        borderRadius: "10px", /* Bords arrondis */
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", /* Ombrage léger */
        overflow: "hidden", /* Cache le débordement */
      }}
    >
      <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
        flexGrow: 1,
      }}
      >
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

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px 0",
        }}
      >
      <button 
        onClick={removeLastStaticsThreadsElementsCoords} 
        disabled={!(staticsThreadsElements.length > 0)}
        style={{
          backgroundColor: "#2196f3", /* Bleu vif */
          color: "white",
          border: "none",
          borderRadius: "25px", /* Bords arrondis */
          padding: "10px 20px",
          margin: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s ease", /* Effet de transition */
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1976d2")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2196f3")}
      >
        Undo
      </button>
      {EnableFinalCheck && (
        <button 
          onClick={checkAnswer} 
          disabled={!(staticsThreadsElements.length === wordsList.length)}
          style={{
        backgroundColor: "#2196f3", /* Bleu vif */
        color: "white",
        border: "none",
        borderRadius: "25px", /* Bords arrondis */
        padding: "10px 20px",
        margin: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease", /* Effet de transition */
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1976d2")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2196f3")}
        >
          Check Answer {nbWrongAnswers}
        </button>
      )}
      </div>  

      <svg style={{ pointerEvents: "none", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
      {isUserDragging && <ThreadElement/>}

      {staticsThreadsElements.map((newStaticThread, index) => (
        <StaticThreadElement
          key={index}
          wordInit={newStaticThread.wordInit}
          wordFinal={newStaticThread.wordFinal}
          rightAnswer={newStaticThread.rightAnswer}
          EnableFinalCheck={EnableFinalCheck}
        />

      ))}
    </svg>
    </div>
  );
};

export default DragAndDrop;
